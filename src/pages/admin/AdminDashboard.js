import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../api';

function AdminDashboard() {
  const [stats, setStats] = useState({ medicines: 0, categories: 0, orders: 0, revenue: 0 });

  useEffect(() => {
    Promise.all([
      apiFetch('/api/medicines').then(r => r.json()),
      apiFetch('/api/categories').then(r => r.json()),
      apiFetch('/api/orders/all').then(r => r.json()),
    ]).then(([meds, cats, orders]) => {
      const revenue = orders.reduce((s, o) => s + (o.totalAmount || 0), 0);
      setStats({ medicines: meds.length, categories: cats.length, orders: orders.length, revenue });
    });
  }, []);

  const cards = [
    { label: 'Total Medicines', value: stats.medicines, icon: '💊', color: '#0a6e4f', link: '/admin/medicines' },
    { label: 'Categories',      value: stats.categories, icon: '📂', color: '#2196F3', link: '/admin/categories' },
    { label: 'Total Orders',    value: stats.orders,     icon: '📦', color: '#FF9800', link: '/admin/orders' },
    { label: 'Total Revenue',   value: `₹${stats.revenue.toFixed(0)}`, icon: '💰', color: '#9C27B0', link: '/admin/orders' },
  ];

  return (
    <div>
      <h4 style={{ fontWeight: '800', marginBottom: '24px', color: '#333' }}>Welcome to MediAI Admin 👋</h4>

      {/* Stat Cards */}
      <div className="row mb-4">
        {cards.map(c => (
          <div key={c.label} className="col-md-3 col-sm-6 mb-3">
            <Link to={c.link} style={{ textDecoration: 'none' }}>
              <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)', borderLeft: `4px solid ${c.color}`, cursor: 'pointer', transition: 'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>{c.icon}</div>
                <div style={{ fontSize: '28px', fontWeight: '800', color: c.color }}>{c.value}</div>
                <div style={{ color: '#888', fontSize: '13px', marginTop: '4px' }}>{c.label}</div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <h5 style={{ fontWeight: '700', marginBottom: '16px' }}>Quick Actions</h5>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link to="/admin/medicines/add" style={{ background: '#0a6e4f', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            + Add Medicine
          </Link>
          <Link to="/admin/categories" style={{ background: '#2196F3', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            + Add Category
          </Link>
          <Link to="/admin/orders" style={{ background: '#FF9800', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', fontSize: '14px' }}>
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
