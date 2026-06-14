import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../api';

const STATUSES = ['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
const STATUS_COLORS = {
  PENDING:   { bg: '#fff3cd', color: '#856404' },
  CONFIRMED: { bg: '#cce5ff', color: '#004085' },
  SHIPPED:   { bg: '#d4edda', color: '#155724' },
  DELIVERED: { bg: '#d1ecf1', color: '#0c5460' },
  CANCELLED: { bg: '#f8d7da', color: '#721c24' },
};

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    apiFetch('/api/orders/all').then(r => r.json()).then(d => { setOrders(d); setLoading(false); });
  }, []);

  const handleStatus = async (id, status) => {
    await apiFetch(`/api/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) });
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  if (loading) return <div className="text-center py-5"><div className="spinner-border" style={{ color: '#0a6e4f' }}></div></div>;

  return (
    <div>
      <h4 style={{ fontWeight: '800', marginBottom: '24px' }}>📦 All Orders ({orders.length})</h4>

      {orders.length === 0 && (
        <div style={{ background: 'white', borderRadius: '14px', padding: '60px', textAlign: 'center', color: '#888' }}>No orders yet</div>
      )}

      {orders.map(order => {
        const sc = STATUS_COLORS[order.status] || STATUS_COLORS.PENDING;
        const isOpen = expanded === order.id;
        return (
          <div key={order.id} style={{ background: 'white', borderRadius: '14px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            {/* Row */}
            <div className="d-flex align-items-center justify-content-between" style={{ padding: '16px 20px', cursor: 'pointer' }} onClick={() => setExpanded(isOpen ? null : order.id)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div>
                  <div style={{ fontWeight: '700', fontSize: '15px' }}>Order #{order.id}</div>
                  <div style={{ fontSize: '12px', color: '#888' }}>
                    {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {' · '}{order.user?.name || order.user?.email}
                  </div>
                </div>
                <span style={{ background: sc.bg, color: sc.color, padding: '4px 12px', borderRadius: '14px', fontSize: '12px', fontWeight: '700' }}>
                  {order.status}
                </span>
                <span style={{ fontWeight: '700', color: '#0a6e4f' }}>₹{order.totalAmount?.toFixed(2)}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Status dropdown */}
                <select value={order.status} onChange={e => { e.stopPropagation(); handleStatus(order.id, e.target.value); }}
                  onClick={e => e.stopPropagation()}
                  style={{ padding: '6px 10px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '13px', cursor: 'pointer' }}>
                  {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <span style={{ fontSize: '18px', color: '#888' }}>{isOpen ? '▲' : '▼'}</span>
              </div>
            </div>

            {/* Expanded details */}
            {isOpen && (
              <div style={{ borderTop: '1px solid #f0f0f0', padding: '16px 20px', background: '#fafffe' }}>
                <div className="row">
                  <div className="col-md-6">
                    <p style={{ fontSize: '13px', margin: '0 0 4px' }}><strong>Customer:</strong> {order.user?.name} ({order.user?.email})</p>
                    <p style={{ fontSize: '13px', margin: '0 0 4px' }}><strong>Phone:</strong> {order.phone}</p>
                    <p style={{ fontSize: '13px', margin: 0 }}><strong>Address:</strong> {order.deliveryAddress}</p>
                  </div>
                  <div className="col-md-6">
                    <strong style={{ fontSize: '13px' }}>Items:</strong>
                    {order.items?.map(item => (
                      <div key={item.id} className="d-flex justify-content-between mt-1" style={{ fontSize: '13px' }}>
                        <span>{item.medicine?.name} × {item.quantity}</span>
                        <span style={{ fontWeight: '600' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="d-flex justify-content-between mt-2 pt-2" style={{ borderTop: '1px solid #eee' }}>
                      <strong>Total</strong>
                      <strong style={{ color: '#0a6e4f' }}>₹{order.totalAmount?.toFixed(2)}</strong>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default AdminOrders;
