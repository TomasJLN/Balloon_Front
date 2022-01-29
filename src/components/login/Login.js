import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../contexts/TokenContext';
import fetcher from '../../helpers/fetcher';
import './login.css';

const Login = () => {
  const [token, setToken] = useContext(TokenContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && !error) navigate('/');
  }, [token, error, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    await fetcher(setToken, setError, 'user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h1>{token}</h1>
      <div className="mail-field">
        <label htmlFor="email-login">email:</label>
        <input
          type="text"
          id="email-login"
          value={email}
          name="email-login"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          onFocus={() => setEmail('')}
        />
      </div>
      <br />
      <div className="password-field">
        <label htmlFor="password-login">Contraseña:</label>
        <input
          type="password"
          id="password-login"
          value={password}
          name="password-login"
          autoComplete="off"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          onFocus={() => setPassword('')}
        />
      </div>
      {error && <span className="show-error">{error}</span>}
      <br />
      <input type="submit" value="Login" className="btn-login" />
    </form>
  );
};

export default Login;
