import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import fetcher from "../../helpers/fetcher";
import { FaLock, FaPaperPlane } from "react-icons/fa";
import "../register/register.css";
import "./recovery-password.css";

const RecoveryPassword = () => {
	const [result, setResult] = useState("");
	const [recoveryCode, setRecoveryCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(null);
		await fetcher(setResult, setError, setLoading, "user/password/reset", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ recoveryCode, newPassword }),
		});
	};

	useEffect(() => {
		result.includes("Contraseña actualizada") && navigate("/account");
		return () => {
			setResult("");
			setError(null);
		};
	}, [result, navigate]);

	useEffect(() => {
		error && toast.error(error);
		setRecoveryCode("");
		setNewPassword("");
	}, [error]);

	return (
		<section className="auth-page">
			<form className="auth-card" onSubmit={handleSubmit}>
				<p className="auth-kicker">Acceso a cuenta</p>
				<h1>Recuperar contraseña</h1>
				<label className="auth-field" htmlFor="recoveryCode">
					<span>Código de recuperación</span>
					<input
						type="text"
						id="recoveryCode"
						value={recoveryCode}
						onFocus={() => setRecoveryCode("")}
						onChange={(e) => setRecoveryCode(e.target.value)}
						autoComplete="off"
					/>
				</label>
				<label className="auth-field" htmlFor="newPassword">
					<span>
						<FaLock /> Nueva contraseña
					</span>
					<input
						type="password"
						id="newPassword"
						value={newPassword}
						onFocus={() => setNewPassword("")}
						onChange={(e) => setNewPassword(e.target.value)}
						autoComplete="off"
					/>
				</label>
				<button type="submit" className="auth-submit" disabled={loading}>
					<FaPaperPlane />
					Enviar
				</button>
			</form>
		</section>
	);
};

export default RecoveryPassword;
