export const API = 'https://medi-backend-2.onrender.com';

export const saveAuth = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('userEmail', data.email);
  localStorage.setItem('userName', data.name || data.email);
  localStorage.setItem('userRole', data.role);
  localStorage.setItem('userId', data.id || '');
};

export const getToken = () => localStorage.getItem('token');
export const getRole = () => localStorage.getItem('userRole');
export const getUserName = () => localStorage.getItem('userName');
export const getUserEmail = () => localStorage.getItem('userEmail');
export const isLoggedIn = () => !!getToken();
export const isAdmin = () => getRole() === 'ADMIN';

export const logout = () => {
  ['token','userEmail','userName','userRole','userId'].forEach(k => localStorage.removeItem(k));
};

export const apiFetch = async (path, options = {}) => {
  const token = getToken();
  const headers = { ...(options.headers || {}) };
  if (!(options.body instanceof FormData)) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return fetch(`${API}${path}`, { ...options, headers });
};

// Cart helpers (localStorage cart)
export const getCart = () => JSON.parse(localStorage.getItem('cart') || '[]');
export const saveCart = (cart) => localStorage.setItem('cart', JSON.stringify(cart));
export const addToCart = (medicine, qty = 1) => {
  const cart = getCart();
  const existing = cart.find(i => i.id === medicine.id);
  if (existing) existing.quantity += qty;
  else cart.push({ ...medicine, quantity: qty });
  saveCart(cart);
};
export const removeFromCart = (id) => saveCart(getCart().filter(i => i.id !== id));
export const clearCart = () => localStorage.removeItem('cart');
export const cartCount = () => getCart().reduce((s, i) => s + i.quantity, 0);
