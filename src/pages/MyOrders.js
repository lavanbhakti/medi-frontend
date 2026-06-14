import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { apiFetch } from '../api';

const STATUS_COLORS = {
  PENDING:   { bg: '#fff3cd', color: '#856404' },
  CONFIRMED: { bg: '#cce5ff', color: '#004085' },
  SHIPPED:   { bg: '#d4edda', color: '#155724' },
  DELIVERED: { bg: '#d1ecf1', color: '#0c5460' },
  CANCELLED: { bg: '#f8d7da', color: '#721c24' },
};

function MyOrders({ auth, onLogout }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/orders/my')
      .then(r => r.json())
      .then(data => { setOrders(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar auth={auth} onLogout={onLogout} />
      <div style={{ background: '#f8fffe', minHeight: '100vh', padding: '30px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{ fontWeight: '800', color: '#333', marginBottom: '24px' }}>📦 My Orders</h3>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border" style={{ color: '#0a6e4f' }}></div>
            </div>
          )}

          {!loading && orders.length === 0 && (
            <div style={{ background: 'white', borderRadius: '16px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '60px', marginBottom: '16px' }}>📦</div>
              <h5 style={{ color: '#888' }}>No orders yet</h5>
            </div>
          )}

          {orders.map(order => {
            const sc = STATUS_COLORS[order.status] || STATUS_COLORS.PENDING;
            return (
              <div key={order.id} style={{ background: 'white', borderRadius: '14px', padding: '22px', marginBottom: '16px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 style={{ fontWeight: '700', margin: 0 }}>Order #{order.id}</h6>
                    <small style={{ color: '#888' }}>
                      {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </small>
                  </div>
                  <span style={{ background: sc.bg, color: sc.color, padding: '5px 14px', borderRadius: '20px', fontWeight: '700', fontSize: '13px' }}>
                    {order.status}
                  </span>
                </div>

                {/* Items */}
                {order.items?.map(item => (
                  <div key={item.id} className="d-flex justify-content-between align-items-center py-2" style={{ borderTop: '1px solid #f0f0f0' }}>
                    <div>
                      <span style={{ fontWeight: '600', fontSize: '14px' }}>{item.medicine?.name}</span>
                      <span style={{ color: '#888', fontSize: '13px' }}> × {item.quantity}</span>
                    </div>
                    <span style={{ fontWeight: '600', color: '#0a6e4f' }}>₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}

                {/* Footer */}
                <div className="d-flex justify-content-between align-items-center mt-3 pt-2" style={{ borderTop: '2px solid #f0f0f0' }}>
                  <div style={{ fontSize: '13px', color: '#666' }}>
                    📍 {order.deliveryAddress}
                  </div>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: '#0a6e4f' }}>
                    Total: ₹{order.totalAmount?.toFixed(2)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MyOrders;
