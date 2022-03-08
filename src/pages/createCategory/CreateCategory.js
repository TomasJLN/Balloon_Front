import React, { useContext, useState } from 'react';
import './create-category.css';
import Switch from '@mui/material/Switch';
import fetcher from '../../helpers/fetcher';
import { TokenContext } from '../../contexts/TokenContext';

export const CreateCategory = () => {
  const [nameCategory, setNameCategory] = useState('');
  const [descriptionCategory, setDescriptionCategory] = useState('');
  const [activeCat, setActiveCat] = useState(true);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useContext(TokenContext);

  const handleActiveChange = (e) => {
    setActiveCat(e.target.checked);
  };

  const newCategory = (e) => {
    e.preventDefault();
    fetcher(setResult, setError, setLoading, 'category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        title: nameCategory,
        description: descriptionCategory,
        active: activeCat,
      }),
    });
  };

  return (
    <section>
      <form className="generalForm"onSubmit={newCategory}>
      <h1>Categoría</h1>
        <input
          className="generalInput"
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
          className="generalInput"
          type="text"
          id="description"
          name="description"
          value={descriptionCategory}
          onChange={(e) => {
            setDescriptionCategory(e.target.value);
          }}
          placeholder="Descripcion categoría"
        />
        <h3>Activar</h3>
        <Switch checked={activeCat} onChange={handleActiveChange} />
        <button type="submit" className="generalButton">Crear</button>
      </form>
      <div className="hola">
        <h2>{nameCategory}</h2>
        <h3>{descriptionCategory}</h3>
        <p>{activeCat.toString()}</p>
        <p>{token}</p>
        <h4>{result}</h4>
        {error && <h1>{error}</h1>}
        <hr />
        {!error && <p>Podemos subir imagen</p>}

      </div>
      
    </section>
  );
};
