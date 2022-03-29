import React, { useState } from "react";
import "./menuDesktop.css";
import "../header/header.css";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategories } from "../../hooks/useGetCategories";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

const MenuDesktop = ({ setSearchCat }) => {
	const [isActive, setIsActive] = useState(false);

	const navigate = useNavigate();
	const { categories } = useGetCategories();

	return (
		<div className="menuescritorio">
			<menu className="menunavegacionDesktop">
				<li
					onClick={() => {
						navigate("/");
						window.location.reload(false);
					}}
					className="itemmenuescritorio"
				>
					<Link to="/">Inicio</Link>
				</li>

				<div
					onMouseOver={(e) => setIsActive(true)}
					onMouseLeave={(e) => setIsActive(false)}
					className="both"
					style={{ display: "flex", flexDirection: "column-reverse" }}
				>
					<li className="itemmenuescritorio">
						Categorías {isActive ? <AiOutlineMinus /> : <AiOutlinePlus />}
					</li>

					{isActive && (
						<div className="drop-cat">
							{categories.map((category) => (
								<li
									className="itemmenucategory"
									key={category.id}
									category={category}
									onClick={(e) => {
										setSearchCat(category.title);

										navigate(`/allFilter?category=${category.title}`);
									}}
								>
									{category.title}
								</li>
							))}
						</div>
					)}
				</div>
				<li className="itemmenuescritorio">
					<Link to="/about">Nosotrxs</Link>
				</li>
			</menu>
			<div className="menucategory"></div>
		</div>
	);
};

export default MenuDesktop;
