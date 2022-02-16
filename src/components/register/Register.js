import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetcher';
import { toast } from 'react-toastify';
import './register.css';

const Register = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [state, setState] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    setState(null);
    await fetcher(setState, setError, setLoading, 'user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });
  };

  useEffect(() => {
    if (error) toast.error(error);
    return () => {
      setError(null);
    };
  }, [error]);

  useEffect(() => {
    if (state && state.includes('Registro completado')) {
      toast.success(state);
      navigate('/account');
    }
  }, [state, navigate]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
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
      )}
    </>
  );
};

export default Register;
