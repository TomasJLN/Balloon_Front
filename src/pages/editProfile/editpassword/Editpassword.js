import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../../../contexts/TokenContext";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router";
import fetcher from "../../../helpers/fetcher";
import { toast } from "react-toastify";
import { FaLock, FaSave, FaUser } from "react-icons/fa";
import "./editpassword.css";

const Editpassword = () => {
  const [token] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const { name, surname } = usuario;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate("/");
  }, [token, error, navigate]);

  const handlepassword = async (e) => {
    e.preventDefault();
    setError(null);
    const elBody =
      password !== ""
        ? JSON.stringify({ name, surname, password, newPassword })
        : JSON.stringify({ name, surname });
    await fetcher(setResult, setError, setLoading, "user/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: elBody,
    });
  };

  useEffect(() => {
    toast.error(error);
    return () => {
      setError(null);
    };
  }, [error, setError]);

  useEffect(() => {
    result && toast.success(result);
    return () => {
      setResult(null);
    };
  }, [result, setResult]);

  return (
    <>
      {loading ? (
        <section className="profile-card">
          <p className="profile-loading">Cargando...</p>
        </section>
      ) : (
        <form id="datos" className="profile-card profile-data-form" onSubmit={handlepassword}>
          <div className="profile-card-title">
            <FaUser />
            <h2>Cambiar mis datos</h2>
          </div>

          <label className="profile-field" htmlFor="name">
            <span>Nombre</span>
            <input
              type="text"
              id="name"
              name="name"
              value={usuario.name}
              onChange={(e) => setUsuario({ ...usuario, name: e.target.value })}
            />
          </label>

          <label className="profile-field" htmlFor="surname">
            <span>Apellidos</span>
            <input
              type="text"
              id="surname"
              name="surname"
              value={surname}
              onChange={(e) =>
                setUsuario({ ...usuario, surname: e.target.value })
              }
            />
          </label>

          <label className="profile-field" htmlFor="password">
            <span>
              <FaLock /> Contraseña actual
            </span>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="profile-field" htmlFor="newpassword">
            <span>
              <FaLock /> Nueva contraseña
            </span>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              value={newPassword}
              autoComplete="off"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </label>

          <button className="profile-submit" type="submit">
            <FaSave /> Guardar
          </button>
        </form>
      )}
    </>
  );
};

export default Editpassword;
