import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import fetcher from "../../helpers/fetcher";
import "./popup.css";

export const Popup = ({ setShowPopup }) => {
	const [emailRecovery, setEmailRecovery] = useState("");
	const [result, setResult] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleRecoveryPassword = async (e) => {
		e.preventDefault();
		await fetcher(setResult, setError, setLoading, "user/password/recover", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: emailRecovery }),
		});
	};

	useEffect(() => {
		error && toast.error(error);
		!error && result.includes("comprueba tu email") && navigate("/recovery");
		return () => {
			setResult("");
			setError(null);
		};
	}, [result, error]);

	return (
		<section id="popup-bg" onClick={() => setShowPopup(false)}>
			<article id="popup-fg" onClick={(e) => e.stopPropagation()}>
				<h1 className="generalTítulo1">Recuperar contraseña</h1>
				<form id="popup-form" onSubmit={handleRecoveryPassword}>
					<label className="generalLabel" htmlFor="email-recovery">
						Email
					</label>
					<input
						className="generalInput popup-text"
						type="text"
						id="email-recovery"
						size="50"
						required
						onChange={(e) => {
							setEmailRecovery(e.target.value);
						}}
					/>
					<button type="submit" className="generalButton">
						Recuperar
					</button>
				</form>
			</article>
		</section>
	);
};
