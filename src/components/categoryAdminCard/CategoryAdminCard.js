import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../contexts/TokenContext';
import fetcher from '../../helpers/fetcher';
import './category-admin-card.css';

export const CategoryAdminCard = ({ cat, setToSearch }) => {
  const [token, setToken] = useContext(TokenContext);
  const [active, setActive] = useState(cat.active === 1 ? true : false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Trae los resultados de las categorias
  useEffect(() => {
    setLoading(true);
    fetcher(setResult, setError, setLoading, `category/${cat.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        active: active ? '1' : '0',
      }),
    });
  }, [active, cat.id, token]);

  // Un alert en cuanto el estado de error cambie de null
  useEffect(() => {
    error && alert(error);
  }, [error]);

  return (
    <div className="card-category fade_in">
      <div className="title-card-category">
        <span>ID: {cat.id}</span>
        <span>Categoría: {cat.title}</span>
      </div>
      <figure className="card-figure-category">
        {cat.photo ? (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${cat.photo}`}
            alt={cat.title}
            className="card-thumbnail-category"
          />
        ) : (
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
            alt={cat.title}
            className="card-thumbnail-category"
          />
        )}
      </figure>
      <div className="row-button-category">
        <button
          className="btn-category-option"
          onClick={async (e) => {
            e.preventDefault();
            setToSearch(' ');
            await fetcher(
              setResult,
              setError,
              setLoading,
              `category/${cat.id}`,
              {
                method: 'DELETE',
                headers: {
                  Authorization: token,
                },
              }
            );
            setToSearch('');
          }}
        >
          Borrar
        </button>
        <button
          className="btn-category-option"
          onClick={() =>
            navigate(`/dashboard/adminCategory/editCategory/${cat.id}`)
          }
        >
          Editar
        </button>
        {active && (
          <button
            className="btn-category-option btn-active"
            id="btn-desactive"
            onClick={() => {
              setActive(!active);
            }}
          >
            Desactivar
          </button>
        )}
        {!active && (
          <button
            className="btn-category-option"
            id="btn-active"
            onClick={(e) => {
              setActive(!active);
            }}
          >
            Activar
          </button>
        )}
      </div>
    </div>
  );
};
