import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import fetcher from "../../helpers/fetcher";
import { toast } from "react-toastify";
import {
	FaCalendarAlt,
	FaEuroSign,
	FaMapMarkerAlt,
	FaStar,
	FaTags,
	FaUsers,
} from "react-icons/fa";
import "./experience-admin-card.css";

export const ExperienceAdminCard = ({ exp, setToSearch }) => {
	const [token] = useContext(TokenContext);
	const [usuario] = useContext(UserContext);
	const isViewer = usuario?.role === "viewer";
	const [active, setActive] = useState(exp.active === 1 ? true : false);
	const [, setResult] = useState([]);
	const [error, setError] = useState(null);
	const [, setLoading] = useState(false);
	const navigate = useNavigate();
	const isMounted = useRef(false);
	const startDate = exp.startDate ? new Date(exp.startDate).toLocaleDateString("es-ES") : "Sin fecha";
	const endDate = exp.endDate ? new Date(exp.endDate).toLocaleDateString("es-ES") : "Sin fecha";

	useEffect(() => {
		if (!isMounted.current) { isMounted.current = true; return; }
		if (isViewer) return;
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
	}, [active, exp.id, isViewer, token]);

	// Un alert en cuanto el estado de error cambie de null
	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	return (
		<article
			className="admin-experience-card fade_in"
			onClick={() => navigate(`/dashboard/adminExperience/editExperience/${exp.id}`)}
		>
			<figure className="admin-experience-media">
				<img
					src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${exp.photo || "NA.png"}`}
					alt={exp.title}
					className="admin-experience-image"
				/>
				<div className="admin-experience-badges">
					<span className={active ? "status-badge active" : "status-badge inactive"}>
						{active ? "Activa" : "Inactiva"}
					</span>
					{Number(exp.featured) === 1 && (
						<span className="status-badge featured">
							<FaStar aria-hidden="true" /> Destacada
						</span>
					)}
				</div>
			</figure>

			<div className="admin-experience-body">
				<div className="admin-experience-heading">
					<span className="admin-experience-id">ID {exp.id}</span>
					<h2>{exp.title}</h2>
				</div>

				<p className="admin-experience-description">
					{exp.description?.length > 120
						? `${exp.description.slice(0, 120)}...`
						: exp.description || "Sin descripción"}
				</p>

				<div className="admin-experience-meta">
					<span>
						<FaTags aria-hidden="true" />
						{exp.category || "Sin categoría"}
					</span>
					<span>
						<FaMapMarkerAlt aria-hidden="true" />
						{exp.location || "Sin ubicación"}
					</span>
					<span>
						<FaCalendarAlt aria-hidden="true" />
						{startDate} - {endDate}
					</span>
					<span>
						<FaUsers aria-hidden="true" />
						{exp.totalPlaces ?? "-"} plazas
					</span>
				</div>

				<div className="admin-experience-footer">
					<span className="admin-experience-price">
						<FaEuroSign aria-hidden="true" />
						{Number(exp.price).toFixed(2)}
					</span>
				</div>
			</div>

			{!isViewer && (
				<div className="admin-experience-actions">
					<button
						className="admin-experience-action danger"
						onClick={async (e) => {
							e.stopPropagation();
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
					{active && (
						<button
							className="admin-experience-action secondary"
							id="btn-desactive"
							onClick={(e) => { e.stopPropagation(); setActive(!active); }}
						>
							Desactivar
						</button>
					)}
					{!active && (
						<button
							className="admin-experience-action primary"
							id="btn-active"
							onClick={(e) => { e.stopPropagation(); setActive(!active); }}
						>
							Activar
						</button>
					)}
				</div>
			)}
		</article>
	);
};
