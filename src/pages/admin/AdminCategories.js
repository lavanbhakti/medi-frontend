import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../api';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchCats = () => apiFetch('/api/categories').then(r => r.json()).then(setCategories);
  useEffect(() => { fetchCats(); }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    if (editId) {
      await apiFetch(`/api/admin/categories/${editId}`, { method: 'PUT', body: JSON.stringify({ name }) });
    } else {
      await apiFetch('/api/admin/categories', { method: 'POST', body: JSON.stringify({ name }) });
    }
    setName(''); setEditId(null); setSaving(false);
    fetchCats();
  };

  const handleEdit = cat => { setEditId(cat.id); setName(cat.name); };
  const handleCancel = () => { setEditId(null); setName(''); };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete category "${name}"?`)) return;
    await apiFetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
    fetchCats();
  };

  return (
    <div>
      <h4 style={{ fontWeight: '800', marginBottom: '24px' }}>📂 Categories</h4>
      <div className="row">
        {/* Form */}
        <div className="col-md-4">
          <div style={{ background: 'white', borderRadius: '14px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <h6 style={{ fontWeight: '700', marginBottom: '16px' }}>{editId ? 'Edit Category' : 'Add New Category'}</h6>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' }}>Category Name *</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  placeholder="e.g. Fever, Pain Relief, Vitamins"
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '2px solid #e0f5ee', outline: 'none', fontSize: '14px' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" disabled={saving} style={{ flex: 1, background: '#0a6e4f', color: 'white', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                  {saving ? '...' : editId ? 'Update' : 'Add'}
                </button>
                {editId && (
                  <button type="button" onClick={handleCancel} style={{ flex: 1, background: '#f0f0f0', color: '#333', border: 'none', padding: '11px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Table */}
        <div className="col-md-8">
          <div style={{ background: 'white', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
            <table className="table mb-0" style={{ fontSize: '14px' }}>
              <thead style={{ background: '#f8fffe' }}>
                <tr>
                  <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>#</th>
                  <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>Category Name</th>
                  <th style={{ padding: '14px 16px', fontWeight: '700', color: '#555' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c, i) => (
                  <tr key={c.id} style={{ borderTop: '1px solid #f0f0f0' }}>
                    <td style={{ padding: '12px 16px', color: '#888' }}>{i + 1}</td>
                    <td style={{ padding: '12px 16px', fontWeight: '600' }}>{c.name}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => handleEdit(c)} style={{ background: '#e3f2fd', color: '#1565c0', border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Edit</button>
                        <button onClick={() => handleDelete(c.id, c.name)} style={{ background: '#fce4ec', color: '#c62828', border: 'none', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: '600' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {categories.length === 0 && (
                  <tr><td colSpan="3" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No categories yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminCategories;
