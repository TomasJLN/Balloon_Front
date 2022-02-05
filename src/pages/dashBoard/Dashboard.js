import React from 'react';
import { BtnDashboard } from '../../components/btnDashboard/BtnDashboard';
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

  return (
    <div>
      <h1 id="title-dashboard">Dashboard</h1>
      {actions.map((a) => (
        <BtnDashboard key={a.id} title={a.title} route={a.route} />
      ))}
    </div>
  );
};
