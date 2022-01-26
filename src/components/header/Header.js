import React, { useContext, useEffect } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { GiBalloonDog } from 'react-icons/gi';
import './header.css';
import { useState } from 'react';
import NavBar from '../navBar/navBar';
import { TokenContext } from '../../contexts/TokenContext';
import { Avatar } from '../avatar/Avatar';
import fetcher from '../../helpers/fetcher';
import NavUser from '../navUser/NavUser';

export const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useState({});

  console.log('el token ' + token);

  useEffect(() => {
    if (token)
      fetcher(setUsuario, 'user', {
        headers: {
          Authorization: token,
        },
      });
  }, [token]);

  return (
    <header id="main_header">
      <nav>
        {showNavBar && <NavBar setShowNavBar={setShowNavBar} />}
        <FaBars
          onClick={() => {
            setShowNavBar(!showNavBar);
          }}
        />
      </nav>
      <GiBalloonDog />

      <div>
        {userMenu && <NavUser setUserMenu={setUserMenu} />}
        <Avatar usuario={usuario} setUserMenu={setUserMenu} />
      </div>
    </header>
  );
};
