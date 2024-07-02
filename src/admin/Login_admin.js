import React, { useState } from 'react';
import AuthAdmin from '../services/AuthAdmin';
import { useNavigate } from 'react-router-dom';
import '../styles/components/LoginAdmin.css';

const Login_admin = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    AuthAdmin.login(email, password).then(
      () => {
        onLogin(true); // <- Asegúrate de pasar true para identificar al administrador
        navigate('/admin-dashboard');
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <div className="login-admin-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2>Admin Login</h2>
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button className="btn-login">Login</button>
        </div>
        {message && (
          <div className="error-message">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login_admin;
