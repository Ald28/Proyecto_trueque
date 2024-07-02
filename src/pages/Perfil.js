import React, { useEffect, useState } from 'react';
import AuthService from '../services/AuthService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Perfil = () => {
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({
    name: '',
    lastname: '',
    phone: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await AuthService.fetchUserData();
        setUserData(response.data);
        setUpdatedUserData({
          name: response.data.name,
          lastname: response.data.lastname,
          phone: response.data.phone
        });
      } catch (err) {
        setError('Error fetching user data: ' + (err.response?.data || err.message));
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value
    });
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const response = await AuthService.updateUserProfile(updatedUserData);
      setUserData(response.data);
      localStorage.setItem('name', response.data.name); // Actualiza el nombre en localStorage si es necesario
      setEditMode(false);
    } catch (err) {
      setError('Error updating user data: ' + (err.response?.data || err.message));
    }
  };
  

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }
    const formData = new FormData();
    formData.append('imagen', selectedFile);
    try {
      await AuthService.uploadProfileImage(formData);
      const response = await AuthService.fetchUserData();
      setUserData(response.data);
    } catch (err) {
      setError('Error uploading profile image: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-4">
      <h2>Perfil del Usuario</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="card">
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            {editMode ? (
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={updatedUserData.name}
                onChange={handleInputChange}
              />
            ) : (
              <h5 className="card-title">{userData.name}</h5>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="lastname">Apellido:</label>
            {editMode ? (
              <input
                type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                value={updatedUserData.lastname}
                onChange={handleInputChange}
              />
            ) : (
              <h5 className="card-title">{userData.lastname}</h5>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Teléfono:</label>
            {editMode ? (
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={updatedUserData.phone}
                onChange={handleInputChange}
              />
            ) : (
              <p className="card-text">{userData.phone}</p>
            )}
          </div>
          {userData.imagen && (
            <img src={`http://localhost:8082/uploads/${userData.imagen}`} alt="Perfil" className="img-fluid" />
          )}
          {editMode ? (
            <button onClick={handleSaveClick} className="btn btn-primary mt-2">Guardar</button>
          ) : (
            <button onClick={handleEditClick} className="btn btn-secondary mt-2">Editar</button>
          )}
          <div className="mt-3">
            <input type="file" onChange={handleImageChange} className="form-control" />
            <button onClick={handleImageUpload} className="btn btn-primary mt-2">Subir Imagen</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;