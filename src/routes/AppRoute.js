import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TokenContextProvider } from "../contexts/TokenContext";
import { UserContextProvider } from "../contexts/UserContext";
import { Header } from "../components/header/Header";
import { PublicRoute } from "./PublicRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AppRoute = () => {
	return (
		<Router>
			<TokenContextProvider>
				<UserContextProvider>
					<Header />
					<Routes>
						<Route path="/*" element={<PublicRoute />} />
					</Routes>
				</UserContextProvider>
			</TokenContextProvider>
			<ToastContainer position="top-center" autoClose={4000} limit={2} />
		</Router>
	);
};
