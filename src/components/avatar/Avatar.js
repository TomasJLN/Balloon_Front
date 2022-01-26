import React from 'react';
import { FaUser } from 'react-icons/fa';
import './avatar.css';

export const Avatar = ({ usuario, setUserMenu }) => {
  const handleClick = (e) => {
    e.preventDefault();
    setUserMenu((s) => !s);
  };

  return (
    <div onClick={handleClick}>
      {usuario.email ? (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${usuario.avatar}`}
          alt={usuario.admin}
          className="user-avatar"
        />
      ) : (
        <FaUser className="user-avatar" />
      )}
    </div>
  );
};
