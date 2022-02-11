import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../contexts/TokenContext';
import { UserContext } from '../../contexts/UserContext';
import fetcher from '../../helpers/fetcher';
import './login.css';

const Login = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    token && !error && usuario.role === 'admin' && navigate('/dashboard');
    token && !error && usuario.role === 'user' && navigate('/');
  }, [token, error, navigate, usuario.role]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    await fetcher(setToken, setError, setLoading, 'user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <form onSubmit={handleLogin} className="login-form">
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
          <div className="link-to">
            <Link to="/register">Crear una cuenta</Link>
          </div>
          <div className="link-to">
            <Link to="/recoveryPassword">Recuperar contraseña</Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
