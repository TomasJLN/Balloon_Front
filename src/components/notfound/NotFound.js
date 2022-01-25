import React from 'react';
import { Link } from 'react-router-dom';
import './notfound.css';

export const NotFound = () => {
  return (
    <div className="info-page">
      <h1 className="title">OOOOOOPS!!!</h1>
      <h2 className="subtitle">Lo sentimos</h2>
      <h2 className="subtitle">
        No hemos encontrado la página que estás buscando.
      </h2>
      <p className="error-title">404</p>
      <img
        src="../imgs/notfound404.png"
        alt="error_404"
        className="img_notfound"
      />
      <Link to="/" className="volver-inicio">
        Volver al inicio
      </Link>
    </div>
  );
};
