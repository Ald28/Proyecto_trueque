import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductService from '../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/AllProducts.css';
import defaultUserIcon from '../assets/user-icon.svg'; // Icono por defecto
import Portada from '../components/Portada';

const Home = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (categoryId) {
          response = await ProductService.fetchProductsByCategory(categoryId);
        } else {
          response = await ProductService.fetchAllProducts();
        }
        setProducts(response.data);
      } catch (err) {
        setError('Error fetching products: ' + (err.response?.data || err.message));
      }
    };
    fetchProducts();
  }, [categoryId]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    try {
      const response = await ProductService.searchProducts(searchQuery);
      setSearchResults(response.data);
    } catch (err) {
      setError('Error fetching search results: ' + (err.response?.data || err.message));
    }
  };

  const renderUserIcon = (user) => {
    return user.imagen 
      ? `http://localhost:8082/uploads/${user.imagen}` 
      : defaultUserIcon;
  };

  return (
    <div className="container all-products-container mt-4">
      <Portada /><br /><br />
      <form onSubmit={handleSearch} className="search-form mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary mt-2">Buscar</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        {searchResults.length > 0 ? (
          searchResults.map(product => (
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
          ))
        ) : (
          products.map(product => (
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
          ))
        )}
      </div>
    </div>
  );
};

export default Home;