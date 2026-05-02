import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { TokenContext } from "../../contexts/TokenContext";
import fetcher from "../../helpers/fetcher";
import { FaLock, FaUserPlus } from "react-icons/fa";
import "./register.css";

const Register = () => {
  const initialForm = {
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const [, setToken] = useContext(TokenContext);
  const [newUser, setNewUser] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorsFormulario, setErrorsFormulario] = useState({});
  const [checkboxValidation, setCheckboxValidation] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const navigate = useNavigate();
  const turnstileSiteKey = process.env.REACT_APP_TURNSTILE_SITE_KEY;

  // Cuando llega el token, guardarlo y redirigir
  useEffect(() => {
    if (result && !error) {
      setToken(result);
      toast.success("¡Bienvenido/a! Cuenta creada correctamente");
      navigate("/");
    }
  }, [result, error, navigate, setToken]);

  useEffect(() => {
    error && toast.error(error);
    if (error && turnstileSiteKey && window.turnstile) {
      window.turnstile.reset();
      setTurnstileToken("");
    }
  }, [error, turnstileSiteKey]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!turnstileSiteKey) return undefined;

    const renderTurnstile = () => {
      const container = document.getElementById("register-turnstile");

      if (!container || !window.turnstile || container.dataset.rendered) return;

      window.turnstile.render(container, {
        sitekey: turnstileSiteKey,
        callback: (token) => setTurnstileToken(token),
        "expired-callback": () => setTurnstileToken(""),
        "error-callback": () => setTurnstileToken(""),
      });

      container.dataset.rendered = "true";
    };

    if (window.turnstile) {
      renderTurnstile();
      return undefined;
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    script.onload = renderTurnstile;
    document.body.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [turnstileSiteKey]);

  const register = async (e) => {
    e.preventDefault();
    if (!checkboxValidation) {
      toast.error("Debes aceptar los términos y condiciones");
      return;
    }
    if (newUser.password !== newUser.passwordRepeat) {
      toast.error("Las contraseñas deben coincidir");
      return;
    }
    if (turnstileSiteKey && !turnstileToken) {
      toast.error("Completa la verificación anti-bots");
      return;
    }
    await fetcher(setResult, setError, setLoading, "user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newUser, turnstileToken }),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrorsFormulario(validationsForm({ ...newUser, [e.target.name]: e.target.value }));
  };

  const validationsForm = (data) => {
    const errors = {};
    if (!data.name) errors.name = "*";
    if (!data.surname) errors.surname = "*";
    if (!data.email) errors.email = "*";
    if (!data.password) errors.password = "*";
    if (!data.passwordRepeat) errors.passwordRepeat = "*";
    if (data.password && data.passwordRepeat && data.password !== data.passwordRepeat)
      errors.password = "*";
    return errors;
  };

  return (
    <section className="auth-page">
      <form className="auth-card auth-card-wide" onSubmit={register}>
        <p className="auth-kicker">Registro simplificado</p>
        <h1>Crear cuenta</h1>

        <label className="auth-field" htmlFor="nameReg">
          <span>Nombre&nbsp;
          {errorsFormulario.name && <p className="errorValidation">{errorsFormulario.name}</p>}
          </span>
          <input
            id="nameReg"
            name="name"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newUser.name}
            autoComplete="off"
            required
          />
        </label>

        <label className="auth-field" htmlFor="surnameReg">
          <span>Apellidos&nbsp;
          {errorsFormulario.surname && <p className="errorValidation">{errorsFormulario.surname}</p>}
          </span>
          <input
            id="surnameReg"
            name="surname"
            type="text"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newUser.surname}
            autoComplete="off"
            required
          />
        </label>

        <label className="auth-field auth-field-full" htmlFor="emailReg">
          <span>Correo electrónico&nbsp;
          {errorsFormulario.email && <p className="errorValidation">{errorsFormulario.email}</p>}
          </span>
          <input
            id="emailReg"
            name="email"
            type="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newUser.email}
            autoComplete="off"
            required
          />
        </label>

        <label className="auth-field" htmlFor="passwordReg">
          <span>
            <FaLock /> Contraseña&nbsp;
          {errorsFormulario.password && <p className="errorValidation">{errorsFormulario.password}</p>}
          </span>
          <input
            id="passwordReg"
            name="password"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newUser.password}
            autoComplete="off"
            required
          />
        </label>

        <label className="auth-field" htmlFor="passwordRepeatReg">
          <span>
            <FaLock /> Repite la contraseña&nbsp;
          {errorsFormulario.passwordRepeat && (
            <p className="errorValidation">{errorsFormulario.passwordRepeat}</p>
          )}
          </span>
          <input
            id="passwordRepeatReg"
            name="passwordRepeat"
            type="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newUser.passwordRepeat}
            autoComplete="off"
            required
          />
        </label>

        <div className="terminosConditions">
          <input
            className="checkboxBox"
            type="checkbox"
            name="terminos"
            id="terminos"
            checked={checkboxValidation}
            onChange={() => setCheckboxValidation(!checkboxValidation)}
          />
          <label htmlFor="terminos">
            Acepto los{" "}
            <Link to="/conditions" className="terms-conditions">
              términos y condiciones
            </Link>
          </label>
        </div>

        {turnstileSiteKey && (
          <div
            id="register-turnstile"
            className="register-turnstile"
            aria-label="Verificación anti-bots"
          />
        )}

        <button className="auth-submit" type="submit" disabled={loading}>
          <FaUserPlus />
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>
      </form>
    </section>
  );
};

export default Register;
