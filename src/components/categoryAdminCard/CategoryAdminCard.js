import React from 'react';
import './category-admin-card.css';

export const CategoryAdminCard = ({ cat }) => {
  console.log(cat.id, cat.title);
  return (
    <div className="card-category">
      <div className="title-card-category">
        <span>ID: {cat.id}</span>
        <span>Categoría: {cat.title}</span>
      </div>
      <figure>
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
          alt={cat.title}
          className="card-thumbnail-category"
        />
      </figure>
      <div className="row-button-category">
        <button className="btn-category-option">Borrar</button>
        <button className="btn-category-option">Editar</button>
        {cat.active === 1 && (
          <button className="btn-category-option">Desactivar</button>
        )}
        {cat.active !== 1 && (
          <button className="btn-category-option">Activar</button>
        )}
      </div>
    </div>
  );
};
