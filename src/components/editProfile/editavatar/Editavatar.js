import { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import fetcher from '../../../helpers/fetcher';
import { TokenContext } from '../../../contexts/TokenContext';
import './editavatar.css';

const Editavatar = () => {
  const [token, setToken] = useContext(TokenContext);
  const [avatar, setAvatar] = useState('');

  const handlavatar = async (e) => {
    e.preventDefault();
    await fetcher('user/avatar', {
      method: 'PUT',
      headers: {
        Authorization: token,
      },
      body: JSON.stringify({ avatar }),
    });
  };

  let userimg = `user.png`;

  return (
    <section className="Editavatar">
      <h2 id="foto">Cambiar mi foto</h2>
      <img src={userimg} />
      <button className="Guardar" type="submit">
        Cambiar
      </button>
    </section>
  );
};
export default Editavatar;
