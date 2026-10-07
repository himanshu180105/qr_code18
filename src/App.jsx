import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import LinkInputForm from './components/LinkInputForm';
import { WifiForm, VCardForm, EmailForm, SmsForm, TextForm } from './components/PayloadForms';
import CustomizationPanel from './components/CustomizationPanel';
import QRPreviewCard from './components/QRPreviewCard';
import BatchGenerator from './components/BatchGenerator';
import QRScanner from './components/QRScanner';
import HistoryDrawer from './components/HistoryDrawer';
import ToastNotification from './components/ToastNotification';
import { Link2, Wifi, User, Mail, MessageSquare, FileText, Sparkles } from 'lucide-react';

export default function App() {
  // Navigation & Mode
  const [activeMode, setActiveMode] = useState('single');
  const [payloadType, setPayloadType] = useState('link');

  // Payload Data States
  const [link, setLink] = useState('https://github.com');
  const [wifiData, setWifiData] = useState({ ssid: 'MyHomeWiFi', password: 'SecretPassword123', encryption: 'WPA' });
  const [vcardData, setVcardData] = useState({ firstName: 'Alex', lastName: 'Morgan', phone: '+1234567890', email: 'alex@example.com', organization: 'TechCorp', title: 'Lead Engineer' });
  const [emailData, setEmailData] = useState({ recipient: 'hello@example.com', subject: 'Inquiry', body: 'Hello!' });
  const [smsData, setSmsData] = useState({ phone: '+1234567890', message: 'Hello from QR Code!' });
  const [text, setText] = useState('Sample text inside QR code');

  // Customization Configuration State
  const [config, setConfig] = useState({
    fgColor: '#00f2fe',
    bgColor: '#090d16',
    transparentBg: false,
    useGradient: true,
    gradientColor: '#7000ff',
    dotStyle: 'rounded',
    cornerFrameStyle: 'extra-rounded',
    cornerBallStyle: 'dot',
    logoUrl: '',
    errorCorrection: 'M',
    margin: 10
  });

  // History & Toast Notifications
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState(null);

  // Load history from localStorage on startup
  useEffect(() => {
    try {
      const saved = localStorage.getItem('qr_studio_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load history:', e);
    }
  }, []);

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const saveToHistory = (currentPayload, currentConfig) => {
    if (!currentPayload) return;
    try {
      const newItem = {
        id: Date.now().toString(),
        payload: currentPayload,
        type: payloadType,
        config: { ...currentConfig },
        timestamp: new Date().toISOString()
      };

      setHistory(prev => {
        // Prevent duplicate consecutive entries
        if (prev.length > 0 && prev[0].payload === currentPayload) return prev;
        const updated = [newItem, ...prev].slice(0, 25);
        localStorage.setItem('qr_studio_history', JSON.stringify(updated));
        return updated;
      });
    } catch (e) {
      console.error('Failed to save history item:', e);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('qr_studio_history');
    showToast('History cleared successfully', 'info');
  };

  const handleSelectHistoryItem = (item) => {
    if (item.payload) {
      setPayloadType('link');
      setLink(item.payload);
      if (item.config) setConfig(item.config);
      setActiveMode('single');
      showToast('Loaded QR configuration from history', 'success');
    }
  };

  // Compute final QR payload text dynamically
  const activePayload = useMemo(() => {
    switch (payloadType) {
      case 'link':
        if (!link) return '';
        if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(link)) return link;
        return `https://${link}`;
      case 'wifi':
        return `WIFI:S:${wifiData.ssid || ''};T:${wifiData.encryption || 'WPA'};P:${wifiData.password || ''};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardData.lastName};${vcardData.firstName};;;\nFN:${vcardData.firstName} ${vcardData.lastName}\nTEL:${vcardData.phone}\nEMAIL:${vcardData.email}\nORG:${vcardData.organization}\nTITLE:${vcardData.title}\nEND:VCARD`;
      case 'email':
        return `mailto:${emailData.recipient || ''}?subject=${encodeURIComponent(emailData.subject || '')}&body=${encodeURIComponent(emailData.body || '')}`;
      case 'sms':
        return `smsto:${smsData.phone || ''}:${smsData.message || ''}`;
      case 'text':
        return text || '';
      default:
        return link;
    }
  }, [payloadType, link, wifiData, vcardData, emailData, smsData, text]);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '24px 20px 60px 20px'
    }}>
      {/* Top Header */}
      <Header
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        historyCount={history.length}
      />

      {/* Main App Modes */}
      {activeMode === 'single' && (
        <main style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '24px'
        }}>
          {/* Main 2-Column Responsive Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)',
            gap: '24px',
            alignItems: 'start'
          }} className="responsive-grid">
            
            {/* Left Panel: Inputs & Customization */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Payload Selector Tabs */}
              <div className="glass-panel" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em' }}>
                    1. SELECT DATA TYPE
                  </span>
                  <span className="badge">Auto Sync</span>
                </div>

                <div className="tabs-header">
                  <button
                    onClick={() => setPayloadType('link')}
                    className={`tab-btn ${payloadType === 'link' ? 'active' : ''}`}
                  >
                    <Link2 size={16} /> Link / URL
                  </button>
                  <button
                    onClick={() => setPayloadType('wifi')}
                    className={`tab-btn ${payloadType === 'wifi' ? 'active' : ''}`}
                  >
                    <Wifi size={16} /> Wi-Fi
                  </button>
                  <button
                    onClick={() => setPayloadType('vcard')}
                    className={`tab-btn ${payloadType === 'vcard' ? 'active' : ''}`}
                  >
                    <User size={16} /> vCard
                  </button>
                  <button
                    onClick={() => setPayloadType('email')}
                    className={`tab-btn ${payloadType === 'email' ? 'active' : ''}`}
                  >
                    <Mail size={16} /> Email
                  </button>
                  <button
                    onClick={() => setPayloadType('sms')}
                    className={`tab-btn ${payloadType === 'sms' ? 'active' : ''}`}
                  >
                    <MessageSquare size={16} /> SMS
                  </button>
                  <button
                    onClick={() => setPayloadType('text')}
                    className={`tab-btn ${payloadType === 'text' ? 'active' : ''}`}
                  >
                    <FileText size={16} /> Text
                  </button>
                </div>

                {/* Dynamic Payload Form */}
                <div style={{ marginTop: '20px' }}>
                  {payloadType === 'link' && <LinkInputForm link={link} setLink={setLink} showToast={showToast} />}
                  {payloadType === 'wifi' && <WifiForm wifiData={wifiData} setWifiData={setWifiData} />}
                  {payloadType === 'vcard' && <VCardForm vcardData={vcardData} setVcardData={setVcardData} />}
                  {payloadType === 'email' && <EmailForm emailData={emailData} setEmailData={setEmailData} />}
                  {payloadType === 'sms' && <SmsForm smsData={smsData} setSmsData={setSmsData} />}
                  {payloadType === 'text' && <TextForm text={text} setText={setText} />}
                </div>
              </div>

              {/* Step 2: Customization Styling */}
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                  2. CUSTOMIZE APPEARANCE & BRANDING
                </span>
                <CustomizationPanel config={config} setConfig={setConfig} showToast={showToast} />
              </div>
            </div>

            {/* Right Panel: Sticky Live Preview & Download Card */}
            <div style={{ position: 'sticky', top: '24px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.05em', display: 'block', marginBottom: '10px' }}>
                3. LIVE PREVIEW & EXPORT
              </span>
              <QRPreviewCard
                payload={activePayload}
                config={config}
                showToast={showToast}
                saveToHistory={saveToHistory}
              />
            </div>
          </div>
        </main>
      )}

      {/* Batch Generator Mode */}
      {activeMode === 'batch' && (
        <BatchGenerator config={config} showToast={showToast} />
      )}

      {/* QR Scanner Mode */}
      {activeMode === 'scan' && (
        <QRScanner showToast={showToast} />
      )}

      {/* History Mode */}
      {activeMode === 'history' && (
        <HistoryDrawer
          history={history}
          onSelectHistoryItem={handleSelectHistoryItem}
          onClearHistory={handleClearHistory}
          showToast={showToast}
        />
      )}

      {/* Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Media Query Styling for Mobile Grid */}
      <style>{`
        @media (max-width: 900px) {
          .responsive-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
