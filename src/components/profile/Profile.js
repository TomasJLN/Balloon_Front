import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { TokenContext } from '../../contexts/TokenContext';
import { UserContext } from '../../contexts/UserContext';
import { fileUpload } from '../../helpers/fileUpload';
import './profile.css';

export const Profile = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [newAvatar, setNewAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { avatar } = usuario;

  let imagenAvatar = `NA.png`;
  avatar ? (imagenAvatar = avatar) : (imagenAvatar = `NA.png`);

  const handlePictureChange = async (e) => {
    setLoading(true);
    setError(null);
    const file = e.target.files[0];
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/avatar`;
    if (file) {
      const resp = await fileUpload(url, setError, file, token);
      setNewAvatar(resp.data);
    }
    setLoading(false);
  };

  const handlePictureClick = () => {
    document.querySelector('#fileSelector').click();
  };

  useEffect(() => {
    newAvatar && !error && setUsuario({ ...usuario, avatar: newAvatar });
    error && alert(error.message);
  }, [setNewAvatar, newAvatar, avatar, error]);

  return (
    <>
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <div>
          <h1 className="title-center">Perfil de {usuario?.name}</h1>
          <hr />
          <form className="profile-form">
            <div>
              <p className="registry-field">Nombre: {usuario?.name}</p>
              <p className="registry-field">Apellidos: {usuario?.surname}</p>
              <p className="registry-field">Email: {usuario?.email}</p>
              <p className="registry-field">Tipo usuario: {usuario?.role}</p>
              <hr />
              <figure>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${imagenAvatar}`}
                  alt={usuario.avatar}
                  className="select-avatar"
                  onClick={handlePictureClick}
                />
                <figcaption className="figcaption-text">
                  Pulsa en la imagen para cambiarla
                </figcaption>
              </figure>
              <input
                type="file"
                id="fileSelector"
                style={{ display: 'none' }}
                onChange={handlePictureChange}
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};
