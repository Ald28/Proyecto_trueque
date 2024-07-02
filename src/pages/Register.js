import React, { useState, useEffect } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/Register.css';
import logo from '../assets/logoSwap.png';  // Asegúrate de que la ruta sea correcta

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [lastname, setLastname] = useState('');
  const [carrera, setCarrera] = useState('');
  const [carreras, setCarreras] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCarreras = async () => {
      try {
        const response = await AuthService.fetchCarreras();
        setCarreras(response.data);
      } catch (err) {
        setError('Error al obtener las carreras: ' + (err.response?.data || err.message));
      }
    };

    fetchCarreras();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (phone.length !== 9) {
      setError('El número de teléfono debe tener exactamente 9 dígitos.');
      return;
    }
    try {
      await AuthService.register(name, email, password, phone, lastname, carrera);
      navigate('/');
    } catch (err) {
      setError('Error al registrar el usuario: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-5 register-container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="text-center mb-4">
                <img src={logo} alt="TecSwap Logo" className="logo"/>
              </div>
              <h2 className="card-title text-center">Registro</h2>
              <form onSubmit={handleRegister}>
                <div className="form-group mb-3">
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="email">Correo:</label>
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
                <div className="form-group mb-3">
                  <label htmlFor="phone">Teléfono:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="lastname">Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastname"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="carrera">Carrera:</label>
                  <select
                    className="form-control"
                    id="carrera"
                    value={carrera}
                    onChange={(e) => setCarrera(e.target.value)}
                    required
                  >
                    <option value="">Selecciona una carrera</option>
                    {carreras.map(carrera => (
                      <option key={carrera.id} value={carrera.id}>
                        {carrera.carrera}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit" className="btn btn-custom w-100">Registrar</button>
                {error && <div className="alert alert-danger mt-3">{error}</div>}
              </form>
              <button className="btn btn-link mt-3 w-100" onClick={() => navigate('/')}>Ir a iniciar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;