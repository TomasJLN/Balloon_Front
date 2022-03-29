import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExperienceAdminCard } from "../../components/experienceAdminCard/ExperienceAdminCard.js";
import { useFiltered } from "../../hooks/useFiltered.js";
import { toast } from "react-toastify";
import "./admin-experience.css";
// import { ToTop } from "../../components/toTop/ToTop.js";

export const AdminExperience = () => {
	const [toSearch, setToSearch] = useState("");

	const { filtered, error, loading } = useFiltered(`?experience=${toSearch}`);

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
				<h1 id="create-title">Gestionar experiencias</h1>
				<form onSubmit={handleSubmit}>
					<div className="barrabusquedacategory">
						<input
							type="text"
							ref={ref}
							placeholder="Búsqueda por título y descripción"
							onChange={handleSubmit}
							value={toSearch}
						/>
					</div>
					<button
						className="btn-back"
						onClick={() => {
							navigate(-1);
						}}
					>
						↩️ back
					</button>
					<div className="create-exp">
						<Link
							to="/dashboard/adminExperience/createExperience"
							id="link-create-cat"
						>
							{" "}
							<button className="generalButton">crear experiencia</button>
						</Link>
					</div>
				</form>
			</div>
			{filtered.length < 1 ? (
				<div className="error-info fade_in">No hay resultados a mostrar</div>
			) : (
				<div
					style={{ width: "100%", backgroundColor: "white" }}
					className="form-wrap"
				>
					{filtered.map((exp) => (
						<ExperienceAdminCard
							key={exp.id}
							exp={exp}
							setToSearch={setToSearch}
						/>
					))}
				</div>
			)}
			);
		</>
	);
};
