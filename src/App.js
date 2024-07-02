import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import MisProductos from './pages/MisProductos';
import Login from './pages/Login';
import Register from './pages/Register';
import SolicitarIntercambio from './pages/SolicitarIntercambio';
import SolicitudesRecibidas from './pages/SolicitudesRecibidas';
import EstadoSolicitudes from './pages/EstadoSolicitudes';
import NotificationComponent from './components/NotificationComponent';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import AgregarProducto from './pages/AgregarProducto';
import DetallesProducto from './pages/DetallesProducto';
import EditarProducto from './pages/EditarProducto';
import Footer from './components/Footer';
import SearchResults from './pages/SearchResults';
import Categoria from './pages/Categoria';
import Perfil from './pages/Perfil';
import AdminDashboard from './admin/AdminDashboard'; // Importa AdminDashboard
import LoginAdmin from './admin/Login_admin'; // Importa LoginAdmin
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    if (token) {
      setIsAuthenticated(true);
    }
    if (adminStatus) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (isAdminUser = false) => {
    setIsAuthenticated(true);
    if (isAdminUser) {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  };

  const handleLinkClick = (event) => {
    if (window.location.pathname === event.target.pathname) {
      window.location.reload();
    }
  };

  // Hook para obtener la ubicación actual
  const location = useLocation();

  return (
    <div>
      {/* Renderiza el Navbar solo si no estás en /admin-dashboard */}
      {location.pathname !== '/admin-dashboard' && (
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} isAdmin={isAdmin} handleLinkClick={handleLinkClick} />
      )}
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mis-productos" element={<PrivateRoute isAuthenticated={isAuthenticated}><MisProductos /></PrivateRoute>} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/categoria/:id" element={<Categoria />} />
        <Route path="/solicitar-intercambio/:id" element={<SolicitarIntercambio />} />
        <Route path="/solicitudes-recibidas" element={<PrivateRoute isAuthenticated={isAuthenticated}><SolicitudesRecibidas /></PrivateRoute>} />
        <Route path="/estado-solicitudes" element={<PrivateRoute isAuthenticated={isAuthenticated}><EstadoSolicitudes /></PrivateRoute>} />
        <Route path='/notification-content' element={<PrivateRoute isAuthenticated={isAuthenticated}><NotificationComponent /></PrivateRoute>} />
        <Route path='/agregar-producto' element={<PrivateRoute isAuthenticated={isAuthenticated}><AgregarProducto /></PrivateRoute>} />
        <Route path="/producto/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><DetallesProducto /></PrivateRoute>} />
        <Route path="/editar-producto/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}><EditarProducto /></PrivateRoute>} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin-login" element={<LoginAdmin onLogin={handleLogin} />} />
        {isAdmin && (
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
