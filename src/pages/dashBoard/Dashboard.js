import React, { useContext } from 'react';
import { BtnDashboard } from '../../components/btnDashboard/BtnDashboard';
import { UserContext } from '../../contexts/UserContext';
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

  const [usuario, setUsuario] = useContext(UserContext);

  return usuario.role === 'admin' ? (
    <div>
      <h1 id="title-dashboard">Dashboard</h1>
      {actions.map((a) => (
        <BtnDashboard key={a.id} title={a.title} route={a.route} />
      ))}
    </div>
  ) : (
    <div className="not-allowed">
      <h1>No tienes acceso a la zona de Administración</h1>
    </div>
  );
};
