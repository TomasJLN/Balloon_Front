import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { TokenContext } from '../../contexts/TokenContext';
import fetcher from '../../helpers/fetcher';
import './profile.css';

export const Profile = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token && token !== '')
      fetcher(setUsuario, setError, 'user', {
        headers: {
          Authorization: token,
        },
      });
  }, [token]);

  console.log(usuario);

  return (
    <div>
      <h1>El Perfil</h1>
      <hr />
      <form>
        <div>
          <h3>Nombre:</h3>
          <p>{usuario.name}</p>
        </div>
      </form>
      {/* <h5>{usuario}</h5> */}
    </div>
  );
};
