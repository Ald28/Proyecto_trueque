import React from 'react';
import '../styles/components/Portada.css';

const Portada = () => {
  return (
    <div className="portada">
        <img 
            src="/images/FondoPortada.png" 
            alt="Portada" 
            className="portada-img"
        />
    </div>
  );
};

export default Portada;
