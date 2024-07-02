import axios from 'axios';

const API_URL = 'http://localhost:8082';

const register = (name, email, password, phone, lastname, imagen, carrera) => {
  return axios.post(`${API_URL}/api/register`, {
    name,
    email,
    password,
    phone,
    lastname,
    imagen,
    carrera
  });
};

const login = async (email, password) => {
  const token = btoa(`${email}:${password}`);
  const response = await axios.post(`${API_URL}/api/login`, { email, password });
  if (response.status === 200) {
    localStorage.setItem('token', token);
    localStorage.setItem('email', email);
    localStorage.setItem('name', response.data.name);
  }
  return response;
};

export { register, login };
