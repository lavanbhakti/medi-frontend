import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../api';

function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); setError('');
    const res = await fetch(`${API}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setSuccess('Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } else {
      setError(data.message || 'Registration failed');
    }
  };

  const fields = [
    { key: 'name',     label: 'Full Name',    type: 'text',     placeholder: 'Enter your full name',  required: true  },
    { key: 'email',    label: 'Email',         type: 'email',    placeholder: 'Enter your email',       required: true  },
    { key: 'phone',    label: 'Phone Number',  type: 'tel',      placeholder: 'Enter phone number',     required: false },
    { key: 'password', label: 'Password',      type: 'password', placeholder: 'Create a password',      required: true  },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a6e4f, #1dd4a0)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative'
    }}>

      {/* ✅ X Close Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: '20px', right: '24px',
          background: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.5)',
          color: 'white', width: '40px', height: '40px', borderRadius: '50%',
          cursor: 'pointer', fontSize: '18px', fontWeight: '700',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        ✕
      </button>

      {/* ✅ Back to Home */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: '20px', left: '24px',
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)',
          color: 'white', padding: '8px 16px', borderRadius: '20px',
          cursor: 'pointer', fontSize: '14px', fontWeight: '500'
        }}
      >
        ← Back to Home
      </button>

      <div style={{
        background: 'white', borderRadius: '20px', padding: '40px',
        width: '100%', maxWidth: '420px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '40px', marginBottom: '8px' }}>💊</div>
          <h4 style={{ fontWeight: '800', color: '#0a6e4f' }}>Create Account</h4>
          <p style={{ color: '#888', fontSize: '14px' }}>Join MediAI today</p>
        </div>

        <form onSubmit={handleSubmit}>
          {fields.map(f => (
            <div key={f.key} style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '5px' }}>
                {f.label} {f.required && <span style={{ color: 'red' }}>*</span>}
              </label>
              <input
                type={f.type}
                required={f.required}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '2px solid #e0f5ee', outline: 'none', fontSize: '14px', boxSizing: 'border-box' }}
                onFocus={e => e.target.style.borderColor = '#0a6e4f'}
                onBlur={e => e.target.style.borderColor = '#e0f5ee'}
              />
            </div>
          ))}

          {error && (
            <div style={{ background: '#ffe0e0', color: '#c00', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '12px' }}>
              ⚠️ {error}
            </div>
          )}
          {success && (
            <div style={{ background: '#e0ffe0', color: '#006600', padding: '10px', borderRadius: '8px', fontSize: '13px', marginBottom: '12px' }}>
              ✅ {success}
            </div>
          )}

          <button type="submit" style={{
            width: '100%', background: '#0a6e4f', color: 'white',
            border: 'none', padding: '13px', borderRadius: '10px',
            fontWeight: '700', fontSize: '15px', cursor: 'pointer'
          }}>
            Create Account
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#0a6e4f', fontWeight: '700' }}>Sign In</Link>
        </div>

        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <Link to="/" style={{ color: '#aaa', fontSize: '13px', textDecoration: 'none' }}>
            ← Continue browsing without account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;