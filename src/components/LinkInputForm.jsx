import React, { useState } from 'react';
import { Link2, Clipboard, ExternalLink, Sparkles, Check } from 'lucide-react';

export default function LinkInputForm({ link, setLink, showToast }) {
  const [isCopied, setIsCopied] = useState(false);

  // Quick preset links for easy testing
  const presets = [
    { label: 'GitHub', url: 'https://github.com' },
    { label: 'Google', url: 'https://google.com' },
    { label: 'YouTube', url: 'https://youtube.com' },
    { label: 'LinkedIn', url: 'https://linkedin.com' },
    { label: 'Portfolio', url: 'https://react.dev' }
  ];

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setLink(text);
        showToast('Pasted URL from clipboard!', 'success');
      }
    } catch (err) {
      showToast('Clipboard access denied. Please paste manually.', 'error');
    }
  };

  const handleCopy = () => {
    if (!link) return;
    navigator.clipboard.writeText(link);
    setIsCopied(true);
    showToast('Copied link to clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Helper to ensure URL has valid protocol format
  const getFormattedUrl = (raw) => {
    if (!raw) return '';
    if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(raw)) {
      return raw;
    }
    return `https://${raw}`;
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div className="input-group">
        <label className="input-label" htmlFor="qr-target-url">
          <Link2 size={16} className="text-cyan-400" /> Destination Web Link / URL
        </label>
        
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            id="qr-target-url"
            type="url"
            className="input-field"
            style={{
              paddingLeft: '42px',
              paddingRight: '90px',
              fontSize: '1rem',
              fontWeight: 500,
              height: '48px'
            }}
            placeholder="e.g. https://your-website.com or google.com"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onBlur={() => {
              if (link && !link.startsWith('http://') && !link.startsWith('https://') && !link.startsWith('mailto:') && !link.startsWith('tel:')) {
                setLink(getFormattedUrl(link));
              }
            }}
          />
          <Link2
            size={18}
            style={{
              position: 'absolute',
              left: '14px',
              color: 'var(--accent-primary)',
              pointerEvents: 'none'
            }}
          />

          <div style={{ position: 'absolute', right: '8px', display: 'flex', gap: '4px' }}>
            <button
              type="button"
              onClick={handlePaste}
              title="Paste from Clipboard"
              className="btn-icon"
              style={{ width: '34px', height: '34px' }}
            >
              <Clipboard size={15} />
            </button>
            {link && (
              <button
                type="button"
                onClick={handleCopy}
                title="Copy URL"
                className="btn-icon"
                style={{ width: '34px', height: '34px' }}
              >
                {isCopied ? <Check size={15} color="#34d399" /> : <Link2 size={15} />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* URL Verification & Quick Presets */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        padding: '12px',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
            Quick Presets:
          </span>
          {presets.map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => setLink(preset.url)}
              style={{
                background: link === preset.url ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: link === preset.url ? '1px solid rgba(0, 242, 254, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                color: link === preset.url ? 'var(--accent-primary)' : 'var(--text-muted)',
                fontSize: '0.76rem',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {link && (
          <a
            href={getFormattedUrl(link)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8rem',
              color: 'var(--accent-primary)',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Test Link <ExternalLink size={13} />
          </a>
        )}
      </div>
    </div>
  );
}
