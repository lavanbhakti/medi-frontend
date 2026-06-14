import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCart, removeFromCart, saveCart, API, isLoggedIn } from '../api';

function Cart({ auth, onLogout, onCartChange }) {
  const [cart, setCart] = useState(getCart());
  const navigate = useNavigate();

  const updateQty = (id, qty) => {
    if (qty < 1) return;
    const updated = cart.map(i => i.id === id ? { ...i, quantity: qty } : i);
    saveCart(updated); setCart(updated); onCartChange();
  };

  const remove = (id) => {
    removeFromCart(id);
    setCart(getCart());
    onCartChange();
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleCheckout = () => {
    if (!isLoggedIn()) { navigate('/login'); return; }
    navigate('/checkout');
  };

  return (
    <>
      <Navbar auth={auth} onLogout={onLogout} />
      <div style={{ background: '#f8fffe', minHeight: '100vh', padding: '30px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h3 style={{ fontWeight: '800', color: '#333', marginBottom: '24px' }}>🛒 Your Cart</h3>

          {cart.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '16px', padding: '60px', textAlign: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
              <div style={{ fontSize: '60px', marginBottom: '16px' }}>🛒</div>
              <h5 style={{ color: '#888' }}>Your cart is empty</h5>
              <Link to="/shop" style={{ color: '#0a6e4f', fontWeight: '600' }}>Browse Medicines →</Link>
            </div>
          ) : (
            <div className="row">
              <div className="col-md-8">
                {cart.map(item => (
                  <div key={item.id} style={{ background: 'white', borderRadius: '12px', padding: '16px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ background: '#f8fffe', borderRadius: '8px', padding: '10px', width: '70px', height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.imageName ? <img src={`${API}/medicineImages/${item.imageName}`} style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'contain' }} alt="" /> : <span style={{ fontSize: '28px' }}>💊</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h6 style={{ margin: '0 0 4px', fontWeight: '700' }}>{item.name}</h6>
                      <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>{item.brand} · {item.dosage}</p>
                      <p style={{ margin: 0, color: '#0a6e4f', fontWeight: '700' }}>₹{item.price}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button onClick={() => updateQty(item.id, item.quantity - 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: '700' }}>-</button>
                      <span style={{ fontWeight: '700', minWidth: '24px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item.quantity + 1)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid #ddd', background: 'white', cursor: 'pointer', fontWeight: '700' }}>+</button>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: '80px' }}>
                      <p style={{ margin: '0 0 8px', fontWeight: '700' }}>₹{(item.price * item.quantity).toFixed(2)}</p>
                      <button onClick={() => remove(item.id)} style={{ background: '#ffe0e0', color: '#c00', border: 'none', borderRadius: '6px', padding: '4px 10px', cursor: 'pointer', fontSize: '12px' }}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="col-md-4">
                <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                  <h5 style={{ fontWeight: '700', marginBottom: '16px' }}>Order Summary</h5>
                  <div className="d-flex justify-content-between mb-2"><span>Items ({cart.length})</span><span>₹{total.toFixed(2)}</span></div>
                  <div className="d-flex justify-content-between mb-2"><span>Delivery</span><span style={{ color: '#0a6e4f' }}>FREE</span></div>
                  <hr />
                  <div className="d-flex justify-content-between mb-3"><strong>Total</strong><strong style={{ color: '#0a6e4f', fontSize: '18px' }}>₹{total.toFixed(2)}</strong></div>
                  <button onClick={handleCheckout} style={{ width: '100%', background: '#0a6e4f', color: 'white', border: 'none', padding: '13px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>
                    Proceed to Checkout →
                  </button>
                  {!isLoggedIn() && <p style={{ fontSize: '12px', color: '#888', textAlign: 'center', marginTop: '10px' }}>You'll need to login first</p>}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Cart;
