import React from 'react';
import { FaUser } from 'react-icons/fa';
import './avatar.css';

export const Avatar = ({ usuario, setUserMenu }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setUserMenu((s) => !s);
  };

  let laputaimagen = `na.png`;
  usuario.avatar ? (laputaimagen = usuario.avatar) : (laputaimagen = `na.png`);

  return (
    <div onClick={handleClick}>
      {usuario.email ? (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${laputaimagen}`}
          alt={usuario.admin}
          className="user-avatar"
        />
      ) : (
        <FaUser className="user-avatar" />
      )}
    </div>
  );
};
