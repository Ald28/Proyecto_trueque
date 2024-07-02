import React, { useEffect, useState } from 'react';
import { obtenerSolicitudesIntercambio, responderSolicitudIntercambio } from '../api/products';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/SolicitudesRecibidas.css';

const SolicitudesRecibidas = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await obtenerSolicitudesIntercambio();
        setRequests(response.data);
      } catch (err) {
        setError('Error al obtener las solicitudes recibidas: ' + (err.response?.data || err.message));
      }
    };
    fetchRequests();
  }, []);

  const handleResponse = async (id, aceptada) => {
    try {
      const response = await responderSolicitudIntercambio(id, aceptada);
      // Actualizar el estado local
      setRequests(requests.map(request => 
        request.id === id ? { ...request, respondida: true, aceptada: aceptada } : request
      ));
    } catch (err) {
      setError('Error al responder la solicitud de intercambio: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div className="container mt-4 solicitud-container">
      <h2 className="mb-4">Solicitudes Recibidas</h2>
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
              <div className="solicitud-actions mt-3">
                {!request.respondida && (
                  <>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => handleResponse(request.id, true)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleResponse(request.id, false)}
                    >
                      Rechazar
                    </button>
                  </>
                )}
                {request.respondida && request.aceptada && (
                  <div>
                    <strong>Teléfono del Solicitante:</strong> {request.solicitante?.phone}
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolicitudesRecibidas;