import { BrowserRouter as Router, Routes, Route } from "react-router";
import { TokenContextProvider } from "../contexts/TokenContext";
import { UserContextProvider } from "../contexts/UserContext";
import { FilterContextProvider } from "../contexts/FilterContext";
import { Header } from "../components/header/Header";
import { PublicRoute } from "./PublicRoute";
import { ToastContainer } from "react-toastify";
import { ToTop } from "../components/toTop/ToTop";
import { DemoSiteBanner } from "../components/demoSiteBanner/DemoSiteBanner";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export const AppRoute = () => {
	const [isVisible, setIsVisible] = useState(false);

	return (
		<Router>
			<TokenContextProvider>
				<UserContextProvider>
					<FilterContextProvider>
						<Header />
						<DemoSiteBanner />
						<ToTop isVisible={isVisible} setIsVisible={setIsVisible} />
						<Routes>
							<Route
								path="/*"
								element={<PublicRoute />}
							/>
						</Routes>
					</FilterContextProvider>
				</UserContextProvider>
			</TokenContextProvider>
			<ToastContainer
				toastStyle={{
					backgroundColor: "rgb(var(--main-color))",
				}}
				position="top-center"
				autoClose={3000}
				limit={2}
				hideProgressBar={false}
				draggable
				theme="colored"
			/>
		</Router>
	);
};
