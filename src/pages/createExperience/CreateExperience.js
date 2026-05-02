import { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import fetcher from "../../helpers/fetcher";
import { TokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router";
import { fileUpload } from "../../helpers/fileUpload";
import { toast } from "react-toastify";
import { useGetCategories } from "../../hooks/useGetCategories";
import "./create-experience.css";
import DatePicker, { DateObject } from "react-multi-date-picker";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaEuroSign,
  FaImage,
  FaMapMarkerAlt,
  FaPlus,
  FaSave,
  FaStar,
  FaTags,
  FaUsers,
} from "react-icons/fa";

export const CreateExperience = () => {
  const [expData, setExpData] = useState({
    idCategory: "",
    title: "",
    description: "",
    price: "",
    location: "",
    coords: "",
    startDate: "",
    endDate: "",
    active: true,
    featured: true,
    totalPlaces: "",
    conditions: "",
    normatives: "",
  });

  const [photoExp, setPhotoExp] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token] = useContext(TokenContext);
  const [getID, setGetID] = useState("");
  const { categories } = useGetCategories();

  const navigate = useNavigate();

  const handleActiveChange = (e) => {
    setExpData({ ...expData, active: e.target.checked });
  };
  const handleFeaturedChange = (e) => {
    setExpData({ ...expData, featured: e.target.checked });
  };

  const handleNewExperience = (e) => {
    e.preventDefault();
    if (getID === "") {
      fetcher(setResult, setError, setLoading, "experience", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          ...expData,
          active: expData.active ? "1" : "0",
        }),
      });
    } else {
      toast.error("Experiencia ya creada");
    }
  };
  //
  const handlePictureChange = async (e) => {
    setLoading(true);
    setError(null);
    if (getID) {
      const file = e.target.files[0];
      const url = `${process.env.REACT_APP_BACKEND_URL}/experience/${getID}/photo`;
      const key = "photo";
      if (file) {
        const resp = await fileUpload(url, key, setError, file, token);
        setPhotoExp(resp.data);
        toast.success("Imagen actualizada");
      }
    }
    setLoading(false);
  };

  const handlePictureClick = () => {
    if (!getID) {
      toast.info("Primero crea la experiencia para poder subir una imagen");
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="create-experience-page">
      {error && <div className="create-experience-error">{String(error?.message || error)}</div>}

      <div className="create-experience-container">
        <header className="create-experience-header">
          <div>
            <p className="create-experience-kicker">Panel de administración</p>
            <h1 onClick={() => navigate(`/dashboard`)}>Crear experiencia</h1>
          </div>
          <button
            type="button"
            className="create-experience-back"
            onClick={() => navigate("/dashboard/adminExperience")}
          >
            <FaArrowLeft /> Volver
          </button>
        </header>

        <form onSubmit={handleNewExperience} className="create-experience-layout">
          <aside className="create-experience-side">
            <figure
              className={`create-experience-photo ${getID ? "" : "is-disabled"}`}
              onClick={handlePictureClick}
            >
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoExp || "NA.png"}`}
                alt={expData.title || "Nueva experiencia"}
              />
              <figcaption>
                <FaImage /> {getID ? "Cambiar imagen" : "Imagen tras crear"}
              </figcaption>
            </figure>

            <input
              type="file"
              id="fileSelector"
              style={{ display: "none" }}
              onChange={handlePictureChange}
            />

            <div className="create-experience-status-card">
              <div className="create-experience-status-row">
                <span>Activa</span>
                <Switch checked={expData.active} onChange={handleActiveChange} />
              </div>
              <div className="create-experience-status-row">
                <span>
                  <FaStar /> Destacada
                </span>
                <Switch checked={expData.featured} onChange={handleFeaturedChange} />
              </div>
              {getID && <p>Experiencia creada con ID {getID}</p>}
            </div>
          </aside>

          <div className="create-experience-form-panel">
            <section className="create-experience-section">
              <div className="create-experience-section-title">
                <FaTags />
                <h2>Información principal</h2>
              </div>

              <div className="create-experience-grid">
                <label className="create-field create-field-full" htmlFor="creat-exp-name">
                  <span>Nombre de la experiencia</span>
                  <input
                    type="text"
                    id="creat-exp-name"
                    name="experience"
                    value={expData.title}
                    onChange={(e) => {
                      setExpData({ ...expData, title: e.target.value });
                    }}
                  />
                </label>

                <label className="create-field" htmlFor="id-cat-exp">
                  <span>Categoría</span>
                  <select
                    name="id-cat-exp"
                    id="id-cat-exp"
                    value={expData.idCategory}
                    onChange={(e) =>
                      setExpData({ ...expData, idCategory: e.target.value })
                    }
                  >
                    <option value="">Selecciona categoría</option>
                    {categories.map((cat) => (
                      <option value={cat.id} key={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="create-field" htmlFor="price">
                  <span>
                    <FaEuroSign /> Precio
                  </span>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={expData.price}
                    onChange={(e) => {
                      setExpData({ ...expData, price: e.target.value });
                    }}
                  />
                </label>

                <label className="create-field" htmlFor="totalplaces">
                  <span>
                    <FaUsers /> Plazas por día
                  </span>
                  <input
                    type="text"
                    id="totalplaces"
                    name="totalPlaces"
                    value={expData.totalPlaces}
                    onChange={(e) => {
                      setExpData({ ...expData, totalPlaces: e.target.value });
                    }}
                  />
                </label>

                <label className="create-field create-field-full" htmlFor="creat-text-exp">
                  <span>Descripción</span>
                  <textarea
                    id="creat-text-exp"
                    name="description"
                    rows="5"
                    value={expData.description}
                    onChange={(e) => {
                      setExpData({ ...expData, description: e.target.value });
                    }}
                  />
                </label>
              </div>
            </section>

            <section className="create-experience-section">
              <div className="create-experience-section-title">
                <FaMapMarkerAlt />
                <h2>Ubicación y fechas</h2>
              </div>

              <div className="create-experience-grid">
                <label className="create-field" htmlFor="location">
                  <span>Lugar</span>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={expData.location}
                    onChange={(e) => {
                      setExpData({ ...expData, location: e.target.value });
                    }}
                  />
                </label>

                <label className="create-field" htmlFor="coords">
                  <span>Coordenadas</span>
                  <input
                    type="text"
                    id="coords"
                    name="coords"
                    value={expData.coords}
                    placeholder="0,0"
                    onChange={(e) => {
                      setExpData({ ...expData, coords: e.target.value });
                    }}
                  />
                </label>

                <label className="create-field" htmlFor="fechainicio">
                  <span>
                    <FaCalendarAlt /> Fecha inicio
                  </span>
                  <DatePicker
                    id="fechainicio"
                    value={expData.startDate}
                    onChange={(e) => {
                      setExpData({ ...expData, startDate: e.format() });
                    }}
                    minDate={new DateObject().add(1, "days")}
                    editable={false}
                  />
                </label>

                <label className="create-field" htmlFor="fechafin">
                  <span>
                    <FaCalendarAlt /> Fecha final
                  </span>
                  <DatePicker
                    id="fechafin"
                    value={expData.endDate}
                    onChange={(e) => setExpData({ ...expData, endDate: e.format() })}
                    editable={false}
                  />
                </label>
              </div>
            </section>

            <section className="create-experience-section">
              <div className="create-experience-section-title">
                <FaImage />
                <h2>Condiciones y normativas</h2>
              </div>

              <div className="create-experience-grid">
                <label className="create-field create-field-full" htmlFor="condiciones">
                  <span>Condiciones</span>
                  <textarea
                    id="condiciones"
                    name="condiciones"
                    rows="4"
                    value={expData.conditions}
                    onChange={(e) => {
                      setExpData({ ...expData, conditions: e.target.value });
                    }}
                  />
                </label>

                <label className="create-field create-field-full" htmlFor="normatives">
                  <span>Normativas</span>
                  <textarea
                    id="normatives"
                    name="normatives"
                    rows="4"
                    value={expData.normatives}
                    onChange={(e) => {
                      setExpData({ ...expData, normatives: e.target.value });
                    }}
                  />
                </label>
              </div>
            </section>

            <div className="create-form-actions">
              {!getID ? (
                <button type="submit" className="create-experience-submit" disabled={loading}>
                  <FaPlus /> {loading ? "Creando..." : "Crear experiencia"}
                </button>
              ) : (
                <button
                  type="button"
                  className="create-experience-submit"
                  onClick={() => navigate("/dashboard/adminExperience")}
                >
                  <FaSave /> Finalizar
                </button>
              )}
              <button
                type="button"
                className="create-experience-secondary"
                onClick={() => navigate("/dashboard/adminExperience")}
              >
                <FaArrowLeft /> Volver
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};
