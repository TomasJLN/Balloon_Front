import { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { TokenContext } from "../../../contexts/TokenContext";
import { UserContext } from "../../../contexts/UserContext";
import { fileUpload } from "../../../helpers/fileUpload";
import "./editavatar.css";

const Editavatar = () => {
  const [token, setToken] = useContext(TokenContext);
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
      setNewAvatar(resp.data);
    }
    setLoading(false);
  };

  const handlePictureClick = () => {
    document.querySelector("#file-selector").click();
  };

  useEffect(() => {
    newAvatar && !error && setUsuario({ ...usuario, avatar: newAvatar });
    error && toast.error(error.message);
  }, [setNewAvatar, newAvatar, error]);

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <section className="generalForm">
          <h2>Cambiar mi foto</h2>
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${imagenAvatar}`}
            alt={usuario.avatar}
            onClick={handlePictureClick}
            style={{ borderRadius: "50%", cursor: "pointer" }}
          />
          <p className="title-center">Pulsa en la imagen para cambiarla</p>
          <input
            type="file"
            id="file-selector"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
        </section>
      )}
    </>
  );
};
export default Editavatar;
