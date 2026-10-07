import React from 'react';
import { Wifi, User, Mail, MessageSquare, FileText, Lock, Eye, EyeOff } from 'lucide-react';

/* --- Wi-Fi Form --- */
export function WifiForm({ wifiData, setWifiData }) {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleChange = (field, val) => {
    setWifiData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      <div className="input-group">
        <label className="input-label" htmlFor="wifi-ssid">
          <Wifi size={16} className="text-cyan-400" /> Network Name (SSID)
        </label>
        <input
          id="wifi-ssid"
          type="text"
          className="input-field"
          placeholder="e.g. Home_5G_Guest"
          value={wifiData.ssid}
          onChange={(e) => handleChange('ssid', e.target.value)}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="input-group">
          <label className="input-label" htmlFor="wifi-password">
            <Lock size={16} className="text-cyan-400" /> Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="wifi-password"
              type={showPassword ? "text" : "password"}
              className="input-field"
              placeholder="Wi-Fi Password"
              value={wifiData.password}
              onChange={(e) => handleChange('password', e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn-icon"
              style={{
                position: 'absolute',
                right: '6px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '32px',
                height: '32px'
              }}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="wifi-encryption">Encryption Type</label>
          <select
            id="wifi-encryption"
            className="input-field"
            value={wifiData.encryption}
            onChange={(e) => handleChange('encryption', e.target.value)}
            style={{ cursor: 'pointer' }}
          >
            <option value="WPA">WPA / WPA2 / WPA3</option>
            <option value="WEP">WEP</option>
            <option value="nopass">None (Open Network)</option>
          </select>
        </div>
      </div>
    </div>
  );
}

/* --- vCard / Contact Form --- */
export function VCardForm({ vcardData, setVcardData }) {
  const handleChange = (field, val) => {
    setVcardData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="input-group">
          <label className="input-label" htmlFor="vcard-fname"><User size={15} /> First Name</label>
          <input
            id="vcard-fname"
            type="text"
            className="input-field"
            placeholder="John"
            value={vcardData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="vcard-lname">Last Name</label>
          <input
            id="vcard-lname"
            type="text"
            className="input-field"
            placeholder="Doe"
            value={vcardData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="input-group">
          <label className="input-label" htmlFor="vcard-phone">Phone Number</label>
          <input
            id="vcard-phone"
            type="tel"
            className="input-field"
            placeholder="+1 (555) 019-2834"
            value={vcardData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="vcard-email"><Mail size={15} /> Email</label>
          <input
            id="vcard-email"
            type="email"
            className="input-field"
            placeholder="john@company.com"
            value={vcardData.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div className="input-group">
          <label className="input-label" htmlFor="vcard-org">Organization / Company</label>
          <input
            id="vcard-org"
            type="text"
            className="input-field"
            placeholder="Acme Corp"
            value={vcardData.organization}
            onChange={(e) => handleChange('organization', e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="vcard-title">Job Title</label>
          <input
            id="vcard-title"
            type="text"
            className="input-field"
            placeholder="Senior Software Engineer"
            value={vcardData.title}
            onChange={(e) => handleChange('title', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

/* --- Email Form --- */
export function EmailForm({ emailData, setEmailData }) {
  const handleChange = (field, val) => {
    setEmailData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="input-group">
        <label className="input-label" htmlFor="email-recipient"><Mail size={15} /> Recipient Email</label>
        <input
          id="email-recipient"
          type="email"
          className="input-field"
          placeholder="contact@example.com"
          value={emailData.recipient}
          onChange={(e) => handleChange('recipient', e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="email-subject">Subject Line</label>
        <input
          id="email-subject"
          type="text"
          className="input-field"
          placeholder="Inquiry regarding your services"
          value={emailData.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="email-body">Email Body</label>
        <textarea
          id="email-body"
          className="input-field"
          placeholder="Write your email template message here..."
          value={emailData.body}
          onChange={(e) => handleChange('body', e.target.value)}
        />
      </div>
    </div>
  );
}

/* --- SMS / WhatsApp Form --- */
export function SmsForm({ smsData, setSmsData }) {
  const handleChange = (field, val) => {
    setSmsData(prev => ({ ...prev, [field]: val }));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="input-group">
        <label className="input-label" htmlFor="sms-phone"><MessageSquare size={15} /> Phone Number (with Country Code)</label>
        <input
          id="sms-phone"
          type="tel"
          className="input-field"
          placeholder="+1234567890"
          value={smsData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      <div className="input-group">
        <label className="input-label" htmlFor="sms-message">Default Message</label>
        <textarea
          id="sms-message"
          className="input-field"
          placeholder="Hello! I am scanning your QR code to connect."
          value={smsData.message}
          onChange={(e) => handleChange('message', e.target.value)}
        />
      </div>
    </div>
  );
}

/* --- Plain Text Form --- */
export function TextForm({ text, setText }) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div className="input-group">
        <label className="input-label" htmlFor="text-content"><FileText size={15} /> Custom Plain Text</label>
        <textarea
          id="text-content"
          className="input-field"
          rows={5}
          placeholder="Enter any custom text, promo code, address, or snippet..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    </div>
  );
}
