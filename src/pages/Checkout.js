import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCart, clearCart, apiFetch, getUserName } from '../api';

function Checkout({ auth, onLogout }) {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    const items = cart.map(i => ({ medicineId: i.id, quantity: i.quantity }));
    const res = await apiFetch('/api/orders/place', {
      method: 'POST',
      body: JSON.stringify({ deliveryAddress: address, phone, items }),
    });
    const data = await res.json();
    if (data.success) {
      clearCart();
      setSuccess(data);
    }
    setLoading(false);
  };

  if (success) return (
    <div style={{ minHeight: '100vh', background: '#f8fffe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '50px', textAlign: 'center', maxWidth: '450px', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
        <h3 style={{ fontWeight: '800', color: '#0a6e4f' }}>Order Placed!</h3>
        <p style={{ color: '#666' }}>Order #{success.orderId} confirmed</p>
        <p style={{ fontWeight: '700', fontSize: '20px', color: '#0a6e4f' }}>₹{success.total?.toFixed(2)}</p>
        <button onClick={() => navigate('/my-orders')} style={{ background: '#0a6e4f', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', marginTop: '16px' }}>
          View My Orders
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar auth={auth} onLogout={onLogout} />
      <div style={{ background: '#f8fffe', minHeight: '100vh', padding: '30px 20px' }}>
        <div className="row" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="col-md-7">
            <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <h4 style={{ fontWeight: '800', marginBottom: '24px' }}>Delivery Details</h4>
              <form onSubmit={handleOrder}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Full Name</label>
                  <input type="text" value={getUserName()} readOnly
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '2px solid #e0f5ee', background: '#f9f9f9', fontSize: '14px' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} placeholder="Enter phone number"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '2px solid #e0f5ee', outline: 'none', fontSize: '14px' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Delivery Address</label>
                  <textarea required rows="3" value={address} onChange={e => setAddress(e.target.value)} placeholder="Enter full delivery address"
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '2px solid #e0f5ee', outline: 'none', fontSize: '14px', resize: 'none' }} />
                </div>
                <button type="submit" disabled={loading} style={{ width: '100%', background: '#0a6e4f', color: 'white', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>
                  {loading ? 'Placing Order...' : `Place Order — ₹${total.toFixed(2)}`}
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-5">
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <h5 style={{ fontWeight: '700', marginBottom: '16px' }}>Order Summary</h5>
              {cart.map(i => (
                <div key={i.id} className="d-flex justify-content-between mb-2" style={{ fontSize: '14px' }}>
                  <span>{i.name} × {i.quantity}</span>
                  <span style={{ fontWeight: '600' }}>₹{(i.price * i.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong style={{ color: '#0a6e4f', fontSize: '18px' }}>₹{total.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
