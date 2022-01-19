import React from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { GiBalloonDog } from 'react-icons/gi';
import './header.css';

export const Header = () => {
  return (
    <header id="main_header">
      <nav>
        <FaBars />
      </nav>
      <GiBalloonDog />
      <div>
        <FaUser />
      </div>
    </header>
  );
};
