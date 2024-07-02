import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Chart, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import '../styles/components/AdminDashboard.css';

// Registrar componentes de chart.js
Chart.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [roles, setRoles] = useState([]);
  const [solicitudes, setSolicitudes] = useState([]);
  const [activeSection, setActiveSection] = useState('usuarios'); 
  const [newCategoria, setNewCategoria] = useState('');
  const [newCarrera, setNewCarrera] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeSection]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const usuariosResponse = await axios.get('http://localhost:8000/api/usuarios/', config);
      setUsuarios(usuariosResponse.data);

      const productosResponse = await axios.get('http://localhost:8000/api/productos/', config);
      setProductos(productosResponse.data);

      const categoriasResponse = await axios.get('http://localhost:8000/api/categorias/', config);
      setCategorias(categoriasResponse.data);

      const carrerasResponse = await axios.get('http://localhost:8000/api/carrera/', config);
      setCarreras(carrerasResponse.data);

      const rolesResponse = await axios.get('http://localhost:8000/api/roles/', config);
      setRoles(rolesResponse.data);

      const solicitudesResponse = await axios.get('http://localhost:8000/api/solicitudes/', config);
      setSolicitudes(solicitudesResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    navigate('/login'); 
  };

  const handleCreateCategoria = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post('http://localhost:8000/api/create_categoria/', { tipo: newCategoria }, config);
      setNewCategoria('');
      fetchData(); 
    } catch (error) {
      console.error('Error creating categoria:', error);
    }
  };

  const handleCreateCarrera = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post('http://localhost:8000/api/create_carrera/', { carrera: newCarrera }, config);
      setNewCarrera('');
      fetchData(); 
    } catch (error) {
      console.error('Error creating carrera:', error);
    }
  };

  const handleDeleteUsuario = async (usuarioId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.delete(`http://localhost:8000/api/usuarios/delete/${usuarioId}/`, config);
      fetchData();
    } catch (error) {
      console.error('Error deleting usuario:', error);
    }
  };  

  const renderSection = () => {
    switch (activeSection) {
      case 'usuarios':
        return (
          <section id="usuarios" className="section-content">
            <h2>Usuarios</h2>
            <ul>
              {usuarios.map((usuario) => (
                <li key={usuario.id}>
                  {usuario.name} - {usuario.phone} - {usuario.carrera} - {usuario.email}
                  <button onClick={() => handleDeleteUsuario(usuario.id)} className="delete-button">Eliminar</button>
                </li>
              ))}
            </ul>
          </section>
        );
      case 'productos':
        return (
          <section id="productos" className="section-content">
            <h2>Productos</h2>
            <ul>
              {productos.map((producto) => (
                <li key={producto.id}>{producto.titulo} - {producto.descripcion} - {producto.usuarios} - {producto.estado}</li>
              ))}
            </ul>
          </section>
        );
      case 'categorias':
        return (
          <section id="categorias" className="section-content">
            <h2>Categorías</h2>
            <ul>
              {categorias.map((categoria) => (
                <li key={categoria.id}>{categoria.tipo}</li>
              ))}
            </ul>
            <input 
              type="text" 
              value={newCategoria} 
              onChange={(e) => setNewCategoria(e.target.value)} 
              placeholder="Nueva categoría" 
            />
            <button onClick={handleCreateCategoria} className="create-button">Crear Categoría</button>
          </section>
        );
      case 'carreras':
        return (
          <section id="carreras" className="section-content">
            <h2>Carreras</h2>
            <ul>
              {carreras.map((carrera) => (
                <li key={carrera.id}>{carrera.carrera}</li>
              ))}
            </ul>
            <input 
              type="text" 
              value={newCarrera} 
              onChange={(e) => setNewCarrera(e.target.value)} 
              placeholder="Nueva carrera" 
            />
            <button onClick={handleCreateCarrera} className="create-button">Crear Carrera</button>
          </section>
        );
      case 'roles':
        return (
          <section id="roles" className="section-content">
            <h2>Roles</h2>
            <ul>
              {roles.map((rol) => (
                <li key={rol.id}>{rol.tipo}</li>
              ))}
            </ul>
          </section>
        );
      case 'solicitudes':
        return (
          <section id="solicitudes" className="section-content">
            <h2>Solicitudes</h2>
            <ul>
              {solicitudes.map((solicitud) => (
                <li key={solicitud.id}>
                  {solicitud.solicitante} solicitó {solicitud.producto_solicitado} y ofreció {solicitud.producto_ofrecido} al propietario {solicitud.propietario}
                </li>
              ))}
            </ul>
          </section>
        );
      case 'dashboard':
        return renderDashboard();
      default:
        return null;
    }
  };

  const renderDashboard = () => {
    const dataUsuarios = {
      labels: ['Usuarios'],
      datasets: [
        {
          label: 'Cantidad de Usuarios',
          data: [usuarios.length],
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
      ],
    };

    const dataProductos = {
      labels: ['Productos'],
      datasets: [
        {
          label: 'Cantidad de Productos',
          data: [productos.length],
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
        },
      ],
    };

    const dataCategorias = {
      labels: ['Categorías'],
      datasets: [
        {
          label: 'Cantidad de Categorías',
          data: [categorias.length],
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    };

    const dataCarreras = {
      labels: ['Carreras'],
      datasets: [
        {
          label: 'Cantidad de Carreras',
          data: [carreras.length],
          backgroundColor: 'rgba(153, 102, 255, 0.6)',
        },
      ],
    };

    return (
      <div>
        <h2>Dashboard</h2>
        <div className="charts-container">
          <div className="chart">
            <Bar data={dataUsuarios} />
          </div>
          <div className="chart">
            <Bar data={dataProductos} />
          </div>
          <div className="chart">
            <Bar data={dataCategorias} />
          </div>
          <div className="chart">
            <Bar data={dataCarreras} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h1>Admin Dashboard</h1>
        <ul>
          <li><button onClick={() => setActiveSection('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>Dashboard</button></li>
          <li><button onClick={() => setActiveSection('usuarios')} className={activeSection === 'usuarios' ? 'active' : ''}>Usuarios</button></li>
          <li><button onClick={() => setActiveSection('productos')} className={activeSection === 'productos' ? 'active' : ''}>Productos</button></li>
          <li><button onClick={() => setActiveSection('categorias')} className={activeSection === 'categorias' ? 'active' : ''}>Categorías</button></li>
          <li><button onClick={() => setActiveSection('carreras')} className={activeSection === 'carreras' ? 'active' : ''}>Carreras</button></li>
          <li><button onClick={() => setActiveSection('roles')} className={activeSection === 'roles' ? 'active' : ''}>Roles</button></li>
          <li><button onClick={() => setActiveSection('solicitudes')} className={activeSection === 'solicitudes' ? 'active' : ''}>Solicitudes</button></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
      </div>
      <div className="content">
        {renderSection()}
      </div>
    </div>
  );
};

export default AdminDashboard;
