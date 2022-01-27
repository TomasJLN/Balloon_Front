import React, { useEffect, useState } from 'react';
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

  const register = async (e) => {
    e.preventDefault();
    await fetcher(setNewUser, 'user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    console.log('enviamos los datos al registro');
  };

  return (
    <form onSubmit={register} className="register-form">
      <div className="name-field">
        <label htmlFor="reg-name">Nombre:</label>
        <input
          type="text"
          id="reg-name"
          name="reg-name"
          onChange={(e) => {
            setNewUser({ ...newUser, name: e.target.value });
          }}
        />
      </div>
      <div className="surname-field">
        <label htmlFor="surname-name">Apellidos:</label>
        <input
          type="text"
          id="reg-surname"
          name="reg-surname"
          onChange={(e) => {
            setNewUser({ ...newUser, surname: e.target.value });
          }}
        />
      </div>
      <div className="mail-field">
        <label htmlFor="reg-mail">Email:</label>
        <input
          type="text"
          id="reg-mail"
          name="reg-mail"
          onChange={(e) => {
            setNewUser({ ...newUser, email: e.target.value });
          }}
        />
      </div>
      <br />
      <div className="password-field">
        <label htmlFor="reg-password">Contraseña:</label>
        <input
          type="password"
          id="reg-password"
          name="reg-password"
          autoComplete="off"
          onChange={(e) => {
            setNewUser({ ...newUser, password: e.target.value });
          }}
        />
      </div>
      <div className="passwordR-field">
        <label htmlFor="reg-passwordR">Repetir Contraseña:</label>
        <input
          type="password"
          id="reg-passwordR"
          name="reg-passwordR"
          autoComplete="off"
          onChange={(e) => {
            setNewUser({ ...newUser, passwordRepeat: e.target.value });
          }}
        />
      </div>
      <br />
      <input type="submit" value="Login" className="btn-login" />
    </form>
  );
};

export default Register;
