import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TokenContext } from "../../contexts/TokenContext";
import fetcher from "../../helpers/fetcher";
import { toast } from "react-toastify";
import "./experience-admin-card.css";

export const ExperienceAdminCard = ({ exp, setToSearch }) => {
	const [token, setToken] = useContext(TokenContext);
	const [active, setActive] = useState(exp.active === 1 ? true : false);
	const [result, setResult] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	// Trae los resultados de las experiencias
	useEffect(() => {
		fetcher(setResult, setError, setLoading, `experience/${exp.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({
				active: active ? "1" : "0",
			}),
		});
	}, [active, exp.id, token]);

	// Un alert en cuanto el estado de error cambie de null
	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	return (
		<div className="card-category fade_in card">
			<figure className="card-figure-category">
				{exp.photo ? (
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${exp.photo}`}
						alt={exp.title}
						className="card-thumbnail-category"
						onClick={() =>
							navigate(`/dashboard/adminExperience/editExperience/${exp.id}`)
						}
					/>
				) : (
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
						alt={exp.title}
						className="card-thumbnail-category"
						onClick={() =>
							navigate(`/dashboard/adminExperience/editExperience/${exp.id}`)
						}
					/>
				)}
			</figure>
			<div className="title-card-category">
				<span className="id-exp">ID: {exp.id}</span>
				<span className="title-exp-edit">{exp.title}</span>
			</div>

			<div className="row-button-category">
				<button
					className="generalButton"
					onClick={async (e) => {
						e.preventDefault();
						setError(null);
						setToSearch(" ");
						await fetcher(
							setResult,
							setError,
							setLoading,
							`experience/${exp.id}`,
							{
								method: "DELETE",
								headers: {
									Authorization: token,
								},
							}
						);
						setToSearch("");
					}}
				>
					Borrar
				</button>
				<button
					className="generalButton"
					onClick={() =>
						navigate(`/dashboard/adminExperience/editExperience/${exp.id}`)
					}
				>
					Editar
				</button>
				{active && (
					<button
						className="generalButton"
						id="btn-desactive"
						onClick={() => {
							setActive(!active);
						}}
					>
						Desactivar
					</button>
				)}
				{!active && (
					<button
						className="generalButton"
						id="btn-active"
						onClick={(e) => {
							setActive(!active);
						}}
					>
						Activar
					</button>
				)}
			</div>
		</div>
	);
};
