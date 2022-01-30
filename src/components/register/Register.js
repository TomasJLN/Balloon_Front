import './register.css';
import { useState } from 'react';

const Register = () => {
  const [name, setName] = useState('');
  const [surename, setSurename] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const register = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/user', {
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
            setName(e.target.value);
          }}
        ></input>

        <label>Apellidos:</label>
        <input
          type="text"
          placeholder="Apellidos"
          value={surename}
          onChange={(e) => {
            setSurename(e.target.value);
          }}
        ></input>

        <label>Correo electrónico:</label>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>

        <label>Contraseña:</label>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>

        <label>Repite la contraseña:</label>
        <input
          type="password"
          placeholder="Misma contraseña"
          value={passwordRepeat}
          onChange={(e) => {
            setPasswordRepeat(e.target.value);
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
