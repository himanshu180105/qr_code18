import React, { useState } from 'react';
import { Palette, Shapes, Image as ImageIcon, Sliders, Info, Upload, Trash2, Zap, Check } from 'lucide-react';

export default function CustomizationPanel({ config, setConfig, showToast }) {
  const [activeSubTab, setActiveSubTab] = useState('colors');

  // Pre-configured aesthetic color themes
  const colorPresets = [
    { name: 'Cyber Neon', fg: '#00f2fe', bg: '#090d16', gradient: '#4facfe' },
    { name: 'Midnight Dark', fg: '#ffffff', bg: '#0b0f19', gradient: '#94a3b8' },
    { name: 'Emerald Glow', fg: '#10b981', bg: '#064e3b', gradient: '#34d399' },
    { name: 'Sunset Fusion', fg: '#ff0844', bg: '#180a1c', gradient: '#ffb199' },
    { name: 'Royal Purple', fg: '#a855f7', bg: '#1e1035', gradient: '#ec4899' },
    { name: 'Gold Luxury', fg: '#f59e0b', bg: '#1c1917', gradient: '#fef08a' },
    { name: 'Clean White', fg: '#0f172a', bg: '#ffffff', gradient: '#334155' }
  ];

  // Pre-built logo overlays (SVG data URLs)
  const builtInLogos = [
    { id: 'link', label: 'Link', svg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2300f2fe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' },
    { id: 'wifi', label: 'Wi-Fi', svg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="%2300f2fe" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>' },
    { id: 'star', label: 'Star', svg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%2300f2fe" stroke="%2300f2fe" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
    { id: 'github', label: 'GitHub', svg: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="%23ffffff"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>' }
  ];

  const handleApplyPreset = (preset) => {
    setConfig(prev => ({
      ...prev,
      fgColor: preset.fg,
      bgColor: preset.bg,
      gradientColor: preset.gradient,
      useGradient: true
    }));
    showToast(`Applied ${preset.name} theme`, 'info');
  };

  const handleCustomLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Logo file size must be less than 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setConfig(prev => ({
          ...prev,
          logoUrl: event.target.result,
          errorCorrection: 'H' // High error correction recommended for logo overlays
        }));
        showToast('Logo uploaded! Set Error Correction to High (H) automatically.', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '20px' }}>
      {/* Sub Tabs */}
      <div style={{
        display: 'flex',
        gap: '6px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '12px',
        marginBottom: '16px'
      }}>
        <button
          onClick={() => setActiveSubTab('colors')}
          className={`tab-btn ${activeSubTab === 'colors' ? 'active' : ''}`}
          style={{ padding: '6px 12px', fontSize: '0.82rem' }}
        >
          <Palette size={15} /> Colors
        </button>

        <button
          onClick={() => setActiveSubTab('shapes')}
          className={`tab-btn ${activeSubTab === 'shapes' ? 'active' : ''}`}
          style={{ padding: '6px 12px', fontSize: '0.82rem' }}
        >
          <Shapes size={15} /> Dots & Frame
        </button>

        <button
          onClick={() => setActiveSubTab('logo')}
          className={`tab-btn ${activeSubTab === 'logo' ? 'active' : ''}`}
          style={{ padding: '6px 12px', fontSize: '0.82rem' }}
        >
          <ImageIcon size={15} /> Logo
        </button>

        <button
          onClick={() => setActiveSubTab('settings')}
          className={`tab-btn ${activeSubTab === 'settings' ? 'active' : ''}`}
          style={{ padding: '6px 12px', fontSize: '0.82rem' }}
        >
          <Sliders size={15} /> Quality
        </button>
      </div>

      {/* --- TAB 1: COLORS --- */}
      {activeSubTab === 'colors' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Color Themes */}
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              Color Theme Presets
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    padding: '6px 10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${preset.fg}, ${preset.gradient || preset.fg})`,
                    border: '1px solid rgba(255,255,255,0.3)'
                  }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-main)', fontWeight: 500 }}>
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Pickers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '4px' }}>
            <div className="input-group">
              <label className="input-label">Foreground Dots Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="color"
                  value={config.fgColor}
                  onChange={(e) => setConfig(prev => ({ ...prev, fgColor: e.target.value }))}
                  style={{ width: '36px', height: '36px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '6px' }}
                />
                <input
                  type="text"
                  className="input-field"
                  value={config.fgColor}
                  onChange={(e) => setConfig(prev => ({ ...prev, fgColor: e.target.value }))}
                  style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Background Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="color"
                  value={config.bgColor}
                  onChange={(e) => setConfig(prev => ({ ...prev, bgColor: e.target.value, transparentBg: false }))}
                  disabled={config.transparentBg}
                  style={{ width: '36px', height: '36px', border: 'none', background: 'none', cursor: 'pointer', borderRadius: '6px', opacity: config.transparentBg ? 0.3 : 1 }}
                />
                <input
                  type="text"
                  className="input-field"
                  value={config.bgColor}
                  onChange={(e) => setConfig(prev => ({ ...prev, bgColor: e.target.value, transparentBg: false }))}
                  disabled={config.transparentBg}
                  style={{ padding: '6px 10px', fontSize: '0.85rem', opacity: config.transparentBg ? 0.3 : 1 }}
                />
              </div>
            </div>
          </div>

          {/* Transparent & Gradient Toggles */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={config.transparentBg}
                onChange={(e) => setConfig(prev => ({ ...prev, transparentBg: e.target.checked }))}
                style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px' }}
              />
              Transparent Background
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={config.useGradient}
                onChange={(e) => setConfig(prev => ({ ...prev, useGradient: e.target.checked }))}
                style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px' }}
              />
              Enable Color Gradient
            </label>
          </div>

          {config.useGradient && (
            <div className="input-group animate-fade-in" style={{ marginTop: '4px' }}>
              <label className="input-label">Gradient Secondary Color</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="color"
                  value={config.gradientColor}
                  onChange={(e) => setConfig(prev => ({ ...prev, gradientColor: e.target.value }))}
                  style={{ width: '36px', height: '36px', border: 'none', background: 'none', cursor: 'pointer' }}
                />
                <input
                  type="text"
                  className="input-field"
                  value={config.gradientColor}
                  onChange={(e) => setConfig(prev => ({ ...prev, gradientColor: e.target.value }))}
                  style={{ padding: '6px 10px', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 2: DOT SHAPES & CORNERS --- */}
      {activeSubTab === 'shapes' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Dot Pattern Selector */}
          <div>
            <label className="input-label" style={{ marginBottom: '8px' }}>QR Code Dot Style</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'square', label: 'Square' },
                { id: 'dots', label: 'Dots' },
                { id: 'rounded', label: 'Rounded' },
                { id: 'extra-rounded', label: 'Extra Smooth' },
                { id: 'classy', label: 'Classy' },
                { id: 'classy-rounded', label: 'Classy Smooth' }
              ].map((style) => (
                <button
                  key={style.id}
                  onClick={() => setConfig(prev => ({ ...prev, dotStyle: style.id }))}
                  style={{
                    background: config.dotStyle === style.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: config.dotStyle === style.id ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: config.dotStyle === style.id ? 'var(--accent-primary)' : 'var(--text-main)',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {style.label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Eye Frame Style */}
          <div>
            <label className="input-label" style={{ marginBottom: '8px' }}>Corner Frame Outer Style</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'square', label: 'Square' },
                { id: 'extra-rounded', label: 'Rounded' },
                { id: 'circle', label: 'Circle' }
              ].map((corner) => (
                <button
                  key={corner.id}
                  onClick={() => setConfig(prev => ({ ...prev, cornerFrameStyle: corner.id }))}
                  style={{
                    background: config.cornerFrameStyle === corner.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: config.cornerFrameStyle === corner.id ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: config.cornerFrameStyle === corner.id ? 'var(--accent-primary)' : 'var(--text-main)',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {corner.label}
                </button>
              ))}
            </div>
          </div>

          {/* Corner Eye Ball Style */}
          <div>
            <label className="input-label" style={{ marginBottom: '8px' }}>Corner Eye Center Ball Style</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'square', label: 'Square' },
                { id: 'circle', label: 'Circle' },
                { id: 'dot', label: 'Dot' }
              ].map((ball) => (
                <button
                  key={ball.id}
                  onClick={() => setConfig(prev => ({ ...prev, cornerBallStyle: ball.id }))}
                  style={{
                    background: config.cornerBallStyle === ball.id ? 'rgba(0, 242, 254, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                    border: config.cornerBallStyle === ball.id ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: config.cornerBallStyle === ball.id ? 'var(--accent-primary)' : 'var(--text-main)',
                    padding: '8px 10px',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {ball.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: LOGO --- */}
      {activeSubTab === 'logo' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
              Center Icon Presets
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {builtInLogos.map((logo) => (
                <button
                  key={logo.id}
                  onClick={() => setConfig(prev => ({ ...prev, logoUrl: logo.svg, errorCorrection: 'H' }))}
                  style={{
                    background: config.logoUrl === logo.svg ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: config.logoUrl === logo.svg ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  <img src={logo.svg} alt={logo.label} style={{ width: '16px', height: '16px' }} />
                  {logo.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Or Upload Custom Logo Image (PNG / SVG)
            </span>
            <label className="btn-secondary" style={{ justifyContent: 'center', padding: '12px', cursor: 'pointer' }}>
              <Upload size={16} /> Choose Image File
              <input type="file" accept="image/*" onChange={handleCustomLogoUpload} style={{ display: 'none' }} />
            </label>
          </div>

          {config.logoUrl && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              background: 'rgba(0, 242, 254, 0.08)',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              borderRadius: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={config.logoUrl} alt="Logo preview" style={{ width: '28px', height: '28px', objectFit: 'contain' }} />
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-primary)', fontWeight: 600 }}>Active Logo Attached</span>
              </div>
              <button
                type="button"
                onClick={() => setConfig(prev => ({ ...prev, logoUrl: '' }))}
                style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', display: 'flex' }}
                title="Remove logo"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>
      )}

      {/* --- TAB 4: QUALITY & SETTINGS --- */}
      {activeSubTab === 'settings' && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="input-label">Error Correction Level</label>
              <span className="badge">{config.errorCorrection}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px' }}>
              {[
                { id: 'L', label: 'L (7%)' },
                { id: 'M', label: 'M (15%)' },
                { id: 'Q', label: 'Q (25%)' },
                { id: 'H', label: 'H (30%)' }
              ].map((ec) => (
                <button
                  key={ec.id}
                  onClick={() => setConfig(prev => ({ ...prev, errorCorrection: ec.id }))}
                  style={{
                    background: config.errorCorrection === ec.id ? 'rgba(0, 242, 254, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                    border: config.errorCorrection === ec.id ? '1px solid var(--accent-primary)' : '1px solid rgba(255, 255, 255, 0.08)',
                    color: config.errorCorrection === ec.id ? 'var(--accent-primary)' : 'var(--text-muted)',
                    padding: '8px 4px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {ec.label}
                </button>
              ))}
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Info size={12} /> Level H (30%) recommended when placing logos in the center.
            </p>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label className="input-label">Quiet Zone / Margin</label>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 600 }}>{config.margin}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={config.margin}
              onChange={(e) => setConfig(prev => ({ ...prev, margin: parseInt(e.target.value) }))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
