import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import Footer from "../components/footer/Footer";

const BookingDetails = lazy(() =>
  import("../pages/bookingDetails/BookingDetails").then((module) => ({
    default: module.BookingDetails,
  }))
);
const DashboardRoute = lazy(() =>
  import("./DashboardRoute").then((module) => ({ default: module.DashboardRoute }))
);
const DemoBookings = lazy(() => import("../pages/demoBookings/DemoBookings"));
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
          element={<Navigate to="/" replace />}
        />
        <Route
          path="/profile"
          element={
            <>
              <DemoBookings />
              <Footer />
            </>
          }
        />
        <Route path="/*" element={<DashboardRoute />} />
      </Routes>
    </Suspense>
  );
};
