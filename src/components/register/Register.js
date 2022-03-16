import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import fetcher from "../../helpers/fetcher";
import { toast } from "react-toastify";
import "./register.css";

const Register = () => {
  const initialForm = {
    name: "",
    surname: "",
    email: "",
    password: "",
    passwordRepeat: "",
  };

  const [newUser, setNewUser] = useState(initialForm);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [errorsFormulario, setErrorsFormulario] = useState({});
  const [checkboxValidation, setCheckboxValidation] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    if (checkboxValidation) {
      await fetcher(setNewUser, setError, setLoading, "user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });

      !error && navigate("/account");
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
      errorsForm.name = "Debes introducir un nombre";
    }
    if (!newUser.surname) {
      errorsForm.surname = "Debes introducir tus apellidos";
    }
    if (!newUser.email) {
      errorsForm.email = "Debes introducir tu email";
    }
    if (!newUser.password) {
      errorsForm.password = "Debes introducir una contraseña";
    }
    if (!newUser.passwordRepeat) {
      errorsForm.passwordRepeat = "Debes introducir de nuevo la contraseña";
    }
    if (newUser.password !== newUser.passwordRepeat) {
      errorsForm.password = "Las contraseñas deben coinicidir";
    }
    return errorsForm;
  };

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <form className="generalForm" onSubmit={register}>
      <h1 className="generalTítulo1">Crear nuevo usuario</h1>
      <div className="register-form">
        <label className="generalLabel" htmlFor="name">
          Nombre:
        </label>
        <input
          className="generalInput"
          name="name"
          type="text"
          placeholder="Escribe tu nombre"
          onChange={handleChange}
          value={newUser.name}
          onBlur={handleBlur}
          autoComplete="off"
          required
        ></input>
        {errorsFormulario.name ? (
          <p className="errorValidation">{errorsFormulario.name}</p>
        ) : (
          <p className="errorValidation">&nbsp;</p>
        )}
        <label className="generalLabel" htmlFor="surname">
          Apellidos:
        </label>
        <input
          className="generalInput"
          name="surname"
          type="text"
          placeholder="Escribe tus apellidos"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.surname}
          autoComplete="off"
          required
        ></input>
        {errorsFormulario.surname ? (
          <p className="errorValidation">{errorsFormulario.surname}</p>
        ) : (
          <p className="errorValidation">&nbsp;</p>
        )}
        <label className="generalLabel" htmlFor="email">
          Correo electrónico:
        </label>
        <input
          className="generalInput"
          name="email"
          type="email"
          placeholder="Escribe tu correo electrónico"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.email}
          autoComplete="off"
          required
        ></input>
        {errorsFormulario.email ? (
          <p className="errorValidation">{errorsFormulario.email}</p>
        ) : (
          <p className="errorValidation">&nbsp;</p>
        )}
        <label className="generalLabel" htmlFor="password">
          Contraseña:
        </label>
        <input
          className="generalInput"
          name="password"
          type="password"
          placeholder="Escribe una contraseña"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.password}
          autoComplete="off"
          required
        ></input>
        {errorsFormulario.password ? (
          <p className="errorValidation">{errorsFormulario.password}</p>
        ) : (
          <p className="errorValidation">&nbsp;</p>
        )}
        <label className="generalLabel" htmlFor="passwordRepeat">
          Repite la contraseña:
        </label>
        <input
          className="generalInput"
          name="passwordRepeat"
          type="password"
          placeholder="Repite la contraseña"
          onChange={handleChange}
          onBlur={handleBlur}
          value={newUser.passwordRepeat}
          autoComplete="off"
          required
        ></input>
        {errorsFormulario.passwordRepeat ? (
          <p className="errorValidation">{errorsFormulario.passwordRepeat}</p>
        ) : (
          <p className="errorValidation">&nbsp;</p>
        )}
      </div>
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
        <label htmlFor="terminos">Acepto los términos y condiciones</label>
      </div>

      {/* <div className="errMsn">
        <p>
          <b>Error:</b>Por favor, rellena el formulario correctamente.
        </p>
      </div> */}
      <button className="generalButton " type="submit">
        REGISTRARSE
      </button>
    </form>
  );
};

export default Register;
