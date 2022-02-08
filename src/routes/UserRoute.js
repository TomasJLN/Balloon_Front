import { Route, Routes } from 'react-router-dom';
import { Profile } from '../components/profile/Profile';
import { BookingDetails } from '../pages/bookingDetails/BookingDetails';
import { DashboardRoute } from './DashboardRoute';

export const UserRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookingDetail/:ticket" element={<BookingDetails />} />
        <Route path="/*" element={<DashboardRoute />} />
      </Routes>
    </div>
  );
};
