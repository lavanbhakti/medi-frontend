import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import MedicineCard from '../components/MedicineCard';
import { apiFetch } from '../api';

function AIAssistant({ auth, onLogout, onCartAdd, cartUpdated }) {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const quickSymptoms = [
    'fever',
    'Cold','Allergy','Diabetes',
    'Body pain','Fever & Cold',
    ,'Leg Pain',
'Back Pain','Knee Pain','Headache','Nasal Care',
'Allergy','Acidity & Gastric','Diabetes','Blood Pressure','Vitamins'
  ];

  const handleAsk = async (text) => {
    const query = text || symptoms;
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);

    // Add user message to chat
    const userMsg = { role: 'user', text: query };
    setChatHistory(prev => [...prev, userMsg]);

    try {
      const res = await apiFetch('/api/ai/suggest', {
        method: 'POST',
        body: JSON.stringify({ symptoms: query }),
      });
      const data = await res.json();
      setResult(data);

      // Add AI response to chat
      setChatHistory(prev => [...prev, { role: 'ai', text: data.message, medicines: data.medicines }]);
    } catch {
      setChatHistory(prev => [...prev, { role: 'ai', text: 'Sorry, I could not connect to the AI service. Please try again.' }]);
    } finally {
      setLoading(false);
      setSymptoms('');
    }
  };

  return (
    <>
      <Navbar auth={auth} onLogout={onLogout} cartUpdated={cartUpdated} />

      <div style={{ background: '#f8fffe', minHeight: '100vh' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #0a6e4f, #14a97a)',
          padding: '32px 40px', color: 'white', textAlign: 'center'
        }}>
          <h2 style={{ fontWeight: '800', marginBottom: '8px' }}>🤖 AI Medicine Assistant</h2>
          <p style={{ opacity: 0.9, margin: 0 }}>
            Powered by Google Gemini AI — Describe your symptoms and get medicine suggestions
          </p>
        </div>

        {/* Disclaimer */}
        <div style={{ background: '#fff3cd', padding: '10px 24px', textAlign: 'center', borderBottom: '1px solid #ffc107' }}>
          <small style={{ color: '#856404' }}>
            ⚠️ For informational purposes only. Always consult a doctor before taking medicine.
          </small>
        </div>

        <div className="container-fluid" style={{ maxWidth: '1000px', padding: '30px 20px' }}>
          {/* Chat History */}
          {chatHistory.length > 0 && (
            <div style={{
              background: 'white', borderRadius: '16px', padding: '24px',
              marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              {chatHistory.map((msg, idx) => (
                <div key={idx} style={{ marginBottom: '20px' }}>
                  {msg.role === 'user' ? (
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={{
                        background: '#0a6e4f', color: 'white', padding: '12px 18px',
                        borderRadius: '18px 18px 4px 18px', maxWidth: '70%', fontSize: '14px'
                      }}>
                        👤 {msg.text}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{
                        background: '#f0faf5', border: '1px solid #c3e6d8',
                        padding: '14px 18px', borderRadius: '18px 18px 18px 4px',
                        maxWidth: '85%', fontSize: '14px', lineHeight: '1.6', color: '#333'
                      }}>
                        <strong>🤖 MediAI:</strong><br />
                        {msg.text}
                      </div>

                      {/* Show medicine cards if present */}
                      {msg.medicines && msg.medicines.length > 0 && (
                        <div style={{ marginTop: '16px' }}>
                          <p style={{ fontSize: '13px', color: '#0a6e4f', fontWeight: '600', marginBottom: '12px' }}>
                            📦 Matching medicines found in our store:
                          </p>
                          <div className="row">
                            {msg.medicines.map(med => (
                              <div key={med.id} className="col-md-4 col-sm-6 mb-3">
                                <MedicineCard medicine={med} onCartAdd={onCartAdd} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {msg.medicines && msg.medicines.length === 0 && (
                        <div style={{
                          marginTop: '12px', background: '#fff3cd',
                          padding: '12px 16px', borderRadius: '8px', fontSize: '13px', color: '#856404'
                        }}>
                          No matching medicines found in our store right now. Please visit a pharmacy or consult your doctor.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#0a6e4f' }}>
                  <div className="spinner-border spinner-border-sm" role="status"></div>
                  <span style={{ fontSize: '14px' }}>AI is thinking...</span>
                </div>
              )}
            </div>
          )}

          {/* Quick Symptoms */}
          {chatHistory.length === 0 && (
            <div style={{
              background: 'white', borderRadius: '16px', padding: '28px',
              marginBottom: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
            }}>
              <h5 style={{ fontWeight: '700', color: '#333', marginBottom: '8px' }}>
                👋 How can I help you today?
              </h5>
              <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
                Tell me your symptoms and I'll suggest the right medicines for you.
              </p>
              <p style={{ fontWeight: '600', color: '#0a6e4f', fontSize: '13px', marginBottom: '12px' }}>
                Quick select your symptom:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {quickSymptoms.map(s => (
                  <button key={s} onClick={() => handleAsk(s)} style={{
                    background: '#f0faf5', border: '1px solid #c3e6d8',
                    color: '#0a6e4f', padding: '8px 16px', borderRadius: '20px',
                    cursor: 'pointer', fontSize: '13px', fontWeight: '500'
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Box */}
          <div style={{
            background: 'white', borderRadius: '16px', padding: '20px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                value={symptoms}
                onChange={e => setSymptoms(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAsk()}
                placeholder="Describe your symptoms... (e.g. I have headache and fever since 2 days)"
                style={{
                  flex: 1, padding: '12px 16px', borderRadius: '10px',
                  border: '2px solid #e0f5ee', outline: 'none', fontSize: '14px'
                }}
                onFocus={e => e.target.style.borderColor = '#0a6e4f'}
                onBlur={e => e.target.style.borderColor = '#e0f5ee'}
              />
              <button
                onClick={() => handleAsk()}
                disabled={loading || !symptoms.trim()}
                style={{
                  background: symptoms.trim() ? '#0a6e4f' : '#ccc',
                  color: 'white', border: 'none', borderRadius: '10px',
                  padding: '12px 24px', cursor: symptoms.trim() ? 'pointer' : 'not-allowed',
                  fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap'
                }}
              >
                {loading ? '...' : '🤖 Ask AI'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AIAssistant;
