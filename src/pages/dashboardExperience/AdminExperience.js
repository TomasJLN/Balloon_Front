import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ExperienceAdminCard } from '../../components/experienceAdminCard/ExperienceAdminCard.js';
import { useFiltered } from '../../hooks/useFiltered.js';
import './admin-experience.css';

export const AdminExperience = () => {
  const [toSearch, setToSearch] = useState('');

  const { filtered, loading } = useFiltered(`?experience=${toSearch}`);

  const ref = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setToSearch(ref.current.value);
  };

  // useEffect(() => {
  //   error && alert(error);
  // }, [error]);

  return (
    <div>
      <h1 id="title-admin-cat">GESTOR de Experiencias</h1>
      <form onSubmit={handleSubmit} id="category-form">
        <div className="input-search">
          <label htmlFor="findCat">Buscar Experiencia</label>
          <input
            type="text"
            ref={ref}
            caption="Búsqueda por Título / Descripción"
            onChange={handleSubmit}
            value={toSearch}
          />
        </div>
        <div>
          <Link
            to="/dashboard/adminCategory/createCategory"
            id="link-create-cat"
          >
            crear experiencia
          </Link>
        </div>
      </form>
      {filtered.length < 1 ? (
        <div className="error-info fade_in">No hay resultados a mostrar</div>
      ) : (
        <div className="form-wrap">
          <hr />
          {filtered.map((exp) => (
            <ExperienceAdminCard
              key={exp.ID}
              exp={exp}
              setToSearch={setToSearch}
            />
          ))}
        </div>
      )}
    </div>
  );
};
