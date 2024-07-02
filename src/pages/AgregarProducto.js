import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductService from '../services/ProductService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/AgregarProducto.css';

const AgregarProducto = () => {
  const [newProduct, setNewProduct] = useState({
    titulo: '',
    descripcion: '',
    estado: 'pendiente',
    cantidad: '',
    categoria: { id: '' },
    imagen: null
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await ProductService.fetchCategories();
        setCategories(response.data);
      } catch (err) {
        setError('Error fetching categories: ' + (err.response?.data || err.message));
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setNewProduct({
        ...newProduct,
        categoria: { id: value }
      });
    } else if (name === 'imagen') {
      setNewProduct({
        ...newProduct,
        imagen: e.target.files[0]
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value
      });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('titulo', newProduct.titulo);
    formData.append('descripcion', newProduct.descripcion);
    formData.append('estado', newProduct.estado);
    formData.append('cantidad', newProduct.cantidad);
    formData.append('categoriaId', newProduct.categoria.id);
    formData.append('imagen', newProduct.imagen);

    try {
      await ProductService.addProduct(formData);
      navigate('/home');
    } catch (err) {
      setError('Error adding product: ' + JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-4 agregar-producto-container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Subir Producto</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleAddProduct}>
                <div className="mb-3">
                  <label htmlFor="titulo" className="form-label">Título</label>
                  <input
                    type="text"
                    className="form-control"
                    id="titulo"
                    name="titulo"
                    value={newProduct.titulo}
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
                    value={newProduct.descripcion}
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
                    value={newProduct.estado}
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
                    value={newProduct.cantidad}
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
                    value={newProduct.categoria.id}
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
                    required
                  />
                </div>
                <button type="submit" className="btn btn-custom w-100">Agregar Producto</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgregarProducto;