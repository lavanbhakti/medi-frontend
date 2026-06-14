import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isLoggedIn, logout as doLogout } from './api';

import Home from './pages/Home';
import Shop from './pages/Shop';
import MedicineDetail from './pages/MedicineDetail';
import AIAssistant from './pages/AIAssistant';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import MyOrders from './pages/MyOrders';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMedicines from './pages/admin/AdminMedicines';
import AdminMedicineForm from './pages/admin/AdminMedicineForm';
import AdminCategories from './pages/admin/AdminCategories';
import AdminOrders from './pages/admin/AdminOrders';

import WelcomePopup from './components/WelcomePopup';
import Toast from './components/Toast';

function App() {
  const [auth, setAuth] = useState(() =>
    isLoggedIn() ? { role: localStorage.getItem('userRole') } : null
  );
  const [cartUpdated, setCartUpdated] = useState(0);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  const handleLogin = (data) => {
    setAuth({ role: data.role });
    showToast(
      data.role === 'ADMIN'
        ? `Welcome Admin! 👋`
        : `Login successful! Welcome back 👋`,
      'success'
    );
  };

  const handleLogout = () => {
    doLogout();
    setAuth(null);
    showToast('Logged out successfully', 'info');
  };

  const refreshCart = () => setCartUpdated(c => c + 1);

  const ProtectedUser = ({ children }) =>
    auth ? children : <Navigate to="/login" />;

  // ✅ FIX 1: ProtectedAdmin — if not admin, just go to home (no /admin/login route!)
  const ProtectedAdmin = ({ children }) =>
    auth?.role === 'ADMIN' ? children : <Navigate to="/" />;

  return (
    <Router>
      <WelcomePopup />

      {toast && (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home auth={auth} onLogout={handleLogout} onLogin={handleLogin} cartUpdated={cartUpdated} />} />
        <Route path="/shop" element={<Shop auth={auth} onLogout={handleLogout} onLogin={handleLogin} onCartAdd={refreshCart} cartUpdated={cartUpdated} />} />
        <Route path="/medicine/:id" element={<MedicineDetail auth={auth} onLogout={handleLogout} onLogin={handleLogin} onCartAdd={refreshCart} cartUpdated={cartUpdated} />} />
        <Route path="/ai-assistant" element={<AIAssistant auth={auth} onLogout={handleLogout} onLogin={handleLogin} onCartAdd={refreshCart} cartUpdated={cartUpdated} />} />
        <Route path="/cart" element={<Cart auth={auth} onLogout={handleLogout} onLogin={handleLogin} onCartChange={refreshCart} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Protected User */}
        <Route path="/checkout" element={<ProtectedUser><Checkout auth={auth} onLogout={handleLogout} /></ProtectedUser>} />
        <Route path="/my-orders" element={<ProtectedUser><MyOrders auth={auth} onLogout={handleLogout} /></ProtectedUser>} />

        {/* ✅ FIX 2: Admin routes — secret URL, NO /admin/login route at all */}
        <Route path="/admin" element={<ProtectedAdmin><AdminLayout onLogout={handleLogout}><AdminDashboard /></AdminLayout></ProtectedAdmin>} />
        <Route path="/admin/medicines" element={<ProtectedAdmin><AdminLayout onLogout={handleLogout}><AdminMedicines /></AdminLayout></ProtectedAdmin>} />
        <Route path="/admin/medicines/add" element={<ProtectedAdmin><AdminLayout onLogout={handleLogout}><AdminMedicineForm /></AdminLayout></ProtectedAdmin>} />
        <Route path="/admin/medicines/edit/:id" element={<ProtectedAdmin><AdminLayout onLogout={handleLogout}><AdminMedicineForm /></AdminLayout></ProtectedAdmin>} />
        <Route path="/admin/categories" element={<ProtectedAdmin><AdminLayout onLogout={handleLogout}><AdminCategories /></AdminLayout></ProtectedAdmin>} />
        <Route path="/admin/orders" element={<ProtectedAdmin><AdminLayout onLogout={handleLogout}><AdminOrders /></AdminLayout></ProtectedAdmin>} />
      </Routes>
    </Router>
  );
}

export default App;