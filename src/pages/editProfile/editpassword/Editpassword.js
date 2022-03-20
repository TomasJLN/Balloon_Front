import { useState, useEffect, useContext } from "react";
import { TokenContext } from "../../../contexts/TokenContext";
import { UserContext } from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import fetcher from "../../../helpers/fetcher";
import { toast } from "react-toastify";
import "./editpassword.css";

const Editpassword = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

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
  }, [error, setError]);

  useEffect(() => {
    result && toast.success(result);
    setResult(null);
  }, [result, setResult]);

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <form className="generalForm" onSubmit={handlepassword}>
          <h2>Cambiar mis datos</h2>
          <label className="generalLabel" htmlFor="name">
            Nombre:
          </label>
          <input
            className="generalInput"
            type="text"
            id="name"
            name="name"
            value={usuario.name}
            onChange={(e) => setUsuario({ ...usuario, name: e.target.value })}
          ></input>
          <label className="generalLabel" htmlFor="surname">
            Apellidos:
          </label>
          <input
            className="generalInput"
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={(e) =>
              setUsuario({ ...usuario, surname: e.target.value })
            }
          ></input>
          <label className="generalLabel" htmlFor="password">
            Contraseña actual:
          </label>
          <input
            className="generalInput"
            type="password"
            id="password"
            name="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <label className="generalLabel" htmlFor="newpassword">
            Nueva contraseña:
          </label>
          <input
            className="generalInput"
            type="password"
            id="newpassword"
            name="newpassword"
            value={newPassword}
            autoComplete="off"
            onChange={(e) => setNewPassword(e.target.value)}
          ></input>

          <button className="generalButton" type="submit">
            Guardar
          </button>
        </form>
      )}
    </>
  );
};

export default Editpassword;
