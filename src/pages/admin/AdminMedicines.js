import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch, API } from '../../api';

function AdminMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    apiFetch('/api/medicines').then(r => r.json()).then(d => { setMedicines(d); setLoading(false); });
  };

  useEffect(() => { fetch(); }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    await apiFetch(`/api/admin/medicines/${id}`, { method: 'DELETE' });
    fetch();
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ fontWeight: '800', margin: 0 }}>💊 Medicines</h4>
        <Link to="/admin/medicines/add" style={{ background: '#0a6e4f', color: 'white', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          + Add Medicine
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-5"><div className="spinner-border" style={{ color: '#0a6e4f' }}></div></div>
      ) : (
        <div style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
          <table className="table mb-0" style={{ fontSize: '14px' }}>
            <thead style={{ background: '#f8fffe' }}>
              <tr>
                <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>#</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>Image</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>Name</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>Brand</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>Category</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>Price</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>Stock</th>
                <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((m, i) => (
                <tr key={m.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                  <td style={{ padding: '12px 16px', color: '#888' }}>{i + 1}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {m.imageName
                      ? <img src={`${API}/medicineImages/${m.imageName}`} width="50" height="50" style={{ objectFit: 'contain', borderRadius: '6px', background: '#f8fffe' }} alt="" />
                      : <div style={{ width: '50px', height: '50px', background: '#f0faf5', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>💊</div>
                    }
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '600' }}>{m.name}</td>
                  <td style={{ padding: '12px 16px', color: '#666' }}>{m.brand}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ background: '#e8f5f0', color: '#0a6e4f', padding: '3px 10px', borderRadius: '10px', fontSize: '12px', fontWeight: '600' }}>
                      {m.category?.name}
                    </span>
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '700', color: '#0a6e4f' }}>₹{m.price}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ color: m.stock > 0 ? '#28a745' : '#dc3545', fontWeight: '600' }}>{m.stock}</span>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <Link to={`/admin/medicines/edit/${m.id}`} style={{ background: '#e3f2fd', color: '#1565c0', padding: '5px 12px', borderRadius: '6px', textDecoration: 'none', fontSize: '12px', fontWeight: '600' }}>
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(m.id, m.name)} style={{ background: '#fce4ec', color: '#c62828', border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {medicines.length === 0 && (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No medicines found. Add your first medicine!</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminMedicines;
