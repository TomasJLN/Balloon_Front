import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import { VscAccount } from "react-icons/vsc";
import fetcher from "../../helpers/fetcher";
import { Popup } from "../../components/popup/Popup";

import "./login.css";
import { PopupRegisterOk } from "../../components/popupRegisterOk/PopupRegisterOk";

const Login = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [registerOk, setRegisterOk] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const q = location.search;

  let query = q;

  useEffect(() => {
    query.includes("register=ok") ? setRegisterOk(true) : setRegisterOk(false);
    return () => {
      setRegisterOk(false);
    };
  }, []);

  useEffect(() => {
    token && !error && usuario.role === "admin" && navigate("/dashboard");
    token && !error && usuario.role === "user" && navigate(-1);
  }, [token, error, navigate, usuario.role]);

  useEffect(() => {
    error && toast.error(error);
    return () => {
      setError(null);
    };
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    await fetcher(setToken, setError, setLoading, "user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <>
      {loading ? (
        <h1>Cargando...</h1>
      ) : (
        <div>
          {registerOk && <PopupRegisterOk setRegisterOk={setRegisterOk} />}
          <form onSubmit={handleLogin} className="generalForm">
            <VscAccount size="5rem" />
            <div>
              <label htmlFor="email-login">Email</label>
              <input
                className="generalInput"
                type="text"
                id="email-login"
                value={email}
                name="email-login"
                placeholder="email"
                size="40"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onFocus={() => setEmail("")}
              />
            </div>
            <div>
              <label htmlFor="contrasena-login">Contraseña</label>
              <input
                className="generalInput"
                type="password"
                id="contrasena-login"
                value={password}
                name="password-login"
                size="40"
                autoComplete="off"
                placeholder="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={() => {
                  setPassword("");
                }}
              />
            </div>
            <button type="submit" value="Login" className="generalButton">
              Login
            </button>
          </form>
          <div className="link-to">
            <Link to="/register">Crear una cuenta</Link>
          </div>
          <div className="link-to">
            <p onClick={() => setShowPopup(true)}>Recuperar contraseña</p>
          </div>
          {showPopup && <Popup setShowPopup={setShowPopup} />}
        </div>
      )}
    </>
  );
};

export default Login;
