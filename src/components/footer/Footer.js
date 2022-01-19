import React from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { GiBalloonDog } from 'react-icons/gi';
import './footer.css';

const Footer = () => {
  return (
    <div>
      <header id="main_header">
        <nav>
          <FaBars />
        </nav>
        <GiBalloonDog />
        <div>
          <FaUser />
        </div>
      </header>
    </div>
  );
};

export default Footer;
