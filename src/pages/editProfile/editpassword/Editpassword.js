import { useState, useEffect, useContext } from 'react';
import { TokenContext } from '../../../contexts/TokenContext';
import { UserContext } from '../../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../../helpers/fetcher';
import { toast } from 'react-toastify';
import './editpassword.css';

const Editpassword = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const { name, surname } = usuario;

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) navigate('/');
  }, [token, error, navigate]);

  const handlepassword = async (e) => {
    e.preventDefault();
    setError(null);
    const elBody =
      password !== ''
        ? JSON.stringify({ name, surname, password, newPassword })
        : JSON.stringify({ name, surname });
    await fetcher(setResult, setError, setLoading, 'user/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
      body: elBody,
    });
  };

  useEffect(() => {
    toast.error(error);
  }, [error, setError]);

  useEffect(() => {
    result && toast.success(result);
    setResult(null);
  }, [result, setResult]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <section className="editpassword">
          <form onSubmit={handlepassword}>
            <h2 id="datos">Cambiar mis datos</h2>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={usuario.name}
              onChange={(e) => setUsuario({ ...usuario, name: e.target.value })}
            ></input>
            <label htmlFor="surname">Apellidos:</label>
            <input
              type="text"
              id="surname"
              name="surname"
              value={surname}
              onChange={(e) =>
                setUsuario({ ...usuario, surname: e.target.value })
              }
            ></input>
            <label htmlFor="password">Contraseña actual:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            <label htmlFor="newpassword">Nueva contraseña:</label>
            <input
              type="password"
              id="newpassword"
              name="newpassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            ></input>
            <button type="submit">Guardar</button>
          </form>
        </section>
      )}
    </>
  );
};

export default Editpassword;
