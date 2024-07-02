// src/components/Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/components/Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-custom text-white text-center text-lg-start">
      <div className="container p-4">
        <div className="row">
         
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Enlaces Útiles</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="/home" className="text-white">Inicio</a>
              </li>
              <li>
                <a href="/mis-productos" className="text-white">Mis Productos</a>
              </li>
              <li>
                <a href="/solicitar-intercambio" className="text-white">Solicitar Intercambio</a>
              </li>
              <li>
                <a href="/notificaciones" className="text-white">Notificaciones</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contacto</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <a href="mailto:info@tecswap.com" className="text-white">info@tecswap.com</a>
              </li>
              <li>
                <a href="tel:+1234567890" className="text-white">+1 234 567 890</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3 bg-custom-dark text-white">
        &copy; {new Date().getFullYear()} TecSwap. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
