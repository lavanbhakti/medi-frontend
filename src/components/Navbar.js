import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cartCount, getUserName, API, saveAuth } from '../api';

function Navbar({ auth, onLogout, onLogin, cartUpdated }) {
  const navigate = useNavigate();
  const count = cartCount();

  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError('');
    setAdminLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: adminEmail, password: adminPassword }),
      });
      const data = await res.json();
      if (data.success) {
        saveAuth(data);
        setShowAdminPopup(false);
        setAdminEmail('');
        setAdminPassword('');
        if (onLogin) onLogin(data);
        navigate('/admin');
      } else {
        setAdminError(data.message || 'Invalid credentials');
      }
    } catch {
      setAdminError('Cannot connect to server');
    } finally {
      setAdminLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <>
      <nav style={{
        background: 'linear-gradient(135deg, #0a6e4f 0%, #14a97a 100%)',
        padding: '0 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
      }}>
        <div className="d-flex align-items-center justify-content-between" style={{ height: '64px' }}>

          {/* ✅ Logo — click goes to Home */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: '8px', padding: '4px 8px',
              color: '#0a6e4f', fontWeight: '800', fontSize: '18px',
              cursor: 'pointer'
            }}>
              💊 MediAI
            </div>
          </Link>

          {/* Nav Links */}
          <div className="d-flex align-items-center" style={{ gap: '24px' }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              Home
            </Link>
            <Link to="/shop" style={{ color: 'white', textDecoration: 'none', fontWeight: '500' }}>
              Medicines
            </Link>
            <Link to="/ai-assistant" style={{
              color: '#fff', textDecoration: 'none', fontWeight: '600',
              background: 'rgba(255,255,255,0.2)', padding: '6px 14px',
              borderRadius: '20px', border: '1px solid rgba(255,255,255,0.4)'
            }}>
              🤖 AI Assistant
            </Link>

            {/* Cart */}
            <Link to="/cart" style={{ color: 'white', textDecoration: 'none', position: 'relative' }}>
              <i className="fas fa-shopping-cart" style={{ fontSize: '20px' }}></i>
              {count > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px',
                  background: '#ff4757', color: 'white', borderRadius: '50%',
                  width: '18px', height: '18px', fontSize: '11px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700'
                }}>{count}</span>
              )}
            </Link>

            {/* Auth section */}
            {auth ? (
              <div className="d-flex align-items-center" style={{ gap: '12px' }}>
                {auth.role === 'ADMIN' && (
                  <Link to="/admin" style={{
                    color: '#fff', textDecoration: 'none', fontSize: '13px', opacity: 0.8
                  }}>
                    Admin Panel
                  </Link>
                )}
                {auth.role === 'USER' && (
                  <Link to="/my-orders" style={{
                    color: '#fff', textDecoration: 'none', fontSize: '13px'
                  }}>
                    My Orders
                  </Link>
                )}
                <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px' }}>
                  👤 {getUserName()}
                </span>
                <button onClick={handleLogout} style={{
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)',
                  color: 'white', padding: '4px 14px', borderRadius: '6px',
                  cursor: 'pointer', fontSize: '13px'
                }}>
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '10px' }}>
                <Link to="/login" style={{
                  color: 'white', textDecoration: 'none', padding: '5px 14px',
                  border: '1px solid rgba(255,255,255,0.5)', borderRadius: '6px', fontSize: '14px'
                }}>Login</Link>
                <Link to="/register" style={{
                  background: 'white', color: '#0a6e4f', textDecoration: 'none',
                  padding: '5px 14px', borderRadius: '6px', fontWeight: '600', fontSize: '14px'
                }}>Register</Link>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Small Admin text at bottom of navbar */}
        {!auth && (
          <div style={{ textAlign: 'right', paddingBottom: '4px', paddingRight: '4px' }}>
            <span
              onClick={() => setShowAdminPopup(true)}
              style={{
                color: 'rgba(255,255,255,0.25)',
                fontSize: '10px',
                cursor: 'pointer',
                userSelect: 'none',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.5)'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.25)'}
            >
              admin
            </span>
          </div>
        )}
      </nav>

      {/* Admin Login Popup */}
      {showAdminPopup && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.7)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowAdminPopup(false); }}
        >
          <div style={{
            background: 'white', borderRadius: '20px', padding: '36px',
            width: '380px', boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
          }}>
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🔐</div>
              <h5 style={{ fontWeight: '800', color: '#0a6e4f', margin: 0 }}>Admin Access</h5>
              <p style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>
                Authorized personnel only
              </p>
            </div>

            <form onSubmit={handleAdminLogin}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{
                  fontSize: '13px', fontWeight: '600', color: '#555',
                  display: 'block', marginBottom: '6px'
                }}>
                  Email
                </label>
                <input
                  type="email" required
                  value={adminEmail}
                  onChange={e => setAdminEmail(e.target.value)}
                  placeholder="Admin email"
                  style={{
                    width: '100%', padding: '11px 14px', borderRadius: '10px',
                    border: '2px solid #e0f5ee', outline: 'none',
                    fontSize: '14px', boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = '#0a6e4f'}
                  onBlur={e => e.target.style.borderColor = '#e0f5ee'}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  fontSize: '13px', fontWeight: '600', color: '#555',
                  display: 'block', marginBottom: '6px'
                }}>
                  Password
                </label>
                <input
                  type="password" required
                  value={adminPassword}
                  onChange={e => setAdminPassword(e.target.value)}
                  placeholder="Admin password"
                  style={{
                    width: '100%', padding: '11px 14px', borderRadius: '10px',
                    border: '2px solid #e0f5ee', outline: 'none',
                    fontSize: '14px', boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = '#0a6e4f'}
                  onBlur={e => e.target.style.borderColor = '#e0f5ee'}
                />
              </div>

              {adminError && (
                <div style={{
                  background: '#ffe0e0', color: '#c00', padding: '10px',
                  borderRadius: '8px', fontSize: '13px', marginBottom: '14px'
                }}>
                  ⚠️ {adminError}
                </div>
              )}

              <button type="submit" disabled={adminLoading} style={{
                width: '100%', background: '#0a6e4f', color: 'white',
                border: 'none', padding: '13px', borderRadius: '10px',
                fontWeight: '700', fontSize: '15px', cursor: 'pointer'
              }}>
                {adminLoading ? 'Logging in...' : 'Login as Admin'}
              </button>
 
              <button type="button" onClick={() => setShowAdminPopup(false)} style={{
                width: '100%', background: '#f5f5f5', color: '#666',
                border: 'none', padding: '11px', borderRadius: '10px',
                fontWeight: '600', fontSize: '14px', cursor: 'pointer', marginTop: '10px'
              }}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;