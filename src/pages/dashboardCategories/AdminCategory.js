import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CategoryAdminCard } from '../../components/categoryAdminCard/CategoryAdminCard.js';
import { useGetCategories } from '../../hooks/useGetCategories.js';
import './admin-category.css';

export const AdminCategory = () => {
  const [toSearch, setToSearch] = useState('');

  const { categories, loading, error } = useGetCategories(toSearch);

  const handleInput = (e) => {
    setToSearch(e.target.value);
  };

  const handleSumit = (e) => {
    e.preventDefault();
    console.log('Enviado');
  };

  return (
    <div>
      <h1 id="title-admin-cat">GESTOR de Categorías</h1>
      <button onClick={(e) => setToSearch('')}>Refresh</button>
      <form onSubmit={handleSumit} id="category-form">
        <div className="input-search">
          <label htmlFor="findCat">Buscar Categoría</label>
          <input
            type="text"
            caption="Búsqueda por ID / Categoría"
            onChange={handleInput}
            value={toSearch}
          />
        </div>
        <div>
          <Link
            to="/dashboard/adminCategory/createCategory"
            id="link-create-cat"
          >
            crear categoría
          </Link>
        </div>
      </form>
      <hr />
      {categories.map((cat) => (
        <CategoryAdminCard key={cat.id} cat={cat} />
      ))}
    </div>
  );
};
