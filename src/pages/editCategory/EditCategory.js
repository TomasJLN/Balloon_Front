import { useContext, useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { TokenContext } from '../../contexts/TokenContext';
import { useNavigate, useParams } from 'react-router-dom';
import { useAdminCat } from '../../hooks/useAdminCat';
import fetcher from '../../helpers/fetcher';
import { fileUpload } from '../../helpers/fileUpload';
import './edit-category.css';

export const EditCategory = () => {
  const [nameCategory, setNameCategory] = useState('');
  const [descriptionCategory, setDescriptionCategory] = useState('');
  const [activeCat, setActiveCat] = useState(false);
  const [photoCat, setPhotoCat] = useState(null);
  const [result, setResult] = useState('null');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();
  const { id } = useParams();

  console.log('param de la categoria ', id);
  const { cat } = useAdminCat(id, token);

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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        title: nameCategory,
        description: descriptionCategory,
        active: activeCat ? '1' : '0',
      }),
    });
  };

  const handlePictureChange = async (e) => {
    setLoading(true);
    setError(null);
    const file = e.target.files[0];
    const url = `${process.env.REACT_APP_BACKEND_URL}/category/${id}/photo`;
    const key = 'photo';
    if (file) {
      const resp = await fileUpload(url, key, setError, file, token);
      setPhotoCat(resp.data);
    }
    setLoading(false);
  };

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  };

  useEffect(() => {
    console.log('photoCat -> ', photoCat, !error);
    photoCat && !error && setNameCategory(cat.title);
    error && alert(error.message);
  }, [setPhotoCat, photoCat, error, cat.title]);

  useEffect(() => {
    result.includes('Categoría actualizada') &&
      navigate('/dashboard/adminCategory');
  }, [result, navigate]);

  return (
    <>
      <section>
        {error && <h1>{error}</h1>}
        <div className="title-back">
          <h1 className="title">Editar CATEGORIA</h1>
          <div className="back-div">
            <button
              className="btn-back"
              onClick={() => {
                navigate(-1);
              }}
            >
              ↩️ back
            </button>
          </div>
        </div>
        <br />

        <hr />
        <form onSubmit={handleUpdateCategory} className="edit-cat-form">
          <div id="edit-cat-title">
            <input
              type="text"
              id="edit-cat-name"
              name="category"
              value={nameCategory}
              onChange={(e) => {
                setNameCategory(e.target.value);
              }}
              placeholder="Nombre categoría"
            />
            <div className="edit-sect-activar">
              <p>Activar</p>
              <Switch checked={activeCat} onChange={handleActiveChange} />
            </div>
          </div>
          <div id="edit-cat-description">
            <textarea
              type="text"
              name="description"
              value={descriptionCategory}
              onChange={(e) => {
                setDescriptionCategory(e.target.value);
              }}
              placeholder="Descripcion categoría"
            />
          </div>

          <br />
          {!error && <p className="title-center">Imagen de la categoría</p>}

          <figure className="photo-figure-category">
            {photoCat ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoCat}`}
                alt={cat.title}
                className="photo-category"
                onClick={handlePictureClick}
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
                alt={cat.title}
                onClick={handlePictureClick}
                className="photo-category"
              />
            )}
          </figure>

          <input
            type="file"
            id="fileSelector"
            style={{ display: 'none' }}
            onChange={handlePictureChange}
          />
          <button type="submit" className="btn-update-category">
            Actualizar Categoría
          </button>
        </form>
      </section>
    </>
  );
};
