import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "../components/errorPage/ErrorPage";
import Booking from "../pages/booking/Booking";
import Login from "../pages/login/Login";
import Register from "../components/register/Register";
import ShowResults from "../components/showResults/ShowResults";
import ContactForm from "../forms/Contact_form/ContactForm";
import { UserRoute } from "./UserRoute";
import { UserContext } from "../contexts/UserContext";
import Experience from "../pages/experience/Experience";
import RecoveryPassword from "../components/recoveryPassword/RecoveryPassword";
import Faq from "../pages/faq/Faq";
import Privacity from "../pages/privacity/Privacity";
import Conditions from "../pages/conditions/Conditions";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";

export const PublicRoute = () => {
	const [user, setUser] = useContext(UserContext);

	return (
		<div>
			{/* {user.role !== "admin" && <Filter />} */}
			<Routes>
				<Route path="privacity" element={<Privacity />} />
				<Route path="conditions" element={<Conditions />} />
				<Route path="contact-form" element={<ContactForm />} />
				<Route path="account" element={<Login />} />
				<Route path="register" element={<Register />} />
				<Route
					path="experience/:id"
					element={
						<>
							<Filter />
							<Experience />
						</>
					}
				/>
				<Route path="booking/:id" element={<Booking />} />
				<Route
					path="allFilter"
					element={
						<>
							<Filter />
							<ShowResults />
						</>
					}
				/>
				<Route path="error" element={<ErrorPage />} />
				<Route path="recovery" element={<RecoveryPassword />} />
				<Route
					path=""
					element={
						<>
							<Filter />
							<ShowResults />
						</>
					}
				/>
				<Route path="faq" element={<Faq />} />
				<Route path="*" element={<UserRoute />} />
			</Routes>
			{user.role !== "admin" && <Footer />}
		</div>
	);
};
