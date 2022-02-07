import { Route, Routes } from 'react-router-dom';
import { Profile } from '../components/profile/Profile';
import { DashboardRoute } from './DashboardRoute';

export const UserRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<DashboardRoute />} />
      </Routes>
    </div>
  );
};
