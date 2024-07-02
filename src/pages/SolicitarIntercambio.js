import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/RequestExchange.css';

const SolicitarIntercambio = () => {
  const { id } = useParams();
  const [productoSolicitado, setProductoSolicitado] = useState(id || '');
  const [productoOfrecido, setProductoOfrecido] = useState('');
  const [todosProductos, setTodosProductos] = useState([]);
  const [misProductos, setMisProductos] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const responseTodosProductos = await ProductService.fetchAllProducts();
        setTodosProductos(responseTodosProductos.data);
        const responseMisProductos = await ProductService.fetchUserProducts();
        setMisProductos(responseMisProductos.data);
      } catch (err) {
        setError('Error al obtener los productos: ' + (err.response?.data || err.message));
      }
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.crearSolicitudIntercambio({
        productoSolicitado: { id: productoSolicitado },
        productoOfrecido: { id: productoOfrecido }
      });
      setMessage('Solicitud de intercambio creada con éxito');
      navigate('/home');
    } catch (err) {
      setError('Error al crear la solicitud de intercambio: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container">
      <h2>Solicitar Intercambio</h2>
      {error && <p className="text-danger">{error}</p>}
      {message && <p className="text-success">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Producto Solicitado:</label>
          <select
            className="form-control"
            value={productoSolicitado}
            onChange={(e) => setProductoSolicitado(e.target.value)}
          >
            <option value="">Selecciona un producto</option>
            {todosProductos.map(producto => (
              <option key={producto.id} value={producto.id}>
                {producto.titulo}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Producto Ofrecido:</label>
          <select
            className="form-control"
            value={productoOfrecido}
            onChange={(e) => setProductoOfrecido(e.target.value)}
          >
            <option value="">Selecciona un producto</option>
            {misProductos.map(producto => (
              <option key={producto.id} value={producto.id}>
                {producto.titulo}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default SolicitarIntercambio;
