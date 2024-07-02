import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login/`, { email, password });
      if (response.status === 200) {
        const token = btoa(`${email}:${password}`);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('user_id', response.data.id);
        localStorage.setItem('isAdmin', response.data.isAdmin);
      }
      return response;
    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      throw err;
    }
  };
  

const AuthAdmin = {
  login,
};

export default AuthAdmin;
