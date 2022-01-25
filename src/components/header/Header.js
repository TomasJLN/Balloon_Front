import React, { useContext } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { GiBalloonDog } from 'react-icons/gi';
import './header.css';
import { useState } from 'react';
import NavBar from '../navBar/navBar';
import { TokenContext } from '../../contexts/TokenContext';
import { useGetUserProfile } from '../../hooks/useGetUserProfile';

export const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [token, setToken] = useContext(TokenContext);

  const userData = useGetUserProfile();

  console.log(userData);

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
        <FaUser />
      </div>
      <p style={{ fontSize: '0.7rem' }}>
        {token ? 'Habemus token' : 'No logueado'}
      </p>
    </header>
  );
};
