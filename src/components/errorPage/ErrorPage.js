import { Link } from 'react-router-dom';
import './error-page.css';

export const ErrorPage = (error) => {
  console.log(error.error);
  return (
    <div className="info-page">
      <h1 className="title">NOOOOOO!!!</h1>
      <h2 className="subtitle">Error {error.error}</h2>
      <h2 className="subtitle">
        No hemos encontrado la página que estás buscando.
      </h2>
      <p className="error-title">404</p>
      <img src="../imgs/notfound404.png" alt="error" className="img_notfound" />
      <Link to="/" className="volver-inicio">
        Volver al inicio
      </Link>
    </div>
  );
};
