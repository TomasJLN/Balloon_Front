import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import { VscAccount } from "react-icons/vsc";
import fetcher from "../../helpers/fetcher";
import { Popup } from "../../components/popup/Popup";
import "./login.css";

const Login = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    token && !error && usuario.role === "admin" && navigate("/dashboard");
    token && !error && usuario.role === "user" && navigate("/profile");
  }, [token, error, navigate, usuario.role]);

  useEffect(() => {
    error && toast.error(error);
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
        <h1>Loading...</h1>
      ) : (
        <div>
          <form onSubmit={handleLogin} className="generalForm">
            <VscAccount size="5rem" />
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
            <input
              className="generalInput"
              type="password"
              id="password-login"
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
                setError(null);
              }}
            />

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
