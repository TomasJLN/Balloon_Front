import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import fetcher from "../../helpers/fetcher";
import { FaTags } from "react-icons/fa";
import "./category-admin-card.css";

export const CategoryAdminCard = ({ cat, setToSearch }) => {
	const [token] = useContext(TokenContext);
	const [usuario] = useContext(UserContext);
	const isViewer = usuario?.role === "viewer";
	const [active, setActive] = useState(cat.active === 1 ? true : false);
	const [, setResult] = useState("");
	const [error, setError] = useState(null);
	const [, setLoading] = useState(false);
	const navigate = useNavigate();
	const isMounted = useRef(false);

	useEffect(() => {
		if (!isMounted.current) { isMounted.current = true; return; }
		if (isViewer) return;
		setLoading(true);
		fetcher(setResult, setError, setLoading, `category/${cat.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
			body: JSON.stringify({
				active: active ? "1" : "0",
			}),
		});
	}, [active, cat.id, isViewer, token]);

	// Un alert en cuanto el estado de error cambie de null
	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	return (
		<article
			className="admin-category-card fade_in"
			onClick={() => navigate(`/dashboard/adminCategory/editCategory/${cat.id}`)}
		>
			<figure className="admin-category-media">
				<img
					src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${cat.photo || "NA.png"}`}
					alt={cat.title}
					className="admin-category-image"
				/>
				<div className="admin-category-badges">
					<span className={active ? "status-badge active" : "status-badge inactive"}>
						{active ? "Activa" : "Inactiva"}
					</span>
				</div>
			</figure>

			<div className="admin-category-body">
				<span className="admin-category-id">ID {cat.id}</span>
				<h2>
					<FaTags aria-hidden="true" />
					{cat.title}
				</h2>
				<p>
					{cat.description?.length > 135
						? `${cat.description.slice(0, 135)}...`
						: cat.description || "Sin descripción"}
				</p>
			</div>

			{!isViewer && (
				<div className="admin-category-actions">
					<button
						className="admin-category-action danger"
						onClick={async (e) => {
							e.stopPropagation();
							e.preventDefault();
							setError(null);
							setToSearch(" ");
							await fetcher(
								setResult,
								setError,
								setLoading,
								`category/${cat.id}`,
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
							className="admin-category-action secondary"
							id="btn-desactive"
							onClick={(e) => { e.stopPropagation(); setActive(!active); }}
						>
							Desactivar
						</button>
					)}
					{!active && (
						<button
							className="admin-category-action primary"
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
