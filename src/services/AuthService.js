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

const register = (name, email, password, phone, lastname, carrera) => {
  return axios.post(`${API_URL}/api/register`, {
    name,
    email,
    password,
    phone,
    lastname,
    carrera_id: carrera // Asegúrate de que esta línea envía correctamente el ID de la carrera
  });
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/login`, { email, password });
    if (response.status === 200) {
      const token = btoa(`${email}:${password}`);
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('user_id', response.data.id); // Guarda el user_id
    }
    return response;
  } catch (err) {
    console.error('Login error:', err.response?.data || err.message);
    throw err;
  }
};


const fetchUserData = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/profile`, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

const uploadProfileImage = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/api/profile/upload`, formData, {
      headers: {
        ...getAuthHeaders().headers,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    console.error('Error uploading profile image:', error.response?.data || error.message);
    throw error;
  }
};

const updateUserProfile = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/profile/update`, userData, getAuthHeaders());
    return response;
  } catch (error) {
    console.error('Error updating user data:', error.response?.data || error.message);
    throw error;
  }
};

const fetchCarreras = () => {
  return axios.get(`${API_URL}/api/carreras`);
};

const AuthService = {
  register,
  login,
  fetchUserData,
  uploadProfileImage,
  updateUserProfile,
  fetchCarreras
};

export default AuthService;