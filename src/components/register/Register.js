import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetcher';
import { toast } from 'react-toastify';
import './register.css';

const Register = () => {
  const initialForm = {
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordRepeat: '',
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
      setErrorsFormulario(validationsForm(newUser));
      await fetcher(setNewUser, setError, setLoading, 'user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
    } else {
      alert('Debes aceptar los términos y condiciones');
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
    setErrorsFormulario(validationsForm(newUser));
  };
  const handleBlur = (e) => {
    handleChange(e);
    setErrorsFormulario(validationsForm(newUser));
  };

  const validationsForm = (newUser) => {
    let errorsForm = {};

    if (!newUser.name.trim()) {
      errorsForm.name = 'Debes introducir un nombre';
    }
    if (!newUser.surname.trim()) {
      errorsForm.surname = 'Debes introducir tus apellidos';
    }
    if (!newUser.email.trim()) {
      errorsForm.email = 'Debes introducir tu email';
    }
    if (!newUser.password.trim()) {
      errorsForm.password = 'Debes introducir una contraseña';
    }
    if (!newUser.passwordRepeat.trim()) {
      errorsForm.passwordRepeat = 'Introduce de nuevo la contraseña';
    }

    if (newUser.password !== newUser.passwordRepeat) {
      errorsForm.password = 'Las contraseñas deben coinicidir';
    }

    return errorsForm;
  };
  useEffect(() => {
    if (error) toast.error(error);
    return () => {
      setError(null);
    };
  }, [error]);

  return (
    
      <form className="generalForm" onSubmit={register}>
      <h2 className="newUserCreate">Crear nuevo usuario</h2>
        <div>
          <label className="generalLabel" htmlFor="name">Nombre:</label>

          <input
            className="generalInput"
            name="name"
            type="text"
            placeholder="Escribe tu nombre"
            onChange={handleChange}
            value={newUser.name}
            onBlur={handleBlur}
            required
          ></input>
          {errorsFormulario.name ? (
            <p className="errorValidation">{errorsFormulario.name}</p>
          ) : (
            <p className="errorValidation">&nbsp;</p>
          )}
        </div>

        <div>
          <label className="generalLabel" htmlFor="surname">Apellidos:</label>

          <input
            className="generalInput"
            name="surname"
            type="text"
            placeholder="Escribe tus apellidos"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newUser.surname}
            required
          ></input>
          {errorsFormulario.surname ? (
            <p className="errorValidation">{errorsFormulario.surname}</p>
          ) : (
            <p className="errorValidation">&nbsp;</p>
          )}
        </div>

        <div>
          <label className="generalLabel" htmlFor="email">Correo electrónico:</label>
          <input
            className="generalInput"
            name="email"
            type="email"
            placeholder="Escribe tu correo electrónico"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newUser.email}
            required
          ></input>
          {errorsFormulario.email ? (
            <p className="errorValidation">{errorsFormulario.email}</p>
          ) : (
            <p className="errorValidation">&nbsp;</p>
          )}
        </div>

        <div>
          <label className="generalLabel" htmlFor="password">Contraseña:</label>

          <input
           className="generalInput"
            name="password"
            type="password"
            placeholder="Escribe una contraseña"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newUser.password}
            required
          ></input>
          {errorsFormulario.password ? (
            <p className="errorValidation">{errorsFormulario.password}</p>
          ) : (
            <p className="errorValidation">&nbsp;</p>
          )}
        </div>

        <div>
          <label className="generalLabel" htmlFor="passwordRepeat">Repite la contraseña:</label>
          <input
            className="generalInput"
            name="passwordRepeat"
            type="password"
            placeholder="Repite la contraseña"
            onChange={handleChange}
            onBlur={handleBlur}
            value={newUser.passwordRepeat}
            required
          ></input>
          {errorsFormulario.passwordRepeat ? (
            <p className="errorValidation">{errorsFormulario.passwordRepeat}</p>
          ) : (
            <p className="errorValidation">&nbsp;</p>
          )}
        </div>

        <div  className='terminosConditions'>
           
            <input
              className='checkboxBox'
              type="checkbox"
              name="terminos"
              id="terminos"
              checked={checkboxValidation}
              onChange={() => setCheckboxValidation(!checkboxValidation)}
            />

          <label  htmlFor="terminos">
            Acepto los términos y condiciones
          </label>
        </div>

        <div className="errMsn">
          <p>
            <b>Error:</b>Por favor, rellena el formulario correctamente.
          </p>
        </div>

        <button  className="generalButton " type="submit">
          REGISTRARSE
        </button>
      </form>
  
  );
};

export default Register;
