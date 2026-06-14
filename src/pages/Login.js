import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API, saveAuth } from '../api';

function Login({ onLogin, isAdminPage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    const endpoint = isAdminPage ? '/api/auth/admin/login' : '/api/auth/login';
    try {
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        saveAuth(data);
        onLogin(data);
           navigate(data.role === 'ADMIN' ? '/admin' : '/');      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch {
      setError('Cannot connect to server');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a6e4f, #1dd4a0)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>

      {/* ✅ X Close Button — goes back to home */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: '20px', right: '24px',
          background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)',
          color: 'white', width: '40px', height: '40px', borderRadius: '50%',
          cursor: 'pointer', fontSize: '18px', fontWeight: '700',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          lineHeight: 1
        }}
      >
        ✕
      </button>

      {/* ✅ Back to Home link top left */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: '20px', left: '24px',
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)',
          color: 'white', padding: '8px 16px', borderRadius: '20px',
          cursor: 'pointer', fontSize: '14px', fontWeight: '500',
          display: 'flex', alignItems: 'center', gap: '6px'
        }}
      >
        ← Back to Home
      </button>

      <div style={{
        background: 'white', borderRadius: '20px', padding: '40px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>💊</div>
          <h4 style={{ fontWeight: '800', color: '#0a6e4f' }}>
            {isAdminPage ? 'Admin Login' : 'Welcome to MediAI'}
          </h4>
          <p style={{ color: '#888', fontSize: '14px' }}>
            {isAdminPage ? 'Sign in to admin panel' : 'Sign in to your account'}
          </p>
          <div style={{
            background: '#e8f5f0', borderRadius: '8px', padding: '6px 12px',
            display: 'inline-block', fontSize: '12px', color: '#0a6e4f'
          }}>
            🔐 Secured with JWT Authentication
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input
              type="email" value={email}
              onChange={e => setEmail(e.target.value)} required
              placeholder="Enter your email"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e0f5ee', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#0a6e4f'}
              onBlur={e => e.target.style.borderColor = '#e0f5ee'}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <input
              type="password" value={password}
              onChange={e => setPassword(e.target.value)} required
              placeholder="Enter your password"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '2px solid #e0f5ee', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
              onFocus={e => e.target.style.borderColor = '#0a6e4f'}
              onBlur={e => e.target.style.borderColor = '#e0f5ee'}
            />
          </div>

          {error && (
            <div style={{ background: '#ffe0e0', color: '#c00', padding: '10px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '16px' }}>
              ⚠️ {error}
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', background: '#0a6e4f', color: 'white',
            border: 'none', padding: '14px', borderRadius: '10px',
            fontWeight: '700', fontSize: '15px', cursor: 'pointer'
          }}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {!isAdminPage && (
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#0a6e4f', fontWeight: '700' }}>Register</Link>
          </div>
        )}

        {/* Back to home link inside card too */}
        <div style={{ textAlign: 'center', marginTop: '16px' }}>
          <Link to="/" style={{ color: '#aaa', fontSize: '13px', textDecoration: 'none' }}>
            ← Continue browsing without login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;