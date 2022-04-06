import Switch from "@mui/material/Switch";
import moment from "moment";
import DatePicker from "react-multi-date-picker";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import { useNavigate, useParams } from "react-router-dom";
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
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useContext(TokenContext);
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
        startDate: moment(experience?.startDate).format("YYYY-MM-DD"),
        endDate: moment(experience?.endDate).format("YYYY-MM-DD"),
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
    <section className="form-wrapper">
      {error && <h1>{error}</h1>}
      <h1 id="create-title" onClick={() => navigate(`/dashboard`)}>
        Editar Experiencia
      </h1>

      <form className="generalForm" onSubmit={handleUpdateCategory}>
        <label htmlFor="id-cat-exp">Categoría: </label>
        <select
          name="categorias"
          id="id-cat-exp"
          onChange={(e) => {
            setExpData({ ...expData, idCategory: e.target.value });
          }}
        >
          {categories.map((cat) => {
            return cat.id === expData.idCategory ? (
              <option selected value={cat.id} key={cat.id}>
                {cat.title}
              </option>
            ) : (
              <option value={cat.id} key={cat.id}>
                {cat.title}
              </option>
            );
          })}
        </select>
        <div className="edit-sect-activar">
          <p>Activar</p>
          <Switch checked={expData.active} onChange={handleActiveChange} />
          <p>Destacar</p>
          <Switch checked={expData.featured} onChange={handleFeaturedChange} />
        </div>
        <label className="generalLabel" htmlFor="edit-exp-name">
          Nombre de la experiencia:{" "}
        </label>
        <input
          className="generalInput"
          type="text"
          id="edit-exp-name"
          name="experience"
          value={expData.title}
          onChange={(e) => {
            setExpData({ ...expData, title: e.target.value });
          }}
        />
        <label className="generalLabel" htmlFor="edit-exp-description">
          Descripción de la experiencia:{" "}
        </label>
        <textarea
          className="generalTextarea"
          type="text"
          id="edit-exp-description"
          name="description"
          value={expData.description}
          onChange={(e) => {
            setExpData({ ...expData, description: e.target.value });
          }}
        />
        <label className="generalLabel" htmlFor="price">
          Precio de la experiencia:{" "}
        </label>
        <input
          className="generalInput"
          type="text"
          id="edit-price-exp"
          name="price"
          value={expData.price}
          onChange={(e) => {
            setExpData({ ...expData, price: e.target.value });
          }}
        />
        <label className="generalLabel" htmlFor="edit-places-exp">
          Plazas por día:{" "}
        </label>
        <input
          className="generalInput"
          type="text"
          name="totalPlaces"
          id="edit-places-exp"
          value={expData.totalPlaces}
          onChange={(e) => {
            setExpData({ ...expData, totalPlaces: e.target.value });
          }}
          placeholder="Plazas por día"
        />
        <label className="generalLabel" htmlFor="edit-location-exp">
          Lugar de la experiencia:{" "}
        </label>
        <input
          className="generalInput"
          type="text"
          id="edit-location-exp"
          name="location"
          value={expData.location}
          onChange={(e) => {
            setExpData({ ...expData, location: e.target.value });
          }}
        />
        <label className="generalLabel" htmlFor="edit-coords-exp">
          Coordenadas:{" "}
        </label>
        <input
          className="generalInput"
          type="text"
          id="edit-coords-exp"
          name="coords"
          value={expData.coords}
          onChange={(e) => {
            setExpData({ ...expData, coords: e.target.value });
          }}
        />
        <label className="generalLabel" htmlFor="fechainicio">
          Fecha Inicio:{" "}
        </label>
        <DatePicker
          id="fechainicio"
          value={expData?.startDate}
          onChange={(e) => {
            setExpData({ ...expData, startDate: e.format() });
          }}
          editable={false}
        />
        <label className="generalLabel" htmlFor="fechafin">
          Fecha Final:{" "}
        </label>
        <DatePicker
          id="date"
          value={expData?.endDate}
          onChange={(e) => {
            setExpData({ ...expData, endDate: e.format() });
          }}
          editable={false}
        />
        <label className="generalLabel" htmlFor="edit-conditions-exp">
          Condiciones:{" "}
        </label>
        <textarea
          className="generalTextarea"
          type="text"
          id="edit-conditions-exp"
          name="condiciones"
          value={expData.conditions}
          onChange={(e) => {
            setExpData({ ...expData, conditions: e.target.value });
          }}
        />
        <label className="generalLabel" htmlFor="edit-normatives-exp">
          Normativas:{" "}
        </label>
        <textarea
          className="generalTextarea"
          type="text"
          id="edit-normatives-exp"
          name="normatives"
          value={expData.normatives}
          onChange={(e) => {
            setExpData({ ...expData, normatives: e.target.value });
          }}
        />
        <div className="input-text-field"></div>

        {!error && <p className="title-center">Imagen de la categoría</p>}

        <figure className="photo-figure-category">
          {photoExp ? (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoExp}`}
              alt={expData.title}
              className="generalPhoto"
              onClick={handlePictureClick}
            />
          ) : (
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
              alt={expData.title}
              onClick={handlePictureClick}
              className="generalPhoto"
            />
          )}
        </figure>
        <input
          type="file"
          id="fileSelector"
          style={{ display: "none" }}
          onChange={handlePictureChange}
        />
        <div className="btn-update-exp">
          <button type="submit" className="generalButton">
            Actualizar
          </button>
        </div>
      </form>
    </section>
  );
};
