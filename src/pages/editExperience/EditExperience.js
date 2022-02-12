import { useContext, useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';
import { TokenContext } from '../../contexts/TokenContext';
import { useNavigate, useParams } from 'react-router-dom';
import fetcher from '../../helpers/fetcher';
import { fileUpload } from '../../helpers/fileUpload';
import { useEditExperience } from '../../hooks/useEditExperience';
import './edit-experience.css';
import moment from 'moment';

export const EditExperience = () => {
  const [expData, setExpData] = useState({
    idCategory: '',
    title: '',
    description: '',
    price: '',
    location: '',
    coords: '',
    startDate: '',
    endDate: '',
    active: false,
    featured: false,
    totalPlaces: '',
    conditions: '',
    normatives: '',
  });
  const [photoExp, setPhotoExp] = useState(null);
  const [result, setResult] = useState('null');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useContext(TokenContext);
  const navigate = useNavigate();
  const { ID } = useParams();

  const { experience } = useEditExperience(ID, token);

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
        startDate: moment(experience?.startDate).format('YYYY-MM-DD'),
        endDate: moment(experience?.endDate).format('YYYY-MM-DD'),
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

  console.log(expData.active);

  const handleActiveChange = (e) => {
    setExpData({ ...expData, active: e.target.checked });
  };
  const handleFeaturedChange = (e) => {
    setExpData({ ...expData, featured: e.target.checked });
  };

  const handleUpdateCategory = (e) => {
    e.preventDefault();
    fetcher(setResult, setError, setLoading, `experience/${ID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        ...expData,
        active: expData.active ? '1' : '0',
      }),
    });
  };

  const handlePictureChange = async (e) => {
    setLoading(true);
    setError(null);
    const file = e.target.files[0];
    const url = `${process.env.REACT_APP_BACKEND_URL}/experience/${ID}/photo`;
    const key = 'photo';
    if (file) {
      const resp = await fileUpload(url, key, setError, file, token);
      setPhotoExp(resp.data);
    }
    setLoading(false);
  };

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  };

  useEffect(() => {
    console.log('photoExp -> ', photoExp, !error);
    photoExp && !error && setExpData({ ...expData });
    error && alert(error.message);
  }, [setPhotoExp, photoExp, error, setExpData]);

  useEffect(() => {
    result.includes('Experiencia actualizada') &&
      navigate('/dashboard/adminExperience');
  }, [result, navigate]);

  return (
    <>
      <section>
        {error && <h1>{error}</h1>}
        <div className="title-back">
          <h1 className="title">Editar Experiencia</h1>
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
          <div id="edit-exp-title">
            <textarea
              type="text"
              id="edit-exp-name"
              name="experience"
              value={expData.title}
              onChange={(e) => {
                setExpData({ ...expData, title: e.target.value });
              }}
              placeholder="Nombre categoría"
            />
            <div className="edit-sect-activar">
              <p>Activar</p>
              <Switch checked={expData.active} onChange={handleActiveChange} />
              <p>Destacado</p>
              <Switch
                checked={expData.featured}
                onChange={handleFeaturedChange}
              />
            </div>
          </div>
          <div id="edit-exp-description">
            <textarea
              type="text"
              name="description"
              value={expData.title}
              onChange={(e) => {
                setExpData({ ...expData, description: e.target.value });
              }}
              placeholder="Descripción de la experiencia"
            />
          </div>
          <div>
            <input
              type="text"
              name="price"
              value={expData.price}
              onChange={(e) => {
                setExpData({ ...expData, price: e.target.value });
              }}
              placeholder="Precio de la experiencia"
            />
          </div>
          <div>
            <input
              type="text"
              name="starDate"
              value={expData.startDate}
              onChange={(e) => {
                setExpData({ ...expData, startDate: e.target.value });
              }}
              placeholder="Fecha inicio experiencia"
            />
            <input
              type="text"
              name="endDate"
              value={expData.endDate}
              onChange={(e) => {
                setExpData({ ...expData, endDate: e.target.value });
              }}
              placeholder="Fecha fin experiencia"
            />
          </div>
          <div>
            <input
              type="text"
              name="location"
              value={expData.location}
              onChange={(e) => {
                setExpData({ ...expData, location: e.target.value });
              }}
              placeholder="Lugar de la experiencia"
            />
            <input
              type="text"
              name="coords"
              value={expData.coords}
              onChange={(e) => {
                setExpData({ ...expData, coords: e.target.value });
              }}
              placeholder="Fecha inicio experiencia"
            />
          </div>
          <div>
            <textarea
              type="text"
              name="condiciones"
              value={expData.conditions}
              onChange={(e) => {
                setExpData({ ...expData, conditions: e.target.value });
              }}
              placeholder="Condiciones de la experiencia"
            />
          </div>
          <div>
            <textarea
              type="text"
              name="normatives"
              value={expData.normatives}
              onChange={(e) => {
                setExpData({ ...expData, normatives: e.target.value });
              }}
              placeholder="Normativas de la experiencia"
            />
          </div>
          <br />
          {!error && <p className="title-center">Imagen de la categoría</p>}

          <figure className="photo-figure-category">
            {photoExp ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoExp}`}
                alt={expData.title}
                className="photo-experience"
                onClick={handlePictureClick}
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
                alt={expData.title}
                onClick={handlePictureClick}
                className="photo-experience"
              />
            )}
          </figure>

          <input
            type="file"
            id="fileSelector"
            style={{ display: 'none' }}
            onChange={handlePictureChange}
          />
          <button type="submit" className="btn-update-experience">
            Actualizar Experiencia
          </button>
        </form>
      </section>
    </>
  );
};
