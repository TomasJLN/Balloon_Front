import { useEffect, useState } from 'react';
import fetcher from '../../helpers/fetcher';
import './register.css';

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    await fetcher(setNewUser, setError, setLoading, 'user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
  };

  useEffect(() => {
    if (error) alert(error);
    console.log(error);
    return () => {
      setError(null);
    };
  }, [error]);

  return (
    <section>
      <h2>Crear nuevo usuario</h2>
      <form className="registerForm" onSubmit={register}>
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre"
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
          }}
        ></input>

        <label>Apellidos:</label>
        <input
          type="text"
          placeholder="Apellidos"
          onChange={(e) => {
            setNewUser({ ...newUser, surname: e.target.value });
          }}
        ></input>

        <label>Correo electrónico:</label>
        <input
          type="email"
          placeholder="Correo electrónico"
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
          }}
        ></input>

        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value });
          }}
        ></input>

        <label>Repite la contraseña:</label>
        <input
          type="password"
          placeholder="Misma contraseña"
          onChange={(e) => {
            setNewUser({ ...newUser, passwordRepeat: e.target.value });
          }}
        ></input>

        <button className="registerbtn" type="submit">
          REGISTRARSE
        </button>
      </form>
    </section>
  );
};

export default Register;
