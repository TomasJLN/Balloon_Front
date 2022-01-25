import React, { useContext } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { GiBalloonDog } from 'react-icons/gi';
import './header.css';
import { useState } from 'react';
import NavBar from '../navBar/navBar';
import { TokenContext } from '../../contexts/TokenContext';

export const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false);
  const [token, setToken] = useContext(TokenContext);
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
      <p>{token}</p>
    </header>
  );
};
