import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import Footer from "../components/footer/Footer";

const BookingDetails = lazy(() =>
  import("../pages/bookingDetails/BookingDetails").then((module) => ({
    default: module.BookingDetails,
  }))
);
const DashboardRoute = lazy(() =>
  import("./DashboardRoute").then((module) => ({ default: module.DashboardRoute }))
);
const Editprofile = lazy(() => import("../pages/editProfile/Editprofile"));
const RateExperience = lazy(() =>
  import("../pages/rateExperience/RateExperience").then((module) => ({
    default: module.RateExperience,
  }))
);

export const UserRoute = () => {
  return (
    <Suspense fallback={<div className="loading"><h1>Cargando...</h1></div>}>
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
    </Suspense>
  );
};
