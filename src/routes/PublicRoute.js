import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";
import ShowResults from "../components/showResults/ShowResults";
import { UserRoute } from "./UserRoute";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";

const About = lazy(() => import("../pages/About/About.js"));
const Booking = lazy(() => import("../pages/booking/Booking"));
const Conditions = lazy(() => import("../pages/conditions/Conditions"));
const ContactForm = lazy(() => import("../forms/Contact_form/ContactForm"));
const ErrorPage = lazy(() =>
	import("../components/errorPage/ErrorPage").then((module) => ({
		default: module.ErrorPage,
	}))
);
const Login = lazy(() => import("../pages/login/Login"));
const Privacity = lazy(() => import("../pages/privacity/Privacity"));
const RecoveryPassword = lazy(() => import("../components/recoveryPassword/RecoveryPassword"));
const Register = lazy(() => import("../components/register/Register"));

export const PublicRoute = () => {
	return (
		<main>
			<Suspense fallback={<div className="loading"><h1>Cargando...</h1></div>}>
				<Routes>
					<Route
						path="privacity"
						element={
							<>
								<Privacity />
								<Footer />
							</>
						}
					/>
					<Route
						path="conditions"
						element={
							<>
								<Conditions />
								<Footer />
							</>
						}
					/>
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
						element={
							<>
								<Register />
								<Footer />
							</>
						}
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
						element={
							<>
								<RecoveryPassword />
								<Footer />
							</>
						}
					/>
					<Route
						path=""
						element={
							<>
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
