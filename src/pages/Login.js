import React, { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/Login.css';
import logo from '../assets/logoSwap.png';

const Login = ({ onLogin }) => { // <- Se agrega onLogin aquí
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(email, password);
      onLogin(); // <- Se llama a la función onLogin después de un login exitoso
      navigate('/perfil'); // Redirige a la página de perfil después de un login exitoso
    } catch (err) {
      setError('Error al iniciar sesión: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="card-body text-center">
          <img src={logo} alt="Logo" className="mb-3 logo-image" />
          <h2 className="card-title mb-4">Acceso</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Contraseña:</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-custom w-100">Iniciar sesión</button>
            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </form>
          <button className="btn btn-link mt-3 w-100" onClick={() => navigate('/register')}>Ir a registrarme</button>
        </div>
      </div>
    </div>
  );
};

export default Login;