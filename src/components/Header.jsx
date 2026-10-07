import React from 'react';
import { QrCode, Layers, ScanLine, History, Sparkles, Zap } from 'lucide-react';

export default function Header({ activeMode, setActiveMode, historyCount }) {
  return (
    <header style={{ marginBottom: '32px' }}>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        paddingBottom: '24px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        {/* Brand Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #00f2fe 0%, #7000ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 242, 254, 0.4)',
            color: '#050811'
          }}>
            <QrCode size={28} strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                QR Studio <span className="gradient-text">Pro</span>
              </h1>
              <span className="badge" style={{ gap: '4px' }}>
                <Zap size={11} /> Ultra Fast
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>
              Instant custom QR code engine for links, Wi-Fi, contacts & more
            </p>
          </div>
        </div>

        {/* Top Navigation Modes */}
        <nav style={{
          display: 'flex',
          gap: '6px',
          background: 'rgba(12, 17, 29, 0.8)',
          padding: '6px',
          borderRadius: '16px',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <button
            onClick={() => setActiveMode('single')}
            className={`tab-btn ${activeMode === 'single' ? 'active' : ''}`}
          >
            <Sparkles size={16} /> Generator
          </button>

          <button
            onClick={() => setActiveMode('batch')}
            className={`tab-btn ${activeMode === 'batch' ? 'active' : ''}`}
          >
            <Layers size={16} /> Batch Links
          </button>

          <button
            onClick={() => setActiveMode('scan')}
            className={`tab-btn ${activeMode === 'scan' ? 'active' : ''}`}
          >
            <ScanLine size={16} /> Scanner
          </button>

          <button
            onClick={() => setActiveMode('history')}
            className={`tab-btn ${activeMode === 'history' ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            <History size={16} /> History
            {historyCount > 0 && (
              <span style={{
                background: 'var(--accent-primary)',
                color: '#050811',
                fontSize: '0.7rem',
                fontWeight: 800,
                borderRadius: '10px',
                padding: '1px 6px',
                marginLeft: '2px'
              }}>
                {historyCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
