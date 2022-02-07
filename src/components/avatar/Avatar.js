import React from 'react';
import { FaUser } from 'react-icons/fa';
import './avatar.css';

export const Avatar = ({ usuario, setUserMenu }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setUserMenu((m) => !m);
  };

  let imagenAvatar = `NA.png`;
  usuario.avatar ? (imagenAvatar = usuario.avatar) : (imagenAvatar = `NA.png`);

  console.log('click en el keko');

  return (
    <div onClick={handleClick}>
      {usuario.email ? (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${imagenAvatar}`}
          alt={usuario.admin}
          className="user-avatar"
        />
      ) : (
        <FaUser className="user-avatar" />
      )}
    </div>
  );
};
