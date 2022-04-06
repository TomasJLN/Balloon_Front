import { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import fetcher from "../../helpers/fetcher";
import { TokenContext } from "../../contexts/TokenContext";
import { Link, useNavigate } from "react-router-dom";
import { fileUpload } from "../../helpers/fileUpload";
import { toast } from "react-toastify";
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
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useContext(TokenContext);
  const [created, setCreated] = useState(false);
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
  //
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
      }
    }
    setLoading(false);
    navigate(-1);
  };

  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };

  useEffect(() => {
    photoCat && !error && setCatData({ ...catData });
    error && toast.error(error.message);
  }, [setPhotoCat, photoCat, error, setCatData]);

  useEffect(() => {
    result && setGetID(result);
  }, [result, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //

  return (
    <>
      <section className="form-wrapper">
        <h1 id="create-title" onClick={() => navigate(`/dashboard`)}>
          Crear categoría
        </h1>

        {getID && <h1>Categoria creada: {getID}</h1>}
        {error && <h1 style={{ color: "red" }}>{error}</h1>}

        <form className="generalForm" onSubmit={newCategory}>
          <input
            className="generalInput"
            type="text"
            id="category"
            name="category"
            value={catData.title}
            onChange={(e) => {
              setCatData({ ...catData, title: e.target.value });
            }}
            placeholder="Nombre categoría"
          />
          <textarea
            className="generalTextarea"
            type="text"
            id="description"
            name="description"
            onChange={(e) => {
              setCatData({ ...catData, description: e.target.value });
            }}
            placeholder="Descripcion categoría"
          />
          <h3>Activar</h3>
          <Switch checked={catData.activeCat} onChange={handleActiveChange} />
          <br />
          {!error && getID && (
            <div>
              <p className="title-center">Imagen de la Categoría</p>

              <figure className="photo-figure-category">
                {photoCat ? (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoCat}`}
                    alt={catData.title}
                    className="photo-experience"
                    onClick={handlePictureClick}
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
                    alt={catData.title}
                    onClick={handlePictureClick}
                    className="photo-experience"
                  />
                )}
              </figure>

              <input
                type="file"
                id="fileSelector"
                style={{ display: "none" }}
                onChange={handlePictureChange}
              />
            </div>
          )}
          {!getID && (
            <button type="submit" className="generalButton">
              Crear Experiencia
            </button>
          )}
          {getID && (
            <Link to="/dashboard">
              <button className="generalButton">Volver a Dashboard</button>
            </Link>
          )}
        </form>
      </section>
    </>
  );
};
