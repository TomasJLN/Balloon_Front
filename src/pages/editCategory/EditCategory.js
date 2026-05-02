import { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaImage, FaSave, FaTags } from "react-icons/fa";
import { useAdminCat } from "../../hooks/useAdminCat";
import fetcher from "../../helpers/fetcher";
import { fileUpload } from "../../helpers/fileUpload";
import { toast } from "react-toastify";
import "./edit-category.css";

export const EditCategory = () => {
  const [nameCategory, setNameCategory] = useState("");
  const [descriptionCategory, setDescriptionCategory] = useState("");
  const [activeCat, setActiveCat] = useState(false);
  const [photoCat, setPhotoCat] = useState(null);
  const [result, setResult] = useState("null");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token] = useContext(TokenContext);
  const [usuario] = useContext(UserContext);
  const isViewer = usuario?.role === "viewer";
  const navigate = useNavigate();
  const { id } = useParams();
  const { cat } = useAdminCat(id, token, setLoading, setError);

  useEffect(() => {
    if (Object.keys(cat).length > 0) {
      setNameCategory(cat.title);
      setDescriptionCategory(cat.description);
      setActiveCat(cat.active === 1 ? true : false);
      setPhotoCat(
        cat.photo && `${process.env.REACT_APP_BACKEND_URL}/uploads/${cat.photo}`
          ? cat.photo
          : null
      );
    }
  }, [cat]);

  const handleActiveChange = (e) => {
    setActiveCat(e.target.checked);
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    fetcher(setResult, setError, setLoading, `category/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        title: nameCategory,
        description: descriptionCategory,
        active: activeCat ? "1" : "0",
      }),
    });
  };

  const handlePictureChange = async (e) => {
    setLoading(true);
    setError(null);
    const file = e.target.files[0];
    const url = `${process.env.REACT_APP_BACKEND_URL}/category/${id}/photo`;
    const key = "photo";
    if (file) {
      const resp = await fileUpload(url, key, setError, file, token);
      setPhotoCat(resp.data);
    }
    setLoading(false);
  };

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  useEffect(() => {
    photoCat && !error && setNameCategory(cat.title);
    error && toast.error(error.message);
  }, [setPhotoCat, photoCat, error, cat.title]);

  useEffect(() => {
    result.includes("Categoría actualizada") &&
      navigate("/dashboard/adminCategory");
  }, [result, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="edit-category-page">
      {loading ? (
        <div className="edit-category-empty">Cargando...</div>
      ) : (
        <div className="edit-category-container">
          {error && <div className="edit-category-error">{String(error?.message || error)}</div>}

          <header className="edit-category-header">
            <div>
              <p className="edit-category-kicker">
                {isViewer ? "Vista de solo lectura" : "Panel de administración"}
              </p>
              <h1 onClick={() => navigate(`/dashboard`)}>
                {isViewer ? "Ver categoría" : "Editar categoría"}
              </h1>
            </div>
            <button
              type="button"
              className="edit-category-back"
              onClick={() => navigate("/dashboard/adminCategory")}
            >
              <FaArrowLeft /> Volver
            </button>
          </header>

          <form onSubmit={handleUpdateCategory} className="edit-category-layout">
            <aside className="edit-category-side">
              <figure className="edit-category-photo" onClick={isViewer ? undefined : handlePictureClick}>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoCat || "NA.png"}`}
                  alt={cat.title}
                />
                {!isViewer && (
                  <figcaption>
                    <FaImage /> Cambiar imagen
                  </figcaption>
                )}
              </figure>

              <input
                type="file"
                id="fileSelector"
                style={{ display: "none" }}
                onChange={handlePictureChange}
              />

              <div className="edit-category-status-card">
                <div className="edit-category-status-row">
                  <span>Activa</span>
                  <Switch checked={activeCat} onChange={handleActiveChange} disabled={isViewer} />
                </div>
              </div>
            </aside>

            <div className="edit-category-form-panel">
              <section className="edit-category-section">
                <div className="edit-category-section-title">
                  <FaTags />
                  <h2>Información de categoría</h2>
                </div>

                <div className="edit-category-grid">
                  <label className="edit-category-field edit-category-field-full" htmlFor="edit-cat-name">
                    <span>Nombre categoría</span>
                    <input
                      type="text"
                      id="edit-cat-name"
                      name="category"
                      value={nameCategory}
                      onChange={(e) => {
                        setNameCategory(e.target.value);
                      }}
                      placeholder="Nombre categoría"
                      disabled={isViewer}
                    />
                  </label>

                  <label className="edit-category-field edit-category-field-full" htmlFor="edit-cat-description">
                    <span>Descripción categoría</span>
                    <textarea
                      id="edit-cat-description"
                      rows="7"
                      name="description"
                      value={descriptionCategory}
                      onChange={(e) => {
                        setDescriptionCategory(e.target.value);
                      }}
                      placeholder="Descripción categoría"
                      disabled={isViewer}
                    />
                  </label>
                </div>
              </section>

              <div className="edit-form-actions">
                {!isViewer && (
                  <button type="submit" className="edit-category-submit" disabled={loading}>
                    <FaSave /> {loading ? "Actualizando..." : "Actualizar"}
                  </button>
                )}
                <button
                  type="button"
                  className="edit-category-secondary"
                  onClick={() => navigate("/dashboard/adminCategory")}
                >
                  <FaArrowLeft /> Volver
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </section>
  );
};
