import React, { useContext, useEffect, useState } from 'react';
import './edit-category.css';
import Switch from '@mui/material/Switch';
import { TokenContext } from '../../contexts/TokenContext';
import { useParams } from 'react-router-dom';
import { useAdminCat } from '../../hooks/useAdminCat';
import fetcher from '../../helpers/fetcher';

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
      setPhotoCat(cat.photo ? cat.photo : null);
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

  return (
    <section>
      <h1>Editar CATEGORIA</h1>
      <form onSubmit={editCategory}>
        <input
          type="text"
          id="category"
          name="category"
          value={nameCategory}
          onChange={(e) => {
            setNameCategory(e.target.value);
          }}
          placeholder="Nombre categoría"
        />
        <input
          type="text"
          id="description"
          name="description"
          value={descriptionCategory}
          onChange={(e) => {
            setDescriptionCategory(e.target.value);
          }}
          placeholder="Descripcion categoría"
        />
        <Switch checked={activeCat} onChange={handleActiveChange} />
        <button type="submit">Actualizar Categoría</button>
      </form>
      <h1>{nameCategory}</h1>
      <h1>{descriptionCategory}</h1>
      <h1>{activeCat}</h1>
      <h5>{token}</h5>
      <h5>el resultado no se usa {result}</h5>
      {error && <h1>{error}</h1>}
      <hr />
      {!error && <p>Podemos subir imagen</p>}
    </section>
  );
};
