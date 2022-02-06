import React, { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../contexts/TokenContext';
import fetcher from '../../helpers/fetcher';
import './category-admin-card.css';

//TODO//
//Al borrar categoría no se actualiza la lista de categorías//

export const CategoryAdminCard = ({ cat }) => {
  const [token, setToken] = useContext(TokenContext);
  const [active, setActive] = useState(cat.active === 1 ? true : false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  return (
    <div className="card-category">
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
          onClick={(e) => {
            e.preventDefault();
            fetcher(setResult, setError, setLoading, `category/${cat.id}`, {
              method: 'DELETE',
              headers: {
                Authorization: token,
              },
            });
          }}
        >
          Borrar
        </button>
        <button className="btn-category-option">Editar</button>
        {active && (
          <button
            className="btn-category-option"
            onClick={() => setActive(!active)}
          >
            Desactivar
          </button>
        )}
        {!active && (
          <button
            className="btn-category-option"
            onClick={() => setActive(!active)}
          >
            Activar
          </button>
        )}
      </div>
      <h1>{result}</h1>
    </div>
  );
};
