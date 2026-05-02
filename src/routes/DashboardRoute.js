import { Routes, Route, Navigate } from 'react-router';
import { Dashboard } from '../pages/dashBoard/Dashboard';
import { AdminCategory } from '../pages/dashboardCategories/AdminCategory';
import { CreateCategory } from '../pages/createCategory/CreateCategory';
import { EditCategory } from '../pages/editCategory/EditCategory';
import { NotFound } from '../components/notfound/NotFound';
import { UserContext } from '../contexts/UserContext';
import { TokenContext } from '../contexts/TokenContext';
import { useContext } from 'react';
import { AdminExperience } from '../pages/dashboardExperience/AdminExperience';
import { EditExperience } from '../pages/editExperience/EditExperience';
import { CreateExperience } from '../pages/createExperience/CreateExperience';
import { AdminUsers } from '../pages/dashboardUsers/AdminUsers';

export const DashboardRoute = () => {
  const [user] = useContext(UserContext);
  const [token] = useContext(TokenContext);

  // Token presente pero usuario aún no cargado — esperar en lugar de redirigir
  if (token && !user.role) return null;

  return (
    <>
      {(user.role === 'admin' || user.role === 'viewer') ? (
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/adminCategory" element={<AdminCategory />} />
          <Route
            path="dashboard/adminCategory/createCategory"
            element={<CreateCategory />}
          />
          <Route
            path="dashboard/adminCategory/editCategory/:id"
            element={<EditCategory />}
          />
          <Route
            path="dashboard/adminExperience"
            element={<AdminExperience />}
          />
          <Route
            path="dashboard/adminExperience/createExperience"
            element={<CreateExperience />}
          />
          <Route
            path="dashboard/adminExperience/editExperience/:id"
            element={<EditExperience />}
          />
          <Route path="dashboard/adminUsers" element={<AdminUsers />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Navigate to="/error" />
      )}
    </>
  );
};
