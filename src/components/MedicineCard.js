import React from 'react';
import { Link } from 'react-router-dom';
import { addToCart, API } from '../api';

function MedicineCard({ medicine, onCartAdd }) {
  const handleAdd = () => {
    addToCart(medicine, 1);
    if (onCartAdd) onCartAdd();
    alert(`✅ ${medicine.name} added to cart!`);
  };

  return (
    <div style={{
      background: 'white', borderRadius: '12px', overflow: 'hidden',
      boxShadow: '0 2px 12px rgba(0,0,0,0.08)', transition: 'transform 0.2s',
      border: '1px solid #f0f0f0'
    }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {/* Image */}
      <div style={{ background: '#f8fffe', padding: '20px', textAlign: 'center', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {medicine.imageName ? (
          <img src={`${API}/medicineImages/${medicine.imageName}`} alt={medicine.name}
            style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain' }} />
        ) : (
          <div style={{ fontSize: '48px' }}>💊</div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: '14px' }}>
        <span style={{
          background: '#e8f5f0', color: '#0a6e4f', fontSize: '11px',
          padding: '2px 8px', borderRadius: '10px', fontWeight: '600'
        }}>
          {medicine.category?.name || 'General'}
        </span>
        <h6 style={{ margin: '8px 0 2px', fontWeight: '700', fontSize: '15px' }}>{medicine.name}</h6>
        <p style={{ color: '#888', fontSize: '12px', margin: '0 0 4px' }}>{medicine.brand} · {medicine.dosage}</p>
        <p style={{ color: '#666', fontSize: '12px', margin: '0 0 10px', 
          overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {medicine.description}
        </p>

        <div className="d-flex justify-content-between align-items-center">
          <span style={{ fontWeight: '700', fontSize: '18px', color: '#0a6e4f' }}>₹{medicine.price}</span>
          {medicine.stock > 0 ? (
            <span style={{ color: '#28a745', fontSize: '12px' }}>✓ In Stock</span>
          ) : (
            <span style={{ color: '#dc3545', fontSize: '12px' }}>Out of Stock</span>
          )}
        </div>

        <div className="d-flex mt-2" style={{ gap: '8px' }}>
          <Link to={`/medicine/${medicine.id}`} style={{
            flex: 1, textAlign: 'center', padding: '6px',
            border: '1px solid #0a6e4f', color: '#0a6e4f',
            borderRadius: '6px', textDecoration: 'none', fontSize: '13px'
          }}>Details</Link>
          <button onClick={handleAdd} disabled={medicine.stock === 0} style={{
            flex: 1, background: medicine.stock > 0 ? '#0a6e4f' : '#ccc',
            color: 'white', border: 'none', borderRadius: '6px',
            padding: '6px', cursor: medicine.stock > 0 ? 'pointer' : 'not-allowed', fontSize: '13px'
          }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicineCard;
