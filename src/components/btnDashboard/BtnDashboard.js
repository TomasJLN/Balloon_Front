import React from 'react';
import { useNavigate } from 'react-router-dom';
import './btn-dashboard.css';

export const BtnDashboard = ({ title, route }) => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-items">
      <button
        className="big-button"
        onClick={() => {
          navigate(`/dashboard/${route}`);
          console.log(`/dashboard/${route}`);
        }}
      >
        {title}
      </button>
    </div>
  );
};
