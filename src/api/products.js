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

const addProduct = (product) => {
  return axios.post(`${API_URL}/producto`, product, getAuthHeaders());
};

const fetchAllProducts = () => {
  return axios.get(`${API_URL}/productos`);
};

const fetchProductById = (id) => {
  return axios.get(`${API_URL}/producto/${id}`, getAuthHeaders());
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

export {
  fetchUserProducts,
  fetchCategories,
  addProduct,
  fetchAllProducts,
  fetchProductById,
  crearSolicitudIntercambio,
  obtenerSolicitudesIntercambio,
  obtenerHistorialSolicitudesIntercambio,
  responderSolicitudIntercambio
};
