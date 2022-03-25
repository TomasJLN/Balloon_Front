import { useEffect, useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

import { useGetCategories } from "../../hooks/useGetCategories";
import { useNavigate } from "react-router-dom";
import "./dropDown.css";
import "../navBar/navBar.css";

//Traemos el mostrar Menu (setShowNavBar) para ocultarlo una vez se haga click en una categoría
const Dropdown = ({
	setToSearch,

	setToSearchTit,
	searchCat,
	setSearchCat,
	setShowNavBar,
}) => {
	const [isActive, setIsActive] = useState(false);
	//Declaramos una constante para poder usar el useNavigate en la página
	const navigate = useNavigate();

	const { categories } = useGetCategories();

	return (
		<>
			<li className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
				CATEGORIAS{" "}
				{isActive ? (
					<FaArrowUp className="arrowdown" />
				) : (
					<FaArrowDown className="arrowdown" />
				)}
			</li>

			{isActive && (
				<div className="dropdown-content">
					{categories.map((category) => (
						<li
							className="dropdown-item"
							key={category.id}
							onClick={(e) => {
								setSearchCat(category.title);
								setShowNavBar(false);
								navigate(`/allFilter?category=${category.title}`);
							}}
						>
							{category.title}
						</li>
					))}
				</div>
			)}
		</>
	);
};

export default Dropdown;
