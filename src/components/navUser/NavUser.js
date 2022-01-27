import React, { useContext, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TokenContext } from '../../contexts/TokenContext';
import './navUser.css';

const NavUser = ({ setUserMenu }) => {
  const [token, setToken] = useContext(TokenContext);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setUserMenu((s) => !s);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setUserMenu]);

  const handleLogout = () => {
    sessionStorage.setItem('token', JSON.stringify(''));
    setToken('');
    console.log(token + 'bribriblibli');
    navigate('/');
    window.location.reload(false);
  };

  return (
    <div
      ref={ref}
      className="nav-user"
      onClick={(e) => {
        setUserMenu((s) => !s);
      }}
    >
      <ul>
        <li onClick={handleLogout}>Log out</li>
        <li>
          <Link to="/">Perfil</Link>
        </li>
        <li>
          <Link to="/account">Log in</Link>
        </li>
        <li>
          <Link to="/register">Registro</Link>
        </li>
        <li>
          <Link to="/contact-form">Contactar</Link>
        </li>
      </ul>
    </div>
  );
};

export default NavUser;
