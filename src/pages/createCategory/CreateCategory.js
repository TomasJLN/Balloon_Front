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
      <h1>CATEGORIA</h1>
      <form onSubmit={newCategory}>
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
        <button type="submit" className="generalbutton">Crear</button>
      </form>
      <h1>{nameCategory}</h1>
      <h1>{descriptionCategory}</h1>
      <h1>{activeCat.toString()}</h1>
      <h5>{token}</h5>
      <h5>{result}</h5>
      {error && <h1>{error}</h1>}
      <hr />
      {!error && <p>Podemos subir imagen</p>}
    </section>
  );
};
