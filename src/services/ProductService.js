import axios from 'axios';

const API_URL = 'http://localhost:8082';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Basic ${token}`
    }
  };
};

const fetchUserProducts = () => {
  return axios.get(`${API_URL}/user/products`, getAuthHeaders());
};

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return { data: [] };
  }
};

const addProduct = async (formData) => {
  return axios.post(`${API_URL}/producto`, formData, getAuthHeaders());
};

const fetchAllProducts = () => {
  return axios.get(`${API_URL}/productos`);
};

const crearSolicitudIntercambio = (solicitudIntercambio) => {
  return axios.post(`${API_URL}/intercambio`, solicitudIntercambio, getAuthHeaders());
};

const obtenerSolicitudesIntercambio = () => {
  return axios.get(`${API_URL}/intercambio/solicitudes`, getAuthHeaders());
};

const obtenerHistorialSolicitudesIntercambio = () => {
  return axios.get(`${API_URL}/intercambio/historial`, getAuthHeaders());
};

const responderSolicitudIntercambio = (id, aceptada) => {
  return axios.post(`${API_URL}/intercambio/responder/${id}?aceptada=${aceptada}`, null, getAuthHeaders());
};

const deleteProduct = (id) => {
  return axios.delete(`${API_URL}/producto/${id}`, getAuthHeaders())
    .catch(error => {
      console.error('Error deleting product:', error);
      throw error;
    });
};

const updateProduct = (id, formData) => {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/producto/${id}`, formData, {
    headers: {
      'Authorization': `Basic ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

const fetchProductById = (id) => {
  return axios.get(`${API_URL}/producto/${id}`, getAuthHeaders());
};

const searchProducts = (query) => {
  return axios.get(`${API_URL}/productos/search?query=${query}`, getAuthHeaders());
};

const fetchProductsByCategory = (categoryId) => {
  return axios.get(`${API_URL}/categoria/${categoryId}/productos`, getAuthHeaders());
};

const ProductService = {
  fetchUserProducts,
  fetchCategories,
  addProduct,
  fetchAllProducts,
  crearSolicitudIntercambio,
  obtenerSolicitudesIntercambio,
  obtenerHistorialSolicitudesIntercambio,
  responderSolicitudIntercambio,
  deleteProduct,
  updateProduct,
  fetchProductById,
  searchProducts ,
  fetchProductsByCategory
};

export default ProductService;
