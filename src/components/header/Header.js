import { useState, useContext, useEffect } from "react";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";

import mainLogo from "../../mainlogo/balloon-logo.png";

import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { GrClose } from "react-icons/gr";

import fetcher from "../../helpers/fetcher";
import { Avatar } from "../avatar/Avatar";
import NavBar from "../navBar/navBar";
import NavUser from "../navUser/NavUser";
import MenuDesktop from "../menuDesktop/MenuDesktop";
import "./header.css";

export const Header = ({
	toSearch,
	setToSearch,
	toSearchTit,
	setToSearchTit,
	searchCat,
	setSearchCat,
	isFilterOn,
	setIsFilterOn,
}) => {
	const [showNavBar, setShowNavBar] = useState(false);
	const [userMenu, setUserMenu] = useState(false);
	const [token, setToken] = useContext(TokenContext);
	const [usuario, setUsuario] = useContext(UserContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (token && token !== "")
			fetcher(setUsuario, setError, setLoading, "user", {
				headers: {
					Authorization: token,
				},
			});
	}, [token, setUsuario]);

	const refreshPage = () => {
		usuario.role === "admin" && navigate("/");
		window.location.reload(false);
	};

	const handleClick = () => {
		navigate("/");
		refreshPage();
	};

	return (
		<>
			{loading ? (
				<h1>Cargando...</h1>
			) : (
				<header id="main_header">
					<nav>
						{showNavBar && (
							<NavBar
								toSearch={toSearch}
								setToSearch={setToSearch}
								toSearchTit={toSearchTit}
								setToSearchTit={setToSearchTit}
								searchCat={searchCat}
								setSearchCat={setSearchCat}
								setShowNavBar={setShowNavBar}
								isFilterOn={isFilterOn}
								setIsFilterOn={setIsFilterOn}
							/>
						)}

						{!showNavBar ? (
							<FaBars
								className="menuprincipal"
								onClick={() => {
									setShowNavBar(!showNavBar);
								}}
							/>
						) : (
							<GrClose className="menuprincipal" />
						)}
					</nav>

					<MenuDesktop
						isFilterOn={isFilterOn}
						setIsFilterOn={setIsFilterOn}
						setSearchCat={setSearchCat}
					/>
					<div onClick={handleClick} className="doggy-logo">
						<img
							src={mainLogo}
							style={{ maxWidth: "150px" }}
							alt="balloon-logo"
						/>
					</div>

					<div className="user-avatar-menu">
						{userMenu && (
							<NavUser setUserMenu={setUserMenu} usuario={usuario} />
						)}
						<Avatar usuario={usuario} setUserMenu={setUserMenu} />
					</div>
				</header>
			)}
		</>
	);
};
