import React, { useContext, useEffect } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { GiBalloonDog } from 'react-icons/gi';
import './header.css';
import { useState } from 'react';
import NavBar from '../navBar/navBar';
import { TokenContext } from '../../contexts/TokenContext';
import { Avatar } from '../avatar/Avatar';
import fetcher from '../../helpers/fetcher';

export const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [token, setToken] = useContext(TokenContext);

  console.log(token);

  const [usuario, setUsuario] = useState({});

  useEffect(() => {
    if (token)
      fetcher(setUsuario, 'user', {
        headers: {
          Authorization: token,
        },
      });
  }, [token, setUsuario]);

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
        <Avatar usuario={usuario} />
      </div>
      {/* <p style={{ fontSize: '0.7rem' }}>{token}</p> */}
    </header>
  );
};
