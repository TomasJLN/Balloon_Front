import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CategoryAdminCard } from '../../components/categoryAdminCard/CategoryAdminCard.js';
import { useGetCategories } from '../../hooks/useGetCategories.js';
import './admin-category.css';

export const AdminCategory = () => {
  const [toSearch, setToSearch] = useState('');

  const { categories, loading, error } = useGetCategories(toSearch);

  const ref = useRef(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setToSearch(ref.current.value);
  };

  useEffect(() => {
    error && alert(error);
  }, [error]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1 id="title-admin-cat" onClick={() => navigate(`/dashboard/`)}>
            GESTOR de Categorías
          </h1>
          <form onSubmit={handleSubmit} id="category-form">
            <div className="input-search">
              <label htmlFor="findCat">Buscar Categoría</label>
              <input
                type="text"
                ref={ref}
                caption="Búsqueda por ID / Categoría"
                onChange={handleSubmit}
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
          {categories.length < 1 ? (
            <div className="error-info fade_in">
              No hay resultados a mostrar
            </div>
          ) : (
            <div className="form-wrap">
              <hr />
              {categories.map((cat) => (
                <CategoryAdminCard
                  key={cat.id}
                  cat={cat}
                  setToSearch={setToSearch}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
