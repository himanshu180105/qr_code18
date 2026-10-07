import React from 'react';
import { History, Trash2, ExternalLink, RotateCcw, Copy, Check, Clock } from 'lucide-react';

export default function HistoryDrawer({ history, onSelectHistoryItem, onClearHistory, showToast }) {
  const [copiedId, setCopiedId] = React.useState(null);

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item.payload);
    setCopiedId(item.id);
    showToast('Copied link from history!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <History className="text-cyan-400" size={24} />
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Saved QR History</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Quick access to your previously generated QR codes.
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            onClick={onClearHistory}
            className="btn-secondary"
            style={{ fontSize: '0.8rem', padding: '6px 12px', color: '#f43f5e' }}
          >
            <Trash2 size={14} /> Clear All
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 16px',
          color: 'var(--text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Clock size={36} opacity={0.4} />
          <p style={{ fontWeight: 600 }}>No history saved yet</p>
          <span style={{ fontSize: '0.8rem' }}>Generated QR codes will automatically appear here.</span>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {history.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'rgba(0, 0, 0, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '14px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: item.config.fgColor || 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.config.bgColor || '#000'
                }}>
                  <History size={18} />
                </div>
                <div style={{ overflow: 'hidden' }}>
                  <div style={{
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '320px'
                  }}>
                    {item.payload}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {item.config.dotStyle || 'square'} dots
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => handleCopy(item)}
                  className="btn-icon"
                  style={{ width: '34px', height: '34px' }}
                  title="Copy link"
                >
                  {copiedId === item.id ? <Check size={14} color="#34d399" /> : <Copy size={14} />}
                </button>
                <button
                  onClick={() => onSelectHistoryItem(item)}
                  className="btn-secondary"
                  style={{ fontSize: '0.78rem', padding: '6px 12px' }}
                >
                  <RotateCcw size={13} /> Load
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
