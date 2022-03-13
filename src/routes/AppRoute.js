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

	const [searchCat, setSearchCat] = useState("");
	const [toSearch, setToSearch] = useState("");
	const [toSearchTit, setToSearchTit] = useState(false);

	return (
		<Router>
			<TokenContextProvider>
				<UserContextProvider>
					<Header
						searchCat={searchCat}
						setSearchCat={setSearchCat}
						toSearch={toSearch}
						setToSearch={setToSearch}
						toSearchTit={toSearchTit}
						setToSearchTit={setToSearchTit}
					/>
					<ToTop isVisible={isVisible} setIsVisible={setIsVisible} />
					<Routes>
						<Route
							path="/*"
							element={
								<PublicRoute
									searchCat={searchCat}
									setSearchCat={setSearchCat}
									toSearchTit={toSearchTit}
									setToSearchTit={setToSearchTit}
									toSearch={toSearch}
									setToSearch={setToSearch}
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
