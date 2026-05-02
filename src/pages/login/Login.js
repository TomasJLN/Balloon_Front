import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import fetcher from "../../helpers/fetcher";
import { Popup } from "../../components/popup/Popup";
import "../../components/register/register.css";
import "./login.css";
import { PopupRegisterOk } from "../../components/popupRegisterOk/PopupRegisterOk";
import { FaLock, FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Login = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [registerOk, setRegisterOk] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const q = location.search;

  useEffect(() => {
    q.includes("register=ok") ? setRegisterOk(true) : setRegisterOk(false);
    return () => {
      setRegisterOk(false);
    };
  }, [q]);

  useEffect(() => {
    token && !error && (usuario.role === "admin" || usuario.role === "viewer") && navigate("/dashboard");
    token && !error && usuario.role === "user" && navigate(-1);
    return () => {
      setError(null);
    };
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {loading ? (
        <section className="auth-page">
          <p className="auth-loading">Cargando...</p>
        </section>
      ) : (
        <section className="auth-page">
          {registerOk && <PopupRegisterOk setRegisterOk={setRegisterOk} />}
          <form onSubmit={handleLogin} className="auth-card">
            <p className="auth-kicker">Acceso privado</p>
            <h1>Log in</h1>

            <label className="auth-field" htmlFor="email-login">
              <span>Email</span>
              <input
                type="text"
                id="email-login"
                value={email}
                name="email-login"
                size="40"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onFocus={() => setEmail("")}
              />
            </label>

            <label className="auth-field" htmlFor="contrasena-login">
              <span>
                <FaLock /> Contraseña
              </span>
              <input
                type="password"
                id="contrasena-login"
                value={password}
                name="password-login"
                size="40"
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onFocus={() => {
                  setPassword("");
                }}
              />
            </label>

            <button type="submit" value="Login" className="auth-submit">
              <FaSignInAlt />
              Login
            </button>

            <div className="auth-links">
              <Link to="/register" className="login-links">
                <FaUserPlus /> Crear una cuenta
              </Link>
              <button
                type="button"
                className="password-recovery-link"
                onClick={() => setShowPopup(true)}
              >
                Recuperar contraseña
              </button>
            </div>
          </form>
          {showPopup && <Popup setShowPopup={setShowPopup} />}
        </section>
      )}
    </>
  );
};

export default Login;
