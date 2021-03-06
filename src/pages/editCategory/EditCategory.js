import { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { TokenContext } from "../../contexts/TokenContext";
import { useNavigate, useParams } from "react-router-dom";
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
  const [token, setToken] = useContext(TokenContext);
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
    result.includes("Categor??a actualizada") &&
      navigate("/dashboard/adminCategory");
  }, [result, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <section className="form-wrapper">
          <h1 id="create-title" onClick={() => navigate(`/dashboard`)}>
            Editar Categor??a
          </h1>
          {error && <h1>{error}</h1>}

          <form onSubmit={handleUpdateCategory} className="generalForm">
            <div className="edit-sect-activar">
              <p>Activar</p>
              <Switch checked={activeCat} onChange={handleActiveChange} />
            </div>
            <label className="generalLabel" htmlFor="edit-cat-name">
              Nombre categor??a:{" "}
            </label>
            <input
              className="generalInput"
              type="text"
              id="edit-cat-name"
              name="category"
              value={nameCategory}
              onChange={(e) => {
                setNameCategory(e.target.value);
              }}
              placeholder="Nombre categor??a"
            />
            <label className="generalLabel" htmlFor="edit-cat-name">
              Descripci??n categor??a:{" "}
            </label>
            <textarea
              className="generalTextarea"
              rows="6"
              type="text"
              name="description"
              value={descriptionCategory}
              onChange={(e) => {
                setDescriptionCategory(e.target.value);
              }}
              placeholder="Descripcion categor??a"
            />

            {!error && <p className="title-center">Imagen de la categor??a</p>}

            <div className="photo-figure-category">
              {photoCat ? (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoCat}`}
                  alt={cat.title}
                  className="generalPhoto"
                  onClick={handlePictureClick}
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
                  alt={cat.title}
                  onClick={handlePictureClick}
                  className="generalPhoto"
                />
              )}
            </div>

            <input
              className="generalInput"
              type="file"
              id="fileSelector"
              style={{ display: "none" }}
              onChange={handlePictureChange}
            />
            <div>
              <button type="submit" className="generalButton">
                Actualizar
              </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
};
