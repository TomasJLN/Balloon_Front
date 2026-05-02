import Switch from "@mui/material/Switch";
import { formatDate } from "../../helpers/formatDate";
import DatePicker from "react-multi-date-picker";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaEuroSign,
  FaImage,
  FaMapMarkerAlt,
  FaSave,
  FaStar,
  FaTags,
  FaUsers,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import fetcher from "../../helpers/fetcher";
import { fileUpload } from "../../helpers/fileUpload";
import { useEditExperience } from "../../hooks/useEditExperience";
import { useGetCategories } from "../../hooks/useGetCategories";
import "./edit-experience.css";

export const EditExperience = () => {
  const [expData, setExpData] = useState({
    id: "",
    idCategory: "",
    title: "",
    description: "",
    price: "",
    location: "",
    coords: "",
    startDate: "",
    endDate: "",
    active: false,
    featured: false,
    totalPlaces: "",
    conditions: "",
    normatives: "",
  });

  const { categories } = useGetCategories();

  const [photoExp, setPhotoExp] = useState(null);
  const [result, setResult] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token] = useContext(TokenContext);
  const [usuario] = useContext(UserContext);
  const isViewer = usuario?.role === "viewer";
  const navigate = useNavigate();
  const { id } = useParams();

  const { experience } = useEditExperience(id, token);

  useEffect(() => {
    if (Object.keys(experience).length > 0) {
      setExpData({
        ...expData,
        idCategory: experience?.idCategory,
        title: experience?.title,
        description: experience?.description,
        price: experience?.price,
        location: experience?.location,
        coords: experience?.coords,
        startDate: formatDate(experience?.startDate, "yyyy-MM-dd"),
        endDate: formatDate(experience?.endDate, "yyyy-MM-dd"),
        active: experience?.active === 1 ? true : false,
        featured: experience?.featured === 1 ? true : false,
        totalPlaces: experience?.totalPlaces,
        conditions: experience?.conditions,
        normatives: experience?.normatives,
      });
      setPhotoExp(
        experience?.photo &&
          `${process.env.REACT_APP_BACKEND_URL}/uploads/${experience.photo}`
          ? experience.photo
          : null
      );
    }
  }, [experience]);

  const handleActiveChange = (e) => {
    setExpData({ ...expData, active: e.target.checked });
  };
  const handleFeaturedChange = (e) => {
    setExpData({ ...expData, featured: e.target.checked });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    fetcher(setResult, setError, setLoading, `experience/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...expData,
        active: expData.active ? "1" : "0",
      }),
    });
  };

  useEffect(() => {
    result !== "" && toast.success(result);
  }, [result]);

  const handlePictureChange = async (e) => {
    setLoading(true);
    setError(null);
    const file = e.target.files[0];
    const url = `${process.env.REACT_APP_BACKEND_URL}/experience/${id}/photo`;
    const key = "photo";
    if (file) {
      const resp = await fileUpload(url, key, setError, file, token);
      setPhotoExp(resp.data);
    }
    setLoading(false);
  };

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  useEffect(() => {
    photoExp && !error && setExpData({ ...expData });
    error && toast.error(error.message);
  }, [setPhotoExp, photoExp, error, setExpData]);

  useEffect(() => {
    result.includes("Experiencia actualizada") &&
      navigate("/dashboard/adminExperience");
  }, [result, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="edit-experience-page">
      {error && <div className="edit-experience-error">{String(error?.message || error)}</div>}

      <div className="edit-experience-container">
        <header className="edit-experience-header">
          <div>
            <p className="edit-experience-kicker">
              {isViewer ? "Vista de solo lectura" : "Panel de administración"}
            </p>
            <h1 onClick={() => navigate(`/dashboard`)}>
              {isViewer ? "Ver experiencia" : "Editar experiencia"}
            </h1>
          </div>
          <button
            type="button"
            className="edit-experience-back"
            onClick={() => navigate("/dashboard/adminExperience")}
          >
            <FaArrowLeft /> Volver
          </button>
        </header>

        <form className="edit-experience-layout" onSubmit={handleUpdateCategory}>
          <aside className="edit-experience-side">
            <figure className="edit-experience-photo" onClick={isViewer ? undefined : handlePictureClick}>
              {photoExp ? (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoExp}`}
                  alt={expData.title}
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
                  alt={expData.title}
                />
              )}
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

            <div className="edit-experience-status-card">
              <div className="edit-experience-status-row">
                <span>Activa</span>
                <Switch checked={expData.active} onChange={handleActiveChange} disabled={isViewer} />
              </div>
              <div className="edit-experience-status-row">
                <span>
                  <FaStar /> Destacada
                </span>
                <Switch checked={expData.featured} onChange={handleFeaturedChange} disabled={isViewer} />
              </div>
            </div>
          </aside>

          <div className="edit-experience-form-panel">
            <section className="edit-experience-section">
              <div className="edit-experience-section-title">
                <FaTags />
                <h2>Información principal</h2>
              </div>

              <div className="edit-experience-grid">
                <label className="edit-field edit-field-full" htmlFor="edit-exp-name">
                  <span>Nombre de la experiencia</span>
                  <input
                    type="text"
                    id="edit-exp-name"
                    name="experience"
                    value={expData.title}
                    onChange={(e) => {
                      setExpData({ ...expData, title: e.target.value });
                    }}
                    disabled={isViewer}
                  />
                </label>

                <label className="edit-field" htmlFor="id-cat-exp">
                  <span>Categoría</span>
                  <select
                    name="categorias"
                    id="id-cat-exp"
                    value={expData.idCategory || ""}
                    onChange={(e) => {
                      setExpData({ ...expData, idCategory: e.target.value });
                    }}
                    disabled={isViewer}
                  >
                    <option value="">Selecciona categoría</option>
                    {categories.map((cat) => (
                      <option value={cat.id} key={cat.id}>
                        {cat.title}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="edit-field" htmlFor="edit-price-exp">
                  <span>
                    <FaEuroSign /> Precio
                  </span>
                  <input
                    type="text"
                    id="edit-price-exp"
                    name="price"
                    value={expData.price}
                    onChange={(e) => {
                      setExpData({ ...expData, price: e.target.value });
                    }}
                    disabled={isViewer}
                  />
                </label>

                <label className="edit-field" htmlFor="edit-places-exp">
                  <span>
                    <FaUsers /> Plazas por día
                  </span>
                  <input
                    type="text"
                    name="totalPlaces"
                    id="edit-places-exp"
                    value={expData.totalPlaces}
                    onChange={(e) => {
                      setExpData({ ...expData, totalPlaces: e.target.value });
                    }}
                    disabled={isViewer}
                  />
                </label>

                <label className="edit-field edit-field-full" htmlFor="edit-exp-description">
                  <span>Descripción</span>
                  <textarea
                    id="edit-exp-description"
                    name="description"
                    rows="5"
                    value={expData.description}
                    onChange={(e) => {
                      setExpData({ ...expData, description: e.target.value });
                    }}
                    disabled={isViewer}
                  />
                </label>
              </div>
            </section>

            <section className="edit-experience-section">
              <div className="edit-experience-section-title">
                <FaMapMarkerAlt />
                <h2>Ubicación y fechas</h2>
              </div>

              <div className="edit-experience-grid">
                <label className="edit-field" htmlFor="edit-location-exp">
                  <span>Lugar</span>
                  <input
                    type="text"
                    id="edit-location-exp"
                    name="location"
                    value={expData.location}
                    onChange={(e) => {
                      setExpData({ ...expData, location: e.target.value });
                    }}
                    disabled={isViewer}
                  />
                </label>

                <label className="edit-field" htmlFor="edit-coords-exp">
                  <span>Coordenadas</span>
                  <input
                    type="text"
                    id="edit-coords-exp"
                    name="coords"
                    value={expData.coords}
                    onChange={(e) => {
                      setExpData({ ...expData, coords: e.target.value });
                    }}
                    disabled={isViewer}
                  />
                </label>

                <label className="edit-field" htmlFor="fechainicio">
                  <span>
                    <FaCalendarAlt /> Fecha inicio
                  </span>
                  <DatePicker
                    id="fechainicio"
                    value={expData?.startDate}
                    onChange={(e) => {
                      setExpData({ ...expData, startDate: e.format() });
                    }}
                    editable={false}
                    disabled={isViewer}
                  />
                </label>

                <label className="edit-field" htmlFor="fechafin">
                  <span>
                    <FaCalendarAlt /> Fecha final
                  </span>
                  <DatePicker
                    id="fechafin"
                    value={expData?.endDate}
                    onChange={(e) => {
                      setExpData({ ...expData, endDate: e.format() });
                    }}
                    editable={false}
                    disabled={isViewer}
                  />
                </label>
              </div>
            </section>

            <section className="edit-experience-section">
              <div className="edit-experience-section-title">
                <FaImage />
                <h2>Condiciones y normativas</h2>
              </div>

              <div className="edit-experience-grid">
                <label className="edit-field edit-field-full" htmlFor="edit-conditions-exp">
                  <span>Condiciones</span>
                  <textarea
                    id="edit-conditions-exp"
                    name="condiciones"
                    rows="4"
                    value={expData.conditions}
                    onChange={(e) => {
                      setExpData({ ...expData, conditions: e.target.value });
                    }}
                    disabled={isViewer}
                  />
                </label>

                <label className="edit-field edit-field-full" htmlFor="edit-normatives-exp">
                  <span>Normativas</span>
                  <textarea
                    id="edit-normatives-exp"
                    name="normatives"
                    rows="4"
                    value={expData.normatives}
                    onChange={(e) => {
                      setExpData({ ...expData, normatives: e.target.value });
                    }}
                    disabled={isViewer}
                  />
                </label>
              </div>
            </section>

            <div className="edit-form-actions">
              {!isViewer && (
                <button type="submit" className="edit-experience-submit" disabled={loading}>
                  <FaSave /> {loading ? "Actualizando..." : "Actualizar"}
                </button>
              )}
              <button
                type="button"
                className="edit-experience-secondary"
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
