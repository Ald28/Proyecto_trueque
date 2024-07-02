import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditarProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await ProductService.fetchProductById(id);
        console.log('Product fetched:', response.data);
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error fetching product: ' + (err.response?.data || err.message));
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await ProductService.fetchCategories();
        console.log('Categories fetched:', response.data);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Error fetching categories: ' + (err.response?.data || err.message));
      }
    };

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setProduct({
        ...product,
        categoria: { id: value }
      });
    } else if (name === 'imagen') {
      setProduct({
        ...product,
        imagen: e.target.files[0]
      });
    } else {
      setProduct({
        ...product,
        [name]: value
      });
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', product.titulo);
    formData.append('descripcion', product.descripcion);
    formData.append('estado', product.estado);
    formData.append('cantidad', product.cantidad);
    formData.append('categoriaId', product.categoria.id);
    if (product.imagen instanceof File) {
      formData.append('imagen', product.imagen);
    }

    try {
      await ProductService.updateProduct(id, formData);
      navigate('/mis-productos');
    } catch (err) {
      setError('Error updating product: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Editar Producto</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleUpdateProduct}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            name="titulo"
            value={product.titulo}
            onChange={handleInputChange}
            placeholder="Título"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="descripcion" className="form-label">Descripción</label>
          <input
            type="text"
            className="form-control"
            id="descripcion"
            name="descripcion"
            value={product.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="estado" className="form-label">Estado</label>
          <select
            className="form-select"
            id="estado"
            name="estado"
            value={product.estado}
            onChange={handleInputChange}
            required
          >
            <option value="pendiente">Pendiente</option>
            <option value="cancelado">Cancelado</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="cantidad" className="form-label">Cantidad</label>
          <input
            type="number"
            className="form-control"
            id="cantidad"
            name="cantidad"
            value={product.cantidad}
            onChange={handleInputChange}
            placeholder="Cantidad"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoría</label>
          <select
            className="form-select"
            id="categoria"
            name="categoria"
            value={product.categoria.id}
            onChange={handleInputChange}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.tipo}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="imagen" className="form-label">Imagen</label>
          <input
            type="file"
            className="form-control"
            id="imagen"
            name="imagen"
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar Producto</button>
      </form>
    </div>
  );
};

export default EditarProducto;