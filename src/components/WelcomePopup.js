import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../api';

function WelcomePopup() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup only if:
    // 1. User is NOT logged in
    // 2. Hasn't dismissed it this session
    const dismissed = sessionStorage.getItem('welcomeDismissed');
    if (!isLoggedIn() && !dismissed) {
      // Small delay so page loads first
      const timer = setTimeout(() => setShow(true), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = () => {
    setShow(false);
    navigate('/login');
  };

  const handleLater = () => {
    // Remember dismissed for this session only
    sessionStorage.setItem('welcomeDismissed', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <>
      {/* Dark overlay */}
      <div style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.6)',
        zIndex: 8888,
        animation: 'fadeIn 0.3s ease'
      }} />

      {/* Popup card */}
      <div style={{
        position: 'fixed',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 8999,
        background: 'white',
        borderRadius: '24px',
        padding: '40px 36px',
        width: '100%',
        maxWidth: '420px',
        boxShadow: '0 30px 80px rgba(0,0,0,0.3)',
        textAlign: 'center',
        animation: 'slideUp 0.4s ease'
      }}>

        {/* Icon */}
        <div style={{ fontSize: '56px', marginBottom: '16px' }}>💊</div>

        {/* Title */}
        <h3 style={{ fontWeight: '800', color: '#0a6e4f', marginBottom: '8px', fontSize: '22px' }}>
          Welcome to MediAI!
        </h3>

        {/* Subtitle */}
        <p style={{ color: '#666', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
          Login to get the <strong>best experience</strong> —
          track your orders, save your history,
          and get personalized medicine suggestions! 🤖
        </p>

        {/* Features list */}
        <div style={{
          background: '#f8fffe', borderRadius: '12px',
          padding: '16px', marginBottom: '24px', textAlign: 'left'
        }}>
          {[
            { icon: '🤖', text: 'AI symptom checker & medicine suggestions' },
            { icon: '📦', text: 'Track your orders in real time' },
            { icon: '🛒', text: 'Faster checkout with saved details' },
            { icon: '🔐', text: 'Secure JWT protected account' },
          ].map(f => (
            <div key={f.text} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px' }}>{f.icon}</span>
              <span style={{ fontSize: '13px', color: '#444' }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={handleLogin}
          style={{
            width: '100%', background: '#0a6e4f', color: 'white',
            border: 'none', padding: '14px', borderRadius: '12px',
            fontWeight: '700', fontSize: '16px', cursor: 'pointer',
            marginBottom: '12px', transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.target.style.background = '#085c42'}
          onMouseLeave={e => e.target.style.background = '#0a6e4f'}
        >
          🔑 Login Now
        </button>

        <button
          onClick={handleLater}
          style={{
            width: '100%', background: 'transparent',
            color: '#888', border: '2px solid #eee',
            padding: '12px', borderRadius: '12px',
            fontWeight: '600', fontSize: '14px', cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => { e.target.style.background = '#f5f5f5'; e.target.style.color = '#555'; }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#888'; }}
        >
          Maybe Later
        </button>

        <p style={{ color: '#bbb', fontSize: '11px', marginTop: '14px', marginBottom: 0 }}>
          You can still browse medicines without logging in
        </p>
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translate(-50%, -40%); opacity: 0; }
          to   { transform: translate(-50%, -50%); opacity: 1; }
        }
      `}</style>
    </>
  );
}

export default WelcomePopup;