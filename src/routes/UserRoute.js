import { Route, Routes } from "react-router-dom";
import { BookingDetails } from "../pages/bookingDetails/BookingDetails";
import Editprofile from "../pages/editProfile/Editprofile";
import { RateExperience } from "../pages/rateExperience/RateExperience";
import { DashboardRoute } from "./DashboardRoute";
import Footer from "../components/footer/Footer";

export const UserRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/bookingDetail/:ticket"
          element={
            <>
              <BookingDetails />
              <Footer />
            </>
          }
        />
        <Route
          path="/review/:ticket"
          element={
            <>
              <RateExperience />
              <Footer />
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Editprofile />
              <Footer />
            </>
          }
        />
        <Route path="/*" element={<DashboardRoute />} />
      </Routes>
    </>
  );
};
