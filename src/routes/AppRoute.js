import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TokenContextProvider } from "../contexts/TokenContext";
import { UserContextProvider } from "../contexts/UserContext";
import { Header } from "../components/header/Header";
import { PublicRoute } from "./PublicRoute";
import { ToastContainer } from "react-toastify";
import { ToTop } from "../components/toTop/ToTop";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export const AppRoute = () => {
	const [isVisible, setIsVisible] = useState(false);
	const [catTit, setCatTit] = useState(null);
	console.log("mother fucker", catTit);
	return (
		<Router>
			<TokenContextProvider>
				<UserContextProvider>
					<Header catTit={catTit} setCatTit={setCatTit} />
					<ToTop isVisible={isVisible} setIsVisible={setIsVisible} />
					<Routes>
						<Route
							path="/*"
							element={<PublicRoute catTit={catTit} setCatTit={setCatTit} />}
						/>
					</Routes>
				</UserContextProvider>
			</TokenContextProvider>
			<ToastContainer position="top-center" autoClose={4000} limit={2} />
		</Router>
	);
};
