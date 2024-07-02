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

const aceptarSolicitud = (id) => {
  return axios.post(`${API_URL}/api/intercambio/responder/${id}?aceptada=true`, {}, getAuthHeaders());
};

const rechazarSolicitud = (id) => {
  return axios.post(`${API_URL}/api/intercambio/responder/${id}?aceptada=false`, {}, getAuthHeaders());
};

const SolicitudService = {
  aceptarSolicitud,
  rechazarSolicitud,
  // Otros métodos...
};

export default SolicitudService;