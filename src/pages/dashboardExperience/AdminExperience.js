import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExperienceAdminCard } from '../../components/experienceAdminCard/ExperienceAdminCard.js';
import { useFiltered } from '../../hooks/useFiltered.js';
import { toast } from 'react-toastify';
import './admin-experience.css';
import { ToTop } from '../../components/toTop/ToTop.js';

export const AdminExperience = () => {
  const [toSearch, setToSearch] = useState('');

  const { filtered, error, loading } = useFiltered(`?experience=${toSearch}`);

  const ref = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setToSearch(ref.current.value);
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <div>
      <ToTop />
      <h1 id="title-admin-cat" onClick={() => navigate(`/dashboard`)}>
        GESTOR de Experiencias
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="barrabusquedacategory">
          <label htmlFor="findCat">Experiencia</label>
          <input
            type="text"
            ref={ref}
            placeholder="Búsqueda por Título / Descripción"
            onChange={handleSubmit}
            value={toSearch}
          />
        </div>
        <div>
          <Link
            to="/dashboard/adminExperience/createExperience"
            id="link-create-cat"
          > <button className="generalbutton">
          crear experiencia
          </button>
      
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
              key={exp.id}
              exp={exp}
              setToSearch={setToSearch}
            />
          ))}
        </div>
      )}
    </div>
  );
};
