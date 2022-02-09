import React, { useContext, useEffect, useState } from 'react';
import './edit-category.css';
import Switch from '@mui/material/Switch';
import { TokenContext } from '../../contexts/TokenContext';
import { useParams } from 'react-router-dom';
import { useAdminCat } from '../../hooks/useAdminCat';
import fetcher from '../../helpers/fetcher';
import { checkIfFileExists, checkImage } from '../../helpers/checkIfFileExists';

export const EditCategory = () => {
  const [nameCategory, setNameCategory] = useState('');
  const [descriptionCategory, setDescriptionCategory] = useState('');
  const [activeCat, setActiveCat] = useState(false);
  const [photoCat, setPhotoCat] = useState(null);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useContext(TokenContext);
  const { id } = useParams();

  const { cat } = useAdminCat(id, token);

  useEffect(() => {
    if (Object.keys(cat).length > 0) {
      setNameCategory(cat.title);
      setDescriptionCategory(cat.description);
      setActiveCat(cat.active === 1 ? true : false);
      setPhotoCat(
        cat.photo &&
          checkIfFileExists(
            `${process.env.REACT_APP_BACKEND_URL}/uploads/${cat.photo}`
          )
          ? cat.photo
          : null
      );
    }
  }, [cat]);

  const handleActiveChange = (e) => {
    setActiveCat(e.target.checked);
  };

  const editCategory = (e) => {
    e.preventDefault();
    fetcher(setResult, setError, setLoading, `category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        title: nameCategory,
        description: descriptionCategory,
        active: activeCat ? '1' : '0',
      }),
    });
  };

  const handleChangePhoto = (e) => {
    e.preventDefault();
    fetcher(setResult, setError, setLoading, `category/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        title: nameCategory,
        description: descriptionCategory,
        active: activeCat ? '1' : '0',
      }),
    });
  };

  return (
    <>
      <section>
        <h1 className="title">Editar CATEGORIA</h1>
        <br />
        {result.length > 0 && <h5>el resultado cuando se utiliza {result}</h5>}
        <br />
        <hr />
        <form onSubmit={editCategory} className="edit-cat-form">
          <div id="edit-cat-title">
            <input
              type="text"
              id="edit-cat-name"
              name="category"
              value={nameCategory}
              onChange={(e) => {
                setNameCategory(e.target.value);
              }}
              placeholder="Nombre categoría"
            />
            <div className="edit-sect-activar">
              <p>Activar</p>
              <Switch checked={activeCat} onChange={handleActiveChange} />
            </div>
          </div>
          <div>
            <textarea
              type="text"
              id="edit-cat-description"
              name="description"
              value={descriptionCategory}
              onChange={(e) => {
                setDescriptionCategory(e.target.value);
              }}
              placeholder="Descripcion categoría"
              rows="5"
            />
          </div>

          <button type="submit" className="btn-category-option">
            Actualizar Categoría
          </button>
        </form>

        {error && <h1>{error}</h1>}
        <br />
        <hr />
        {!error && <p>Podemos subir imagen</p>}
      </section>
      <section className="edit-upload-img">
        <figure className="card-figure-category">
          {photoCat ? (
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
      </section>
    </>
  );
};
