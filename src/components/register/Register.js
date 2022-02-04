import './register.css';
import { useState } from 'react';

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
      body: JSON.stringify({ name, surename, email, password, passwordRepeat }),
    });

    if (res.ok) {
      alert('te has registrado correctamente');
    } else {
      console.log('error', res);
    }
  };

  return (
    <section>
      <h2>Crear nuevo usuario</h2>
      <form className="registerForm" onSubmit={register}>
        <label>Nombre:</label>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => {
                setNewUser({ ...newUser, name: e.target.value });
              }}
        ></input>

        <label>Apellidos:</label>
        <input
          type="text"
          placeholder="Apellidos"
          value={surname}
          onChange={(e) => {
                setNewUser({ ...newUser, surname: e.target.value });
              }}
        ></input>

        <label>Correo electrónico:</label>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => {
                setNewUser({ ...newUser, email: e.target.value });
              }}
        ></input>

        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
                setNewUser({ ...newUser, password: e.target.value });
              }}
        ></input>

        <label>Repite la contraseña:</label>
        <input
          type="password"
          placeholder="Misma contraseña"
          value={passwordRepeat}
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
