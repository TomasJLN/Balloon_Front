import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CategoryAdminCard } from "../../components/categoryAdminCard/CategoryAdminCard.js";
import { useGetCategories } from "../../hooks/useGetCategories.js";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { FaTags, FaPlus, FaArrowLeft } from "react-icons/fa";
import "../../styles/admin-panel.css";

export const AdminCategory = () => {
  const [toSearch, setToSearch] = useState("");
  const { categories, loading, error } = useGetCategories(toSearch, true);
  const [usuario] = useContext(UserContext);
  const isViewer = usuario?.role === "viewer";
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="dashboard-page">
      <section className="form-wrapper">
        <div className="admin-panel-container">
          <div className="admin-panel-header">
            <h1 onClick={() => navigate("/dashboard")}>
              <FaTags /> Gestionar Categorías
            </h1>
            <span className="admin-kpi">
              Total <strong>{categories.length}</strong>
            </span>
          </div>

          <div className="admin-panel-toolbar">
            <input
              className="admin-search"
              type="text"
              value={toSearch}
              onChange={(e) => setToSearch(e.target.value)}
              placeholder="Buscar por ID o nombre..."
            />
            {!isViewer && (
              <button
                className="dash-nav-btn"
                onClick={() =>
                  navigate("/dashboard/adminCategory/createCategory")
                }
              >
                <FaPlus /> Nueva categoría
              </button>
            )}
            <button
              className="dash-nav-btn"
              onClick={() => navigate("/dashboard")}
            >
              <FaArrowLeft /> Dashboard
            </button>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="admin-empty">Cargando...</div>
      ) : categories.length < 1 ? (
        <div className="admin-empty">No hay resultados a mostrar</div>
      ) : (
        <div className="admin-cards-grid">
          {categories.map((cat) => (
            <CategoryAdminCard key={cat.id} cat={cat} setToSearch={setToSearch} />
          ))}
        </div>
      )}
    </div>
  );
};
