import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '../pages/dashBoard/Dashboard';
import { AdminCategory } from '../pages/dashboardCategories/AdminCategory';
import { CreateCategory } from '../pages/createCategory/CreateCategory';
import { EditCategory } from '../pages/editCategory/EditCategory';
import { NotFound } from '../components/notfound/NotFound';
import { UserContext } from '../contexts/UserContext';
import { useContext } from 'react';
import { AdminExperience } from '../pages/dashboardExperience/AdminExperience';
import { EditExperience } from '../pages/editExperience/EditExperience';
import { CreateExperience } from '../pages/createExperience/CreateExperience';

export const DashboardRoute = () => {
  const [user, setUser] = useContext(UserContext);

  console.log(user);

  return (
    <>
      {user.role === 'admin' ? (
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
            path="dashboard/adminExperience/editExperience/:ID"
            element={<EditExperience />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
