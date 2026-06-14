import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const menu = [
  { path: '/admin',            icon: '📊', label: 'Dashboard'  },
  { path: '/admin/medicines',  icon: '💊', label: 'Medicines'  },
  { path: '/admin/categories', icon: '📂', label: 'Categories' },
  { path: '/admin/orders',     icon: '📦', label: 'Orders'     },
];

function AdminLayout({ children, onLogout }) {
  const location = useLocation();
  const navigate  = useNavigate();

// ✅ NEW — go to home page after admin logout
const handleLogout = () => { onLogout(); navigate('/'); };
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '240px', background: 'linear-gradient(180deg,#0a6e4f 0%,#085c42 100%)', color: 'white', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, bottom: 0 }}>
        {/* Logo */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontWeight: '800', fontSize: '20px' }}>💊 MediAI</div>
          <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>Admin Panel</div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {menu.map(m => {
            const active = location.pathname === m.path;
            return (
              <Link key={m.path} to={m.path} style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '12px 14px', borderRadius: '10px', marginBottom: '4px',
                textDecoration: 'none',
                background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: 'white', fontWeight: active ? '700' : '400',
                fontSize: '14px'
              }}>
                <span>{m.icon}</span>{m.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '16px' }}>
          <button onClick={handleLogout} style={{ width: '100%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '14px' }}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '240px', flex: 1, background: '#f8fffe', minHeight: '100vh' }}>
        {/* Top bar */}
        <div style={{ background: 'white', padding: '16px 28px', borderBottom: '1px solid #e8f5ee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          <h5 style={{ margin: 0, fontWeight: '700', color: '#333' }}>
            {menu.find(m => m.path === location.pathname)?.label || 'Admin'}
          </h5>
          <span style={{ background: '#e8f5f0', color: '#0a6e4f', padding: '5px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>
            🔐 JWT Authenticated
          </span>
        </div>

        {/* Page content */}
        <div style={{ padding: '28px' }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
