import { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import fetcher from "../../helpers/fetcher";
import { TokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router";
import { fileUpload } from "../../helpers/fileUpload";
import { toast } from "react-toastify";
import { FaArrowLeft, FaImage, FaPlus, FaSave, FaTags } from "react-icons/fa";
import "./create-category.css";

export const CreateCategory = () => {
  const [catData, setCatData] = useState({
    title: "",
    description: "",
    active: true,
  });

  const [photoCat, setPhotoCat] = useState(null);
  const [getID, setGetID] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token] = useContext(TokenContext);
  const navigate = useNavigate();

  const handleActiveChange = (e) => {
    setCatData({ ...catData, active: e.target.checked });
  };

  const newCategory = (e) => {
    e.preventDefault();
    if (getID === "") {
      fetcher(setResult, setError, setLoading, "category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...catData,
          active: catData.active ? "1" : "0",
        }),
      });
    } else {
      toast.error("Categoría ya creada");
    }
  };

  const handlePictureChange = async (e) => {
    setLoading(true);
    setError(null);
    if (getID) {
      const file = e.target.files[0];
      const url = `${process.env.REACT_APP_BACKEND_URL}/category/${getID}/photo`;
      const key = "photo";
      if (file) {
        const resp = await fileUpload(url, key, setError, file, token);
        setPhotoCat(resp.data);
        toast.success("Imagen actualizada");
      }
    }
    setLoading(false);
  };

  const handlePictureClick = () => {
    if (!getID) {
      toast.info("Primero crea la categoría para poder subir una imagen");
      return;
    }
    document.querySelector("#fileSelector").click();
  };

  useEffect(() => {
    error && toast.error(error.message);
  }, [error]);

  useEffect(() => {
    result && setGetID(result);
  }, [result, navigate]);

  useEffect(() => {
    getID && toast.info(`Categoria creada: ${getID}`);
  }, [getID]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //

  return (
    <>
      <section className="create-category-page">
        <div className="create-category-container">
          <header className="create-category-header">
            <div>
              <p className="create-category-kicker">Panel de administración</p>
              <h1 onClick={() => navigate(`/dashboard`)}>Crear categoría</h1>
            </div>
            <button
              type="button"
              className="create-category-back"
              onClick={() => navigate("/dashboard/adminCategory")}
            >
              <FaArrowLeft /> Volver
            </button>
          </header>

          <form className="create-category-layout" onSubmit={newCategory}>
            <aside className="create-category-side">
              <figure
                className={`create-category-photo ${getID ? "" : "is-disabled"}`}
                onClick={getID ? handlePictureClick : undefined}
              >
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoCat || "NA.png"}`}
                  alt={catData.title || "Nueva categoría"}
                />
                <figcaption>
                  <FaImage /> {getID ? "Cambiar imagen" : "Crea primero la categoría"}
                </figcaption>
              </figure>

              <input
                type="file"
                id="fileSelector"
                style={{ display: "none" }}
                onChange={handlePictureChange}
              />

              <div className="create-category-status-card">
                <div className="create-category-status-row">
                  <span>Activa</span>
                  <Switch checked={catData.active} onChange={handleActiveChange} />
                </div>
                {getID && <p>Categoría creada con ID {getID}</p>}
              </div>
            </aside>

            <div className="create-category-form-panel">
              <section className="create-category-section">
                <div className="create-category-section-title">
                  <FaTags />
                  <h2>Información de categoría</h2>
                </div>

                <div className="create-category-grid">
                  <label className="create-category-field" htmlFor="category">
                    <span>Nombre categoría</span>
                    <input
                      type="text"
                      id="category"
                      name="category"
                      value={catData.title}
                      onChange={(e) => {
                        setCatData({ ...catData, title: e.target.value });
                      }}
                    />
                  </label>

                  <label className="create-category-field" htmlFor="description">
                    <span>Descripción categoría</span>
                    <textarea
                      id="description"
                      name="description"
                      rows="7"
                      value={catData.description}
                      onChange={(e) => {
                        setCatData({ ...catData, description: e.target.value });
                      }}
                    />
                  </label>
                </div>
              </section>

              <div className="create-form-actions">
                {!getID ? (
                  <button type="submit" className="create-category-submit" disabled={loading}>
                    <FaPlus /> {loading ? "Creando..." : "Crear categoría"}
                  </button>
                ) : (
                  <button
                    type="button"
                    className="create-category-submit"
                    onClick={() => navigate("/dashboard/adminCategory")}
                  >
                    <FaSave /> Finalizar
                  </button>
                )}
                <button
                  type="button"
                  className="create-category-secondary"
                  onClick={() => navigate("/dashboard/adminCategory")}
                >
                  <FaArrowLeft /> Volver
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
