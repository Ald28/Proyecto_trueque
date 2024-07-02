import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/AllProducts.css';
import defaultUserIcon from '../assets/user-icon.svg';

const Categoria = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await ProductService.fetchProductsByCategory(id);
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products: ' + (err.response?.data || err.message));
      }
    };

    fetchProductsByCategory();
  }, [id]);

  const renderUserIcon = (user) => {
    return user.imagen 
      ? `http://localhost:8082/uploads/${user.imagen}` 
      : defaultUserIcon;
  };

  return (
    <div className="container all-products-container mt-4">
      <h2>Productos en esta categoría</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {products.map(product => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <Link to={`/producto/${product.id}`}>
                <img src={`http://localhost:8082/uploads/${product.imagen}`} className="card-img-top" alt={product.titulo} />
                <div className="user-info-overlay">
                  <img src={renderUserIcon(product.usuario)} alt="User icon" className="user-icon" />
                  <small className="text-white">{product.usuario.name}</small> {/* Aplica la clase text-white */}
                </div>
              </Link>
              <div className="card-body">
                <h5 className="card-title">{product.titulo}</h5>
                <p className="card-text">{product.descripcion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categoria;