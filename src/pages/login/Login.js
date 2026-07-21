import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import fetcher from "../../helpers/fetcher";
import "../../components/register/register.css";
import "./login.css";
import { FaFlask, FaSignInAlt, FaUserShield } from "react-icons/fa";

const DEMO_ACCOUNT = {
  email: "maria.lopez@demo.com",
  password: "Demo1234!",
};

const Login = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario] = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const destination = location.state?.from || "/";

  useEffect(() => {
    token && !error && (usuario.role === "admin" || usuario.role === "viewer") && navigate("/dashboard");
    token && !error && usuario.role === "user" && navigate(destination, { replace: true });
    return () => {
      setError(null);
    };
  }, [token, error, navigate, usuario.role, destination]);

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
      body: JSON.stringify(DEMO_ACCOUNT),
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
          <form onSubmit={handleLogin} className="auth-card">
            <p className="auth-kicker">Acceso de demostración</p>
            <div className="demo-login-icon" aria-hidden="true">
              <FaUserShield />
            </div>
            <h1>Explora con una cuenta ficticia</h1>
            <p className="demo-login-copy">
              No tienes que registrarte ni introducir datos. Accederás con un
              perfil preparado exclusivamente para probar Balloon.
            </p>

            <div className="demo-login-note">
              <FaFlask aria-hidden="true" />
              Los cambios y reservas son simulados.
            </div>

            <button type="submit" value="Login" className="auth-submit">
              <FaSignInAlt />
              Entrar como usuario demo
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Login;
