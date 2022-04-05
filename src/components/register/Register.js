import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TokenContext } from "../../contexts/TokenContext";
import fetcher from "../../helpers/fetcher";
import "./register.css";

const Register = () => {
  const initialForm = {
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const [token, setToken] = useContext(TokenContext);
  const [newUser, setNewUser] = useState(initialForm);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [allOK, setAllOK] = useState(false);

  const [errorsFormulario, setErrorsFormulario] = useState({});
  const [checkboxValidation, setCheckboxValidation] = useState(false);

  useEffect(() => {
    token && navigate("/");
    return () => {
      setToken(null);
    };
  }, [token]);

  useEffect(() => {
    error && toast.error(error) && setAllOK(false);
    if (!error && allOK) {
      toast.success("Todo correcto. Revisa tu correo electrónico") &&
        navigate("/account");
    }
    setNewUser(initialForm);
    setCheckboxValidation(false);
    setErrorsFormulario({});
    return () => {
      setAllOK(false);
      setError(null);
    };
  }, [error, navigate, allOK]);

  const handleSuccess = () => {
    !error && setAllOK(true);
  };

  const register = async (e) => {
    e.preventDefault();
    if (checkboxValidation) {
      if (newUser.password === newUser.passwordRepeat) {
        await fetcher(setNewUser, setError, setLoading, "user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });
        handleSuccess();
      } else {
        toast.error("Las contraseñas deben coincidir");
      }
    } else {
      toast.error("Debes aceptar los términos y condiciones");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    handleChange(e);
    setErrorsFormulario(validationsForm(newUser));
  };

  const validationsForm = (newUser) => {
    let errorsForm = {};

    if (!newUser.name) {
      errorsForm.name = "*";
    }
    if (!newUser.surname) {
      errorsForm.surname = "*";
    }
    if (!newUser.email) {
      errorsForm.email = "*";
    }
    if (!newUser.password) {
      errorsForm.password = "*";
    }
    if (!newUser.passwordRepeat) {
      errorsForm.passwordRepeat = "*";
    }
    if (newUser.password !== newUser.passwordRepeat) {
      errorsForm.password = "*";
    }
    return errorsForm;
  };

  return (
    <div className="form-wrapper">
      <form className="generalForm" onSubmit={register}>
        <h1 className="generalTítulo1">Registro</h1>
        <label className="generalLabel" htmlFor="nameReg">
          Nombre:&nbsp;
          {errorsFormulario.name && (
            <p className="errorValidation">{errorsFormulario.name}</p>
          )}
        </label>
        <input
          className="generalInput"
          id="nameReg"
          name="name"
          type="text"
          onChange={handleChange}
          value={newUser.name}
          onBlur={handleBlur}
          autoComplete="off"
          required
        ></input>

        <label className="generalLabel" htmlFor="surnameReg">
          Apellidos:&nbsp;
          {errorsFormulario.surname && (
            <p className="errorValidation">{errorsFormulario.surname}</p>
          )}
        </label>

        <input
          className="generalInput"
          id="surnameReg"
          name="surname"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.surname}
          autoComplete="off"
          required
        ></input>

        <label className="generalLabel" htmlFor="emailReg">
          Correo electrónico:&nbsp;
          {errorsFormulario.email && (
            <p className="errorValidation">{errorsFormulario.email}</p>
          )}
        </label>
        <input
          className="generalInput"
          id="emailReg"
          name="email"
          type="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.email}
          autoComplete="off"
          required
        ></input>

        <label className="generalLabel" htmlFor="passwordReg">
          Contraseña:&nbsp;
          {errorsFormulario.password && (
            <p className="errorValidation">{errorsFormulario.password}</p>
          )}
        </label>
        <input
          className="generalInput"
          id="passwordReg"
          name="password"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.password}
          autoComplete="off"
          required
        ></input>

        <label className="generalLabel" htmlFor="passwordRepeatReg">
          Repite la contraseña:&nbsp;
          {errorsFormulario.passwordRepeat && (
            <p className="errorValidation">{errorsFormulario.passwordRepeat}</p>
          )}
        </label>
        <input
          className="generalInput"
          id="passwordRepeatReg"
          name="passwordRepeat"
          type="password"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.passwordRepeat}
          autoComplete="off"
          required
        ></input>
        <div className="terminosConditions">
          <input
            className="checkboxBox"
            type="checkbox"
            name="terminos"
            id="terminos"
            checked={checkboxValidation}
            onChange={() => {
              setCheckboxValidation(!checkboxValidation);
            }}
          />
          <label htmlFor="terminos">
            Acepto los{" "}
            <Link to="/conditions" className="terms-conditions">
              términos y condiciones
            </Link>
          </label>
        </div>
        <button className="generalButton " type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default Register;
