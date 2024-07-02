import React, { useEffect, useState } from 'react';
import { obtenerHistorialSolicitudesIntercambio } from '../api/products';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/RequestStatus.css';

const EstadoSolicitudes = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await obtenerHistorialSolicitudesIntercambio();
        setRequests(response.data);
      } catch (err) {
        setError('Error al obtener las solicitudes: ' + (err.response?.data || err.message));
      }
    };
    fetchRequests();
  }, []);

  const crearUrlWhatsApp = (phone, message) => {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encodedMessage}`;
  };

  return (
    <div className="container mt-4 solicitud-container">
      <h2 className="mb-4">Estado de las Solicitudes</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <ul className="solicitud-list">
        {requests.map(request => (
          <li key={request.id} className="solicitud-list-item list-group-item">
            <div className="solicitud-details">
              <div>
                <strong>Producto Solicitado:</strong> {request.productoSolicitado?.titulo}
              </div>
              <div>
                <strong>Producto Ofrecido:</strong> {request.productoOfrecido?.titulo}
              </div>
              <div>
                <strong>Solicitante:</strong> {request.solicitante?.email}
              </div>
              <div>
                <strong>Fecha:</strong> {new Date(request.fecha).toLocaleString()}
              </div>
              <div>
                <strong>Estado:</strong> {request.respondida ? (request.aceptada ? 'Aceptada' : 'Rechazada') : 'Pendiente'}
              </div>
              {request.respondida && request.aceptada && (
                <div>
                  <strong>Teléfono del Solicitante:</strong> 
                  <a 
                    href={crearUrlWhatsApp(`+51${request.solicitante?.phone}`, "Hola tu estas interesado en mi producto..?")} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    {request.solicitante?.phone}
                  </a>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EstadoSolicitudes;