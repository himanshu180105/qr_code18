import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import confetti from 'canvas-confetti';
import { Download, Copy, Printer, Check, Sparkles, Image, ShieldCheck, Share2 } from 'lucide-react';

export default function QRPreviewCard({ payload, config, showToast, saveToHistory }) {
  const ref = useRef(null);
  const qrCodeRef = useRef(null);
  const [downloadSize, setDownloadSize] = useState(600);
  const [isCopied, setIsCopied] = useState(false);
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    // Initialize QR Code Instance
    qrCodeRef.current = new QRCodeStyling({
      width: 280,
      height: 280,
      type: 'canvas',
      data: payload || 'https://qr-studio-pro.app',
      margin: config.margin || 10,
      qrOptions: {
        errorCorrectionLevel: config.errorCorrection || 'M'
      },
      image: config.logoUrl || undefined,
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: 0.28,
        margin: 4
      },
      dotsOptions: {
        type: config.dotStyle || 'square',
        color: config.fgColor || '#00f2fe',
        gradient: config.useGradient ? {
          type: 'linear',
          colorStops: [
            { offset: 0, color: config.fgColor || '#00f2fe' },
            { offset: 1, color: config.gradientColor || '#4facfe' }
          ]
        } : undefined
      },
      backgroundOptions: {
        color: config.transparentBg ? 'transparent' : (config.bgColor || '#090d16')
      },
      cornersSquareOptions: {
        type: config.cornerFrameStyle || 'square',
        color: config.fgColor || '#00f2fe'
      },
      cornersDotOptions: {
        type: config.cornerBallStyle || 'square',
        color: config.fgColor || '#00f2fe'
      }
    });

    if (ref.current) {
      ref.current.innerHTML = '';
      qrCodeRef.current.append(ref.current);
    }
  }, []);

  // Update QR code whenever payload or styling config changes
  useEffect(() => {
    if (!qrCodeRef.current) return;
    setIsRendering(true);

    const updateOptions = {
      data: payload || 'https://qr-studio-pro.app',
      margin: config.margin || 10,
      qrOptions: {
        errorCorrectionLevel: config.errorCorrection || 'M'
      },
      image: config.logoUrl || undefined,
      dotsOptions: {
        type: config.dotStyle || 'square',
        color: config.fgColor || '#00f2fe',
        gradient: config.useGradient ? {
          type: 'linear',
          colorStops: [
            { offset: 0, color: config.fgColor || '#00f2fe' },
            { offset: 1, color: config.gradientColor || '#4facfe' }
          ]
        } : undefined
      },
      backgroundOptions: {
        color: config.transparentBg ? 'transparent' : (config.bgColor || '#090d16')
      },
      cornersSquareOptions: {
        type: config.cornerFrameStyle || 'square',
        color: config.fgColor || '#00f2fe'
      },
      cornersDotOptions: {
        type: config.cornerBallStyle || 'square',
        color: config.fgColor || '#00f2fe'
      }
    };

    qrCodeRef.current.update(updateOptions);
    setIsRendering(false);
  }, [payload, config]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00f2fe', '#4facfe', '#7000ff']
    });
  };

  const handleDownload = (format) => {
    if (!qrCodeRef.current) return;
    
    // Temporarily set resolution for download
    qrCodeRef.current.update({
      width: downloadSize,
      height: downloadSize
    });

    qrCodeRef.current.download({
      name: `qr-code-${Date.now()}`,
      extension: format
    });

    // Reset preview size
    setTimeout(() => {
      qrCodeRef.current.update({
        width: 280,
        height: 280
      });
    }, 200);

    triggerConfetti();
    saveToHistory(payload, config);
    showToast(`Downloaded QR Code (${format.toUpperCase()}) at ${downloadSize}x${downloadSize}px`, 'success');
  };

  const handleCopyImage = async () => {
    try {
      const canvas = ref.current.querySelector('canvas');
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write(item);
          setIsCopied(true);
          triggerConfetti();
          saveToHistory(payload, config);
          showToast('QR Code Image copied to Clipboard!', 'success');
          setTimeout(() => setIsCopied(false), 2500);
        }
      });
    } catch (err) {
      showToast('Copying image is not supported in this browser.', 'error');
    }
  };

  const handlePrint = () => {
    saveToHistory(payload, config);
    window.print();
  };

  return (
    <div className="glass-panel" style={{
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      position: 'relative'
    }}>
      {/* Live Badge & Quality indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#34d399',
            boxShadow: '0 0 10px #34d399'
          }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>
            LIVE PREVIEW
          </span>
        </div>

        <span className="badge" style={{ gap: '4px' }}>
          <ShieldCheck size={12} /> HD Vector Ready
        </span>
      </div>

      {/* QR Canvas Display Wrapper */}
      <div
        style={{
          background: config.transparentBg ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 16 16\'><rect width=\'8\' height=\'8\' fill=\'%231a2333\'/><rect x=\'8\' width=\'8\' height=\'8\' fill=\'%230e1522\'/><rect y=\'8\' width=\'8\' height=\'8\' fill=\'%230e1522\'/><rect x=\'8\' y=\'8\' width=\'8\' height=\'8\' fill=\'%231a2333\'/></svg>")' : (config.bgColor || '#090d16'),
          padding: '16px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          transition: 'all 0.3s ease',
          minWidth: '280px',
          minHeight: '280px'
        }}
      >
        <div ref={ref} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
      </div>

      {/* Resolution Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        justifyContent: 'center'
      }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
          Export Resolution:
        </span>
        {[
          { size: 300, label: '300px' },
          { size: 600, label: '600px' },
          { size: 1200, label: '1200px (Print)' },
          { size: 2400, label: '2400px (4K)' }
        ].map((res) => (
          <button
            key={res.size}
            type="button"
            onClick={() => setDownloadSize(res.size)}
            style={{
              background: downloadSize === res.size ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.04)',
              border: downloadSize === res.size ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
              color: downloadSize === res.size ? 'var(--accent-primary)' : 'var(--text-muted)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '3px 8px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {res.label}
          </button>
        ))}
      </div>

      {/* Main Download & Action Buttons */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '100%'
      }}>
        <button
          type="button"
          onClick={() => handleDownload('png')}
          className="btn-primary"
          style={{ width: '100%', py: '14px' }}
        >
          <Download size={18} /> Download High-Res PNG
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          <button
            type="button"
            onClick={() => handleDownload('svg')}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '8px' }}
          >
            SVG Vector
          </button>

          <button
            type="button"
            onClick={() => handleDownload('webp')}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '8px' }}
          >
            WEBP Image
          </button>

          <button
            type="button"
            onClick={handleCopyImage}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', padding: '8px', color: isCopied ? '#34d399' : 'inherit' }}
          >
            {isCopied ? <Check size={14} /> : <Copy size={14} />} Copy Image
          </button>
        </div>
      </div>
    </div>
  );
}
