import { Route, Routes } from 'react-router-dom';
import { Profile } from '../components/profile/Profile';
import { BookingDetails } from '../pages/bookingDetails/BookingDetails';
import { BookingForUser } from '../pages/bookingForUser/BookingForUser';
import Editprofile from '../pages/editprofile/Editprofile';
import { RateExperience } from '../pages/rateExperience/RateExperience';
import { DashboardRoute } from './DashboardRoute';

export const UserRoute = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/bookingDetail/:ticket" element={<BookingDetails />} />
        <Route path="/review/:ticket" element={<RateExperience />} />
        <Route path="/bookingDetail" element={<BookingForUser />} />
        <Route path="/editprofile" element={<Editprofile />} />
        <Route path="/*" element={<DashboardRoute />} />
      </Routes>
    </div>
  );
};
