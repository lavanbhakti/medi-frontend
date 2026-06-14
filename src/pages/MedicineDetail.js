import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { apiFetch, addToCart, API } from '../api';

function MedicineDetail({ auth, onLogout, onCartAdd, cartUpdated }) {
  const { id } = useParams();
  const [medicine, setMedicine] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    apiFetch(`/api/medicines/${id}`).then(r => r.json()).then(setMedicine);
  }, [id]);

  const handleAdd = () => {
    addToCart(medicine, 1);
    if (onCartAdd) onCartAdd();
    alert(`✅ ${medicine.name} added to cart!`);
  };

  if (!medicine) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="spinner-border" style={{ color: '#0a6e4f' }}></div>
    </div>
  );

  return (
    <>
      <Navbar auth={auth} onLogout={onLogout} cartUpdated={cartUpdated} />
      <div style={{ background: '#f8fffe', minHeight: '100vh', padding: '40px 20px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <div className="row no-gutters">
            {/* Image */}
            <div className="col-md-4" style={{ background: '#f0faf5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px', minHeight: '300px' }}>
              {medicine.imageName
                ? <img src={`${API}/medicineImages/${medicine.imageName}`} alt={medicine.name} style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }} />
                : <div style={{ fontSize: '80px' }}>💊</div>
              }
            </div>

            {/* Info */}
            <div className="col-md-8" style={{ padding: '36px' }}>
              <span style={{ background: '#e8f5f0', color: '#0a6e4f', fontSize: '12px', padding: '3px 10px', borderRadius: '10px', fontWeight: '600' }}>
                {medicine.category?.name}
              </span>
              <h2 style={{ fontWeight: '800', marginTop: '12px', marginBottom: '4px' }}>{medicine.name}</h2>
              <p style={{ color: '#888', marginBottom: '16px' }}>{medicine.brand} · {medicine.dosage}</p>

              <div className="d-flex align-items-center mb-4" style={{ gap: '24px' }}>
                <span style={{ fontSize: '32px', fontWeight: '800', color: '#0a6e4f' }}>₹{medicine.price}</span>
                <span style={{
                  background: medicine.stock > 0 ? '#d4edda' : '#f8d7da',
                  color: medicine.stock > 0 ? '#155724' : '#721c24',
                  padding: '5px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600'
                }}>
                  {medicine.stock > 0 ? `✓ In Stock (${medicine.stock} units)` : '✗ Out of Stock'}
                </span>
              </div>

              <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '24px' }}>{medicine.description}</p>

              {/* Tags */}
              {medicine.tags && (
                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '13px', color: '#888', marginBottom: '8px' }}>Good for:</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {medicine.tags.split(',').map(tag => (
                      <span key={tag} style={{ background: '#f0faf5', color: '#0a6e4f', padding: '4px 12px', borderRadius: '14px', fontSize: '12px', fontWeight: '600' }}>
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={handleAdd} disabled={medicine.stock === 0} style={{
                  background: medicine.stock > 0 ? '#0a6e4f' : '#ccc',
                  color: 'white', border: 'none', padding: '13px 28px',
                  borderRadius: '10px', fontWeight: '700', cursor: medicine.stock > 0 ? 'pointer' : 'not-allowed', fontSize: '15px'
                }}>
                  🛒 Add to Cart
                </button>
                <button onClick={() => navigate(-1)} style={{ background: 'white', color: '#0a6e4f', border: '2px solid #0a6e4f', padding: '13px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
                  ← Back
                </button>
              </div>

              <p style={{ color: '#e67e22', fontSize: '12px', marginTop: '16px' }}>
                ⚠️ Always consult a doctor before taking this medicine.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MedicineDetail;
