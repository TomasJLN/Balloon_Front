import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoryAdminCard } from "../../components/categoryAdminCard/CategoryAdminCard.js";
import { useGetCategories } from "../../hooks/useGetCategories.js";
import { toast } from "react-toastify";
import "./admin-category.css";
// import { ToTop } from "../../components/toTop/ToTop.js";

export const AdminCategory = () => {
	const [toSearch, setToSearch] = useState("");

	const { categories, loading, error } = useGetCategories(toSearch);

	const ref = useRef(null);

	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		setToSearch(ref.current.value);
	};

	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<div className="form-wrapper">
				{/* <ToTop /> */}
				<h1 id="create-title">Gestionar categorías</h1>
				<form onSubmit={handleSubmit}>
					<div className="barrabusquedacategory">
						<input
							// id="input-search-field"
							type="text"
							ref={ref}
							onChange={handleSubmit}
							value={toSearch}
							placeholder="Búsqueda por Id y nombre"
						/>
					</div>

					<div>
						<Link
							to="/dashboard/adminCategory/createCategory"
							id="link-create-cat"
						>
							<button className="generalButton">crear categoría</button>
						</Link>
					</div>
				</form>
			</div>
			{categories.length < 1 ? (
				<div className="error-info fade_in">No hay resultados a mostrar</div>
			) : (
				<div
					style={{ width: "100%", backgroundColor: "white" }}
					className="form-wrap"
				>
					{categories.map((cat) => (
						<CategoryAdminCard
							key={cat.id}
							cat={cat}
							setToSearch={setToSearch}
						/>
					))}
				</div>
			)}
		</>
	);
};
