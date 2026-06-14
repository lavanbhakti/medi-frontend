import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Home({ auth, onLogout, onLogin, cartUpdated }) {
  const features = [
    { icon: '🤖', title: 'AI Symptom Checker', desc: 'Describe your symptoms and get instant medicine suggestions powered by Gemini AI' },
    { icon: '💊', title: 'Wide Medicine Range', desc: 'Browse thousands of medicines across all categories with detailed information' },
    { icon: '🚚', title: 'Fast Delivery', desc: 'Get medicines delivered to your doorstep quickly and safely' },
    { icon: '🔒', title: 'Secure & Safe', desc: 'JWT secured platform with verified medicines from trusted brands' },
  ];

  const categories = [
    { icon: '🌡️', name: 'Fever & Cold' },
    { icon: '💪', name: 'Pain Relief' },
    { icon: '🩺', name: 'Diabetes' },
    { icon: '❤️', name: 'Heart & BP' },
    { icon: '🧠', name: 'Vitamins' },
    { icon: '🦠', name: 'Antibiotics' },
  ];

  return (
    <>
<Navbar auth={auth} onLogout={onLogout} onLogin={onLogin} cartUpdated={cartUpdated} />
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0a6e4f 0%, #14a97a 50%, #1dd4a0 100%)',
        padding: '80px 40px', textAlign: 'center', color: 'white'
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '16px' }}>
          Your Health, Our Priority 💊
        </h1>
        <p style={{ fontSize: '20px', opacity: 0.9, marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
          Describe your symptoms to our AI assistant and get instant medicine recommendations
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/ai-assistant" style={{
            background: 'white', color: '#0a6e4f', padding: '14px 32px',
            borderRadius: '30px', textDecoration: 'none', fontWeight: '700', fontSize: '16px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}>
            🤖 Try AI Assistant
          </Link>
          <Link to="/shop" style={{
            background: 'transparent', color: 'white', padding: '14px 32px',
            borderRadius: '30px', textDecoration: 'none', fontWeight: '700', fontSize: '16px',
            border: '2px solid white'
          }}>
            Browse Medicines
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginTop: '60px', flexWrap: 'wrap' }}>
          {[['500+','Medicines'],['50+','Categories'],['10K+','Customers'],['24/7','AI Support']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontSize: '32px', fontWeight: '800' }}>{num}</div>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Banner */}
      <div style={{ background: '#fff8e1', padding: '24px 40px', textAlign: 'center', borderBottom: '1px solid #ffe082' }}>
        <p style={{ margin: 0, fontSize: '16px', color: '#f57c00' }}>
          <strong>⚠️ Disclaimer:</strong> This platform is for informational purposes only.
          Always consult a qualified doctor before taking any medicine.
        </p>
      </div>

      {/* Features */}
      <div style={{ padding: '60px 40px', background: '#f8fffe' }}>
        <h2 style={{ textAlign: 'center', fontWeight: '700', marginBottom: '40px', color: '#0a6e4f' }}>
          Why MediAI?
        </h2>
        <div className="row" style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {features.map(f => (
            <div key={f.title} className="col-md-3 col-sm-6 mb-4">
              <div style={{
                background: 'white', borderRadius: '12px', padding: '28px 20px',
                textAlign: 'center', height: '100%', boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
              }}>
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{f.icon}</div>
                <h6 style={{ fontWeight: '700', color: '#0a6e4f' }}>{f.title}</h6>
                <p style={{ color: '#888', fontSize: '13px', margin: 0 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{ padding: '40px', background: 'white' }}>
        <h2 style={{ textAlign: 'center', fontWeight: '700', marginBottom: '32px', color: '#333' }}>
          Browse by Category
        </h2>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map(c => (
            <Link key={c.name} to="/shop" style={{
              background: '#f8fffe', border: '2px solid #e0f5ee',
              borderRadius: '12px', padding: '20px 24px', textAlign: 'center',
              textDecoration: 'none', color: '#333', minWidth: '130px',
              transition: 'all 0.2s'
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0a6e4f'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f8fffe'; e.currentTarget.style.color = '#333'; }}
            >
              <div style={{ fontSize: '28px', marginBottom: '8px' }}>{c.icon}</div>
              <div style={{ fontSize: '13px', fontWeight: '600' }}>{c.name}</div>
            </Link>
          ))}
        </div>
      </div>

    {/* Footer */}
<footer
  style={{
    background: "#138c65",
    color: "white",
    padding: "40px 20px",
    marginTop: "40px",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      maxWidth: "1200px",
      margin: "0 auto",
      gap: "30px",
    }}
  >
    {/* About */}
    <div>
      <h3>MediAI</h3>
      <p style={{ maxWidth: "300px", lineHeight: "1.6" }}>
        AI-powered medicine management platform helping users find
        medicines, health information, and personalized recommendations.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3>Quick Links</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><a href="/" style={{ color: "white", textDecoration: "none" }}>Home</a></li>
        <li><a href="/medicines" style={{ color: "white", textDecoration: "none" }}>Medicines</a></li>
        <li><a href="/health" style={{ color: "white", textDecoration: "none" }}>Health Tips</a></li>
        <li><a href="/contact" style={{ color: "white", textDecoration: "none" }}>Contact</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3>Contact Us</h3>
      <p>Email: support@mediai.com</p>
      <p>Phone: +91 98765 43210</p>
      <p>Hyderabad, India</p>
    </div>

    {/* Social Media */}
    <div>
      <h3>Follow Us</h3>
      <div style={{ display: "flex", gap: "15px" }}>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>
          Facebook
        </a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>
          Instagram
        </a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>
          LinkedIn
        </a>
        <a href="#" style={{ color: "white", textDecoration: "none" }}>
          Twitter
        </a>
      </div>
    </div>
  </div>

  {/* Bottom Copyright */}
  <hr
    style={{
      margin: "25px 0",
      border: "0.5px solid rgba(255,255,255,0.2)",
    }}
  />

  <div style={{ textAlign: "center" }}>
    <p style={{ margin: 0 }}>
      © 2026 MediAI. All Rights Reserved.
    </p>
    <p style={{ marginTop: "8px", fontSize: "14px", opacity: 0.8 }}>
      Built with React, Spring Boot, MySQL & Gemini AI
    </p>
  </div>
</footer>
    </>
  );
}

export default Home;
