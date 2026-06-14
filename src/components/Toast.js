import React, { useEffect, useState } from 'react';

/**
 * Toast component
 * Props:
 *   message  - text to show
 *   type     - 'success' | 'error' | 'info'
 *   onClose  - called when toast disappears
 */
function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Auto close after 3 seconds
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for fade out animation
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: { bg: '#0a6e4f', icon: '✅' },
    error:   { bg: '#dc3545', icon: '❌' },
    info:    { bg: '#0d6efd', icon: 'ℹ️' },
  };

  const { bg, icon } = colors[type] || colors.success;

  return (
    <div style={{
      position: 'fixed',
      bottom: '28px',
      right: '24px',
      zIndex: 9999,
      background: bg,
      color: 'white',
      padding: '14px 20px',
      borderRadius: '14px',
      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      minWidth: '260px',
      maxWidth: '360px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.3s ease',
    }}>
      <span style={{ fontSize: '20px' }}>{icon}</span>
      <span style={{ fontWeight: '600', fontSize: '14px', flex: 1 }}>{message}</span>
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
        style={{
          background: 'rgba(255,255,255,0.2)', border: 'none',
          color: 'white', width: '24px', height: '24px',
          borderRadius: '50%', cursor: 'pointer',
          fontSize: '14px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontWeight: '700', flexShrink: 0
        }}
      >
        ✕
      </button>
    </div>
  );
}

export default Toast;