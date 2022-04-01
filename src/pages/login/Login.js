import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { TokenContext } from "../../contexts/TokenContext";
import { UserContext } from "../../contexts/UserContext";
import { VscAccount } from "react-icons/vsc";
import fetcher from "../../helpers/fetcher";
import { Popup } from "../../components/popup/Popup";
import "../../components/register/register.css";
import "./login.css";
import { PopupRegisterOk } from "../../components/popupRegisterOk/PopupRegisterOk";
import { GiAirBalloon } from "react-icons/gi";

const Login = () => {
	const [token, setToken] = useContext(TokenContext);
	const [usuario, setUsuario] = useContext(UserContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [showPopup, setShowPopup] = useState(false);
	const [registerOk, setRegisterOk] = useState(false);

	const navigate = useNavigate();
	const location = useLocation();

	const q = location.search;

	let query = q;

	useEffect(() => {
		query.includes("register=ok") ? setRegisterOk(true) : setRegisterOk(false);
		return () => {
			setRegisterOk(false);
		};
	}, []);

	useEffect(() => {
		token && !error && usuario.role === "admin" && navigate("/dashboard");
		token && !error && usuario.role === "user" && navigate(-1);
		return () => {
			setError(null);
		};
	}, [token, error, navigate, usuario.role]);

	useEffect(() => {
		error && toast.error(error);
		return () => {
			setError(null);
		};
	}, [error]);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);
		await fetcher(setToken, setError, setLoading, "user/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email, password }),
		});
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{loading ? (
				<h1>Cargando...</h1>
			) : (
				<div className="form-wrapper">
					{registerOk && <PopupRegisterOk setRegisterOk={setRegisterOk} />}
					<form onSubmit={handleLogin} className="generalForm">
						<h1 className="generalTítulo1">Log in</h1>

						<label className="generalLabel" htmlFor="generalLabel">
							Email
						</label>
						<input
							className="generalInput"
							type="text"
							id="email-login"
							value={email}
							name="email-login"
							size="40"
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							onFocus={() => setEmail("")}
						/>

						<label className="generalLabel" htmlFor="generalLabel">
							Contraseña
						</label>
						<input
							className="generalInput"
							type="password"
							id="contrasena-login"
							value={password}
							name="password-login"
							size="40"
							autoComplete="off"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							onFocus={() => {
								setPassword("");
							}}
						/>

						<button type="submit" value="Login" className="generalButton">
							Login
						</button>
					</form>
					<div className="link-to">
						<Link to="/register">Crear una cuenta</Link>
					</div>
					<div className="link-to">
						<p onClick={() => setShowPopup(true)}>Recuperar contraseña</p>
					</div>
					{showPopup && <Popup setShowPopup={setShowPopup} />}
				</div>
			)}
		</>
	);
};

export default Login;
