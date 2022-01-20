import React from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { GiBalloonDog } from 'react-icons/gi';
import './header.css';
import { useState } from 'react';
import NavBar from '../navBar/navBar';

export const Header = () => {
  const [showNavBar, setShowNavBar] = useState(false)
  return (
    <header id="main_header">
      <nav>
        {showNavBar && <NavBar/>}
        <FaBars onClick={()=>{
        setShowNavBar(!showNavBar)
      }}/>
      </nav>
      <GiBalloonDog />
      <div>
        <FaUser />
      </div>
    </header>
  );
};
