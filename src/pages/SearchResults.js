import React, { useState } from 'react';
import ProductService from '../services/ProductService';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await ProductService.searchProducts(query);
      setResults(response.data);
    } catch (err) {
      setError('Error fetching search results: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Resultados de búsqueda</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Buscar</button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row mt-4">
        {results.map((product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <div className="card h-100">
              <Link to={`/producto/${product.id}`}>
                <img src={`http://localhost:8082/uploads/${product.imagen}`} className="card-img-top" alt={product.titulo} />
                <div className="user-info-overlay">
                  <small className="text-muted">{product.usuario.name}</small>
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

export default SearchResults;