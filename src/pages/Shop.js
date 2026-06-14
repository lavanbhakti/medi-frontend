import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import MedicineCard from '../components/MedicineCard';
import { apiFetch } from '../api';

function Shop({ auth, onLogout, onCartAdd, cartUpdated }) {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/categories').then(r => r.json()).then(setCategories);
    apiFetch('/api/medicines').then(r => r.json()).then(d => { setMedicines(d); setLoading(false); });
  }, []);

  const filterByCategory = (catId) => {
    setSelectedCat(catId);
    setLoading(true);
    const url = catId ? `/api/medicines/category/${catId}` : '/api/medicines';
    apiFetch(url).then(r => r.json()).then(d => { setMedicines(d); setLoading(false); });
  };

  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    (m.brand || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar auth={auth} onLogout={onLogout} cartUpdated={cartUpdated} />
      <div style={{ background: '#f8fffe', minHeight: '100vh' }}>

        {/* Search bar */}
        <div style={{ background: 'white', padding: '20px 40px', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
            <input
              type="text"
              placeholder="🔍 Search medicines by name or brand..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: '100%', padding: '12px 20px', borderRadius: '30px',
                border: '2px solid #e0f5ee', outline: 'none', fontSize: '14px'
              }}
            />
          </div>
        </div>

        <div className="container-fluid" style={{ maxWidth: '1200px', padding: '30px 20px' }}>
          <div className="row">
            {/* Sidebar */}
            <div className="col-md-3 mb-4">
              <div style={{ background: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
                <h6 style={{ fontWeight: '700', color: '#0a6e4f', marginBottom: '16px' }}>
                  📂 Categories
                </h6>
                <div
                  onClick={() => filterByCategory(null)}
                  style={{
                    padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', marginBottom: '6px',
                    background: !selectedCat ? '#0a6e4f' : '#f8fffe',
                    color: !selectedCat ? 'white' : '#333', fontSize: '14px', fontWeight: '500'
                  }}
                >
                  All Medicines
                </div>
                {categories.map(c => (
                  <div key={c.id}
                    onClick={() => filterByCategory(c.id)}
                    style={{
                      padding: '10px 14px', borderRadius: '8px', cursor: 'pointer', marginBottom: '6px',
                      background: selectedCat === c.id ? '#0a6e4f' : '#f8fffe',
                      color: selectedCat === c.id ? 'white' : '#333', fontSize: '14px'
                    }}
                  >
                    {c.name}
                  </div>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            <div className="col-md-9">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 style={{ fontWeight: '700', color: '#333', margin: 0 }}>
                  {filtered.length} Medicines Found
                </h5>
              </div>
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border" style={{ color: '#0a6e4f' }}></div>
                </div>
              ) : (
                <div className="row">
                  {filtered.map(m => (
                    <div key={m.id} className="col-lg-4 col-md-6 mb-4">
                      <MedicineCard medicine={m} onCartAdd={onCartAdd} />
                    </div>
                  ))}
                  {filtered.length === 0 && (
                    <div className="col-12 text-center py-5">
                      <div style={{ fontSize: '48px' }}>💊</div>
                      <p style={{ color: '#888', marginTop: '12px' }}>No medicines found</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
