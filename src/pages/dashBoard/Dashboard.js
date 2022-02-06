import React, { useContext, useEffect, useState } from 'react';
import { BtnDashboard } from '../../components/btnDashboard/BtnDashboard';
import { TokenContext } from '../../contexts/TokenContext';
import fetcher from '../../helpers/fetcher';
import './dashboard.css';

export const Dashboard = () => {
  const actions = [
    {
      id: 1,
      title: 'Gestor Categorías',
      route: 'adminCategory',
    },
    {
      id: 2,
      title: 'Gestor Experiencias',
      route: 'adminExperience',
    },
  ];

  const [token, setToken] = useContext(TokenContext);

  return (
    <div>
      <h1 id="title-dashboard">Dashboard</h1>
      {actions.map((a) => (
        <BtnDashboard key={a.id} title={a.title} route={a.route} />
      ))}
    </div>
  );
};
