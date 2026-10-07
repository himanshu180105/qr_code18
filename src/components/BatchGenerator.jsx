import React, { useState } from 'react';
import QRCode from 'qrcode';
import { Layers, Download, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BatchGenerator({ config, showToast }) {
  const [urlsInput, setUrlsInput] = useState(
    'https://github.com\nhttps://google.com\nhttps://react.dev\nhttps://vitejs.dev'
  );
  const [generatedList, setGeneratedList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGenerateBatch = async () => {
    const urls = urlsInput
      .split('\n')
      .map(u => u.trim())
      .filter(u => u.length > 0);

    if (urls.length === 0) {
      showToast('Please enter at least one URL', 'error');
      return;
    }

    setIsProcessing(true);
    const results = [];

    for (let i = 0; i < urls.length; i++) {
      let raw = urls[i];
      let formatted = raw;
      if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) {
        formatted = `https://${raw}`;
      }

      try {
        const dataUrl = await QRCode.toDataURL(formatted, {
          width: 400,
          margin: 2,
          color: {
            dark: config.fgColor || '#00f2fe',
            light: config.transparentBg ? '#00000000' : (config.bgColor || '#090d16')
          }
        });

        results.push({
          id: i,
          originalUrl: raw,
          formattedUrl: formatted,
          dataUrl
        });
      } catch (err) {
        console.error('Failed to generate for:', raw, err);
      }
    }

    setGeneratedList(results);
    setIsProcessing(false);
    confetti({ particleCount: 40, spread: 50 });
    showToast(`Successfully generated ${results.length} QR codes!`, 'success');
  };

  const handleDownloadSingle = (item) => {
    const link = document.createElement('a');
    link.href = item.dataUrl;
    link.download = `qr-batch-${item.id + 1}.png`;
    link.click();
    showToast(`Downloaded QR for ${item.formattedUrl}`, 'success');
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <Layers className="text-cyan-400" size={24} />
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Batch Link QR Generator</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Paste multiple URLs (one URL per line) to generate bulk QR codes simultaneously.
          </p>
        </div>
      </div>

      <div className="input-group" style={{ marginBottom: '16px' }}>
        <label className="input-label" htmlFor="batch-urls-input"><FileText size={15} /> Paste URLs List</label>
        <textarea
          id="batch-urls-input"
          className="input-field"
          rows={6}
          value={urlsInput}
          onChange={(e) => setUrlsInput(e.target.value)}
          placeholder="https://example1.com&#10;https://example2.com&#10;https://example3.com"
        />
      </div>

      <button
        onClick={handleGenerateBatch}
        disabled={isProcessing}
        className="btn-primary"
        style={{ width: '100%', marginBottom: '24px' }}
      >
        <Sparkles size={18} /> {isProcessing ? 'Generating Batch...' : 'Generate All Batch QR Codes'}
      </button>

      {generatedList.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              Generated ({generatedList.length} items)
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: '14px'
          }}>
            {generatedList.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '14px',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <img
                  src={item.dataUrl}
                  alt={item.formattedUrl}
                  style={{
                    width: '130px',
                    height: '130px',
                    borderRadius: '8px',
                    background: config.transparentBg ? '#121826' : (config.bgColor || '#090d16')
                  }}
                />
                <span style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  width: '100%',
                  textAlign: 'center'
                }}>
                  {item.originalUrl}
                </span>

                <button
                  onClick={() => handleDownloadSingle(item)}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '6px', fontSize: '0.75rem' }}
                >
                  <Download size={13} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
