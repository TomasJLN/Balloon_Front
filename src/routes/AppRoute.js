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
	const [catTit, setCatTit] = useState("");
	const [toSearch, setToSearch] = useState("");
	const [toSearchTit, setToSearchTit] = useState(false);

	return (
		<Router>
			<TokenContextProvider>
				<UserContextProvider>
					<Header
						toSearch={toSearch}
						setToSearch={setToSearch}
						toSearchTit={toSearchTit}
						setToSearchTit={setToSearchTit}
						catTit={catTit}
						setCatTit={setCatTit}
					/>
					<ToTop isVisible={isVisible} setIsVisible={setIsVisible} />
					<Routes>
						<Route
							path="/*"
							element={
								<PublicRoute
									toSearchTit={toSearchTit}
									setToSearchTit={setToSearchTit}
									toSearch={toSearch}
									setToSearch={setToSearch}
									catTit={catTit}
									setCatTit={setCatTit}
								/>
							}
						/>
					</Routes>
				</UserContextProvider>
			</TokenContextProvider>
			<ToastContainer position="top-center" autoClose={4000} limit={2} />
		</Router>
	);
};
