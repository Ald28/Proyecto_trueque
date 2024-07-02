import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/DetallesProducto.css';

const DetallesProducto = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.fetchProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product: ' + (err.response?.data || err.message));
      }
    };
    fetchProduct();
  }, [id]);

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Detalles del Producto</h2>
      <div className="card">
        <img src={`http://localhost:8082/uploads/${product.imagen}`} className="card-img-top" alt={product.titulo} />
        <div className="card-body">
          <h5 className="card-title">{product.titulo}</h5>
          <p className="card-text">
            <small className="text-muted">Usuario: {product.usuario.name}</small>
          </p>

          <p className="card-text">Estado: {product.estado}</p>
          <p className="card-text">Detalles: {product.descripcion}</p>
          <button className="btn btn-primary" onClick={() => navigate(`/solicitar-intercambio/${product.id}`)}>
            Solicitar Intercambio
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetallesProducto;

