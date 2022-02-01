import React, { useContext, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { GiBalloonDog } from 'react-icons/gi';
import { useState } from 'react';
import NavBar from '../navBar/navBar';
import { TokenContext } from '../../contexts/TokenContext';
import { Avatar } from '../avatar/Avatar';
import fetcher from '../../helpers/fetcher';
import NavUser from '../navUser/NavUser';
import './header.css';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (token && token !== '')
      fetcher(setUsuario, setError, setLoading, 'user', {
        headers: {
          Authorization: token,
        },
      });
  }, [token]);

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <header id="main_header">
          <nav>
            {showNavBar && <NavBar setShowNavBar={setShowNavBar} />}
            <FaBars
              onClick={() => {
                setShowNavBar(!showNavBar);
              }}
            />
          </nav>
          <h2 onClick={() => navigate('/')}>LOGO</h2>
          <div>
            {userMenu && <NavUser setUserMenu={setUserMenu} />}
            <Avatar usuario={usuario} setUserMenu={setUserMenu} />
          </div>
        </header>
      )}
    </>
  );
};
