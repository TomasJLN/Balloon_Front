import { lazy, Suspense, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import { TokenContext } from '../contexts/TokenContext';

const AdminCategory = lazy(() =>
  import('../pages/dashboardCategories/AdminCategory').then((module) => ({
    default: module.AdminCategory,
  }))
);
const AdminExperience = lazy(() =>
  import('../pages/dashboardExperience/AdminExperience').then((module) => ({
    default: module.AdminExperience,
  }))
);
const AdminUsers = lazy(() =>
  import('../pages/dashboardUsers/AdminUsers').then((module) => ({
    default: module.AdminUsers,
  }))
);
const CreateCategory = lazy(() =>
  import('../pages/createCategory/CreateCategory').then((module) => ({
    default: module.CreateCategory,
  }))
);
const CreateExperience = lazy(() =>
  import('../pages/createExperience/CreateExperience').then((module) => ({
    default: module.CreateExperience,
  }))
);
const Dashboard = lazy(() =>
  import('../pages/dashBoard/Dashboard').then((module) => ({
    default: module.Dashboard,
  }))
);
const EditCategory = lazy(() =>
  import('../pages/editCategory/EditCategory').then((module) => ({
    default: module.EditCategory,
  }))
);
const EditExperience = lazy(() =>
  import('../pages/editExperience/EditExperience').then((module) => ({
    default: module.EditExperience,
  }))
);
const NotFound = lazy(() =>
  import('../components/notfound/NotFound').then((module) => ({
    default: module.NotFound,
  }))
);

export const DashboardRoute = () => {
  const [user] = useContext(UserContext);
  const [token] = useContext(TokenContext);

  // Token presente pero usuario aún no cargado — esperar en lugar de redirigir
  if (token && !user.role) return null;

  return (
    <>
      {(user.role === 'admin' || user.role === 'viewer') ? (
        <Suspense fallback={<div className="loading"><h1>Cargando...</h1></div>}>
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
        </Suspense>
      ) : (
        <Navigate to="/error" />
      )}
    </>
  );
};
