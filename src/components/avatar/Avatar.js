import React from 'react';
import { FaUser } from 'react-icons/fa';

export const Avatar = ({ usuario }) => {
  console.log(usuario.email);
  return (
    <div>
      {usuario.email ? (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${usuario.avatar}`}
          alt={usuario.admin}
          className="card-thumbnail"
        />
      ) : (
        <FaUser />
      )}
    </div>
  );
};
