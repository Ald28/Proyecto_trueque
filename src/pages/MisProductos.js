import React, { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/MisProductos.css';

const MisProductos = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await ProductService.fetchUserProducts();
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products: ' + (err.response?.data || err.message));
      }
    };

    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    navigate('/');
  };

  const handleDelete = async (id) => {
    try {
      await ProductService.deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      setError('Error deleting product: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-4 dashboard-container">
      <h2 className="mb-4">Bienvenid@, {name}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <h3>Tus Productos</h3>
      <ul className="product-list">
        {products.map((product) => (
          <li className="product-list-item" key={product.id}>
            <img src={`http://localhost:8082/uploads/${product.imagen}`} className="img-thumbnail product-img" alt={product.titulo} />
            <div className="product-details">
              <h5>{product.titulo}</h5>
              <p>{product.descripcion}</p>
              <p><small className="text-muted">Usuario: {product.usuario.name}</small></p>
              <div className="product-actions">
                <button className="btn btn-primary" onClick={() => navigate(`/editar-producto/${product.id}`)}>Editar</button>
                <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MisProductos;
