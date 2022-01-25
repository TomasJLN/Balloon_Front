import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../../contexts/TokenContext';
import fetcher from '../../helpers/fetcher';
import './login.css';

const Login = () => {
  const [token, setToken] = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await fetcher(setToken, 'user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  };

  console.log(token);

  if (token && token !== '') {
    return <Navigate to="/" />;
  }

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h1>{token}</h1>
      <div className="mail-field">
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email-login"
          name="email-login"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <br />
      <div className="password-field">
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password-login"
          name="password-login"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <br />
      <input type="submit" value="Login" className="btn-login" />
    </form>
  );
};

export default Login;
