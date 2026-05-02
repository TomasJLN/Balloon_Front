import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ExperienceAdminCard } from "../../components/experienceAdminCard/ExperienceAdminCard.js";
import { useFiltered } from "../../hooks/useFiltered.js";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import { FaGlobe, FaPlus, FaArrowLeft } from "react-icons/fa";
import "../../styles/admin-panel.css";

export const AdminExperience = () => {
  const [toSearch, setToSearch] = useState("");
  const { filtered, error, loading } = useFiltered(`?experience=${toSearch}`);
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
              <FaGlobe /> Gestionar Experiencias
            </h1>
            <span className="admin-kpi">
              Total <strong>{filtered.length}</strong>
            </span>
          </div>

          <div className="admin-panel-toolbar">
            <input
              className="admin-search"
              type="text"
              value={toSearch}
              onChange={(e) => setToSearch(e.target.value)}
              placeholder="Buscar por título o descripción..."
            />
            {!isViewer && (
              <button
                className="dash-nav-btn"
                onClick={() =>
                  navigate("/dashboard/adminExperience/createExperience")
                }
              >
                <FaPlus /> Nueva experiencia
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
      ) : filtered.length < 1 ? (
        <div className="admin-empty">No hay resultados a mostrar</div>
      ) : (
        <div className="admin-cards-grid">
          {filtered.map((exp) => (
            <ExperienceAdminCard key={exp.id} exp={exp} setToSearch={setToSearch} />
          ))}
        </div>
      )}
    </div>
  );
};
