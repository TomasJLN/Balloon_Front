import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { TokenContext } from "../../../contexts/TokenContext";
import { UserContext } from "../../../contexts/UserContext";
import { fileUpload } from "../../../helpers/fileUpload";
import { FaCamera, FaImage } from "react-icons/fa";
import "./editavatar.css";

const Editavatar = () => {
  const [token] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [newAvatar, setNewAvatar] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { avatar } = usuario;

  let imagenAvatar = "NA.png";

  avatar ? (imagenAvatar = avatar) : (imagenAvatar = "NA.png");

  const handleAvatar = async (e) => {
    setLoading(true);
    setError(null);
    e.preventDefault();
    const file = e.target.files[0];
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/avatar`;
    const key = "avatar";
    if (file) {
      const resp = await fileUpload(url, key, setError, file, token);
      if (resp?.data) setNewAvatar(resp.data);
    }
    setLoading(false);
  };

  const handlePictureClick = () => {
    document.querySelector("#file-selector").click();
  };

  useEffect(() => {
    newAvatar && !error && setUsuario((currentUser) => ({ ...currentUser, avatar: newAvatar }));
    error && toast.error(error.message);
  }, [newAvatar, error, setUsuario]);

  return (
    <>
      <section className="profile-card profile-avatar-card" id="foto">
        <div className="profile-card-title">
          <FaImage />
          <h2>Cambiar mi foto</h2>
        </div>

        {loading ? (
          <p className="profile-loading">Cargando...</p>
        ) : (
          <>
            <button type="button" className="profile-avatar-button" onClick={handlePictureClick}>
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${imagenAvatar}`}
                alt={usuario.avatar || usuario.name}
              />
              <span>
                <FaCamera /> Cambiar imagen
              </span>
            </button>
            <p>Usa una imagen clara para identificar mejor tu perfil.</p>
          </>
        )}

          <input
            type="file"
            id="file-selector"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
      </section>
    </>
  );
};
export default Editavatar;
