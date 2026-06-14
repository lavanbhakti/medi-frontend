import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch, API } from '../../api';

function AdminMedicineForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', brand: '', price: '', dosage: '', description: '', stock: '', tags: '', categoryId: '', imgName: '' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch('/api/categories').then(r => r.json()).then(setCategories);
    if (id) {
      apiFetch(`/api/medicines/${id}`).then(r => r.json()).then(m => {
        setForm({ name: m.name, brand: m.brand || '', price: m.price, dosage: m.dosage || '', description: m.description || '', stock: m.stock, tags: m.tags || '', categoryId: m.category?.id || '', imgName: m.imageName || '' });
        if (m.imageName) setPreview(`${API}/medicineImages/${m.imageName}`);
      });
    }
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = e => {
    const file = e.target.files[0];
    if (file) { setImageFile(file); setPreview(URL.createObjectURL(file)); }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    const data = new FormData();
    if (id) data.append('id', id);
    Object.entries(form).forEach(([k, v]) => data.append(k, v));
    if (imageFile) data.append('productImage', imageFile);
    await apiFetch('/api/admin/medicines', { method: 'POST', body: data });
    navigate('/admin/medicines');
  };

  const inputStyle = { width: '100%', padding: '11px 14px', borderRadius: '10px', border: '2px solid #e0f5ee', outline: 'none', fontSize: '14px' };
  const labelStyle = { fontSize: '13px', fontWeight: '600', color: '#555', display: 'block', marginBottom: '6px' };

  return (
    <div style={{ maxWidth: '800px' }}>
      <h4 style={{ fontWeight: '800', marginBottom: '24px' }}>{id ? 'Edit Medicine' : 'Add New Medicine'}</h4>
      <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 2px 10px rgba(0,0,0,0.06)' }}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label style={labelStyle}>Medicine Name *</label>
              <input name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Paracetamol" style={inputStyle} />
            </div>
            <div className="col-md-6 mb-3">
              <label style={labelStyle}>Brand *</label>
              <input name="brand" required value={form.brand} onChange={handleChange} placeholder="e.g. Cipla, Sun Pharma" style={inputStyle} />
            </div>
            <div className="col-md-4 mb-3">
              <label style={labelStyle}>Price (₹) *</label>
              <input name="price" type="number" required value={form.price} onChange={handleChange} placeholder="0.00" style={inputStyle} />
            </div>
            <div className="col-md-4 mb-3">
              <label style={labelStyle}>Dosage *</label>
              <input name="dosage" required value={form.dosage} onChange={handleChange} placeholder="e.g. 500mg, 10ml" style={inputStyle} />
            </div>
            <div className="col-md-4 mb-3">
              <label style={labelStyle}>Stock *</label>
              <input name="stock" type="number" required value={form.stock} onChange={handleChange} placeholder="Available units" style={inputStyle} />
            </div>
            <div className="col-md-6 mb-3">
              <label style={labelStyle}>Category *</label>
              <select name="categoryId" required value={form.categoryId} onChange={handleChange} style={inputStyle}>
                <option value="">-- Select Category --</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="col-md-6 mb-3">
              <label style={labelStyle}>Tags (for AI matching) *</label>
              <input name="tags" required value={form.tags} onChange={handleChange} placeholder="fever,headache,pain,cold" style={inputStyle} />
              <small style={{ color: '#888', fontSize: '11px' }}>Comma separated — AI uses these to match symptoms</small>
            </div>
            <div className="col-12 mb-3">
              <label style={labelStyle}>Description</label>
              <textarea name="description" rows="3" value={form.description} onChange={handleChange} placeholder="Medicine description and usage..." style={{ ...inputStyle, resize: 'none' }} />
            </div>
            <div className="col-12 mb-4">
              <label style={labelStyle}>Medicine Image</label>
              <input type="file" accept="image/*" onChange={handleFile} style={{ fontSize: '14px' }} />
              {preview && <img src={preview} alt="preview" style={{ marginTop: '10px', width: '80px', height: '80px', objectFit: 'contain', borderRadius: '8px', border: '2px solid #e0f5ee' }} />}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={saving} style={{ background: '#0a6e4f', color: 'white', border: 'none', padding: '12px 28px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '15px' }}>
              {saving ? 'Saving...' : id ? 'Update Medicine' : 'Add Medicine'}
            </button>
            <button type="button" onClick={() => navigate('/admin/medicines')} style={{ background: '#f0f0f0', color: '#333', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminMedicineForm;
