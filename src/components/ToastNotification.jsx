import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-400" />,
    error: <AlertCircle size={18} className="text-rose-400" />,
    info: <Info size={18} className="text-cyan-400" />
  };

  const bgColors = {
    success: 'rgba(6, 78, 59, 0.9)',
    error: 'rgba(136, 19, 55, 0.9)',
    info: 'rgba(12, 74, 110, 0.9)'
  };

  const borderColors = {
    success: 'rgba(52, 211, 153, 0.4)',
    error: 'rgba(251, 113, 133, 0.4)',
    info: 'rgba(56, 189, 248, 0.4)'
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        background: bgColors[toast.type] || bgColors.info,
        border: `1px solid ${borderColors[toast.type] || borderColors.info}`,
        backdropFilter: 'blur(12px)',
        color: '#ffffff',
        padding: '12px 18px',
        borderRadius: '12px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        maxWidth: '380px',
        animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
      }}
    >
      {icons[toast.type] || icons.info}
      <span style={{ fontSize: '0.9rem', fontWeight: 600, flex: 1 }}>{toast.message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex'
        }}
      >
        <X size={16} />
      </button>
    </div>
  );
}
