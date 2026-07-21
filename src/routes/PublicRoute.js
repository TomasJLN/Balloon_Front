import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import ShowResults from "../components/showResults/ShowResults";
import { UserRoute } from "./UserRoute";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";
import { StudentProjectNotice } from "../components/studentProjectNotice/StudentProjectNotice";

const About = lazy(() => import("../pages/About/About.js"));
const Booking = lazy(() => import("../pages/booking/Booking"));
const ContactForm = lazy(() => import("../forms/Contact_form/ContactForm"));
const ErrorPage = lazy(() =>
	import("../components/errorPage/ErrorPage").then((module) => ({
		default: module.ErrorPage,
	}))
);
const Login = lazy(() => import("../pages/login/Login"));
const LegalNotice = lazy(() => import("../pages/legalNotice/LegalNotice"));

export const PublicRoute = () => {
	return (
		<main>
			<Suspense fallback={<div className="loading"><h1>Cargando...</h1></div>}>
				<Routes>
					<Route path="privacity" element={<Navigate to="/aviso-legal" replace />} />
					<Route path="conditions" element={<Navigate to="/aviso-legal" replace />} />
					<Route
						path="contact"
						element={
							<>
								<ContactForm />
								<Footer />
							</>
						}
					/>

					<Route
						path="aviso-legal"
						element={
							<>
								<LegalNotice />
								<Footer />
							</>
						}
					/>
					<Route
						path="account"
						element={
							<>
								<Login />
								<Footer />
							</>
						}
					/>
					<Route
						path="register"
						element={<Navigate to="/account" replace />}
					/>

					<Route
						path="booking/:id"
						element={
							<>
								<Booking />
								<Footer />
							</>
						}
					/>
					<Route
						path="allFilter"
						element={
							<>
								<Filter />
								<ShowResults />
								<Footer />
							</>
						}
					/>
					<Route
						path="error"
						element={
							<>
								<ErrorPage />
								<Footer />
							</>
						}
					/>
					<Route
						path="recovery"
						element={<Navigate to="/account" replace />}
					/>
					<Route
						path=""
						element={
							<>
								<StudentProjectNotice />
								<Filter />
								<ShowResults />
								<Footer />
							</>
						}
					/>
					<Route
						path="about"
						element={
							<>
								<About />
								<Footer />
							</>
						}
					/>
					<Route path="*" element={<UserRoute />} />
				</Routes>
			</Suspense>
		</main>
	);
};
