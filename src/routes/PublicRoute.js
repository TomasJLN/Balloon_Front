import { useContext, useState } from "react";
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
import About from "../pages/About/About.js";
import Privacity from "../pages/privacity/Privacity";
import Conditions from "../pages/conditions/Conditions";
import Footer from "../components/footer/Footer";
import Filter from "../components/filter/Filter";

export const PublicRoute = ({
	toSearchTit,
	setToSearchTit,
	toSearch,
	setToSearch,
	searchCat,
	setSearchCat,
}) => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<div>
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
				{/*  <Route
          path="experience/:id"
          element={
            <>
              <Experience />
              <Footer />
            </>
          }
        /> */}
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
							<Filter
								toSearchTit={toSearchTit}
								setToSearchTit={setToSearchTit}
								toSearch={toSearch}
								setToSearch={setToSearch}
								searchCat={searchCat}
								setSearchCat={setSearchCat}
							/>
							<ShowResults
								toSearchTit={toSearchTit}
								setToSearchTit={setToSearchTit}
								searchCat={searchCat}
								setSearchCat={setSearchCat}
								isVisible={isVisible}
								setIsVisible={setIsVisible}
								toSearch={toSearch}
								setToSearch={setToSearch}
							/>
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
							<Filter
								toSearchTit={toSearchTit}
								setToSearchTit={setToSearchTit}
								toSearch={toSearch}
								setToSearch={setToSearch}
								searchCat={searchCat}
								setSearchCat={setSearchCat}
							/>
							<ShowResults
								toSearchTit={toSearchTit}
								setToSearchTit={setToSearchTit}
								searchCat={searchCat}
								setSearchCat={setSearchCat}
								isVisible={isVisible}
								setIsVisible={setIsVisible}
							/>
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
		</div>
	);
};
