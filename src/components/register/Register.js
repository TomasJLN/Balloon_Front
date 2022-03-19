import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetcher from "../../helpers/fetcher";
import { toast } from "react-toastify";
import "./register.css";

const Register = () => {
	const initialForm = {
		name: "",
		surname: "",
		email: "",
		password: "",
		passwordRepeat: "",
	};

	const [newUser, setNewUser] = useState(initialForm);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const [password, setPassword] = useState("");

	const [errorsFormulario, setErrorsFormulario] = useState({});
	const [checkboxValidation, setCheckboxValidation] = useState(false);

	const register = async (e) => {
		e.preventDefault();
		if (checkboxValidation) {
			await fetcher(setNewUser, setError, setLoading, "user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newUser),
			});

			!error && navigate("/account");
		} else {
			toast.error("Debes aceptar los términos y condiciones");
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setNewUser({
			...newUser,
			[name]: value,
		});
	};

	const handleBlur = (e) => {
		handleChange(e);
		setErrorsFormulario(validationsForm(newUser));
	};

	const validationsForm = (newUser) => {
		let errorsForm = {};

		if (!newUser.name) {
			errorsForm.name = "*";
		}
		if (!newUser.surname) {
			errorsForm.surname = "*";
		}
		if (!newUser.email) {
			errorsForm.email = "*";
		}
		if (!newUser.password) {
			errorsForm.password = "*";
		}
		if (!newUser.passwordRepeat) {
			errorsForm.passwordRepeat = "*";
		}
		if (newUser.password !== newUser.passwordRepeat) {
			errorsForm.password = "*";
		}
		return errorsForm;
	};

	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	return (
		<form className="generalForm" onSubmit={register}>
			<h1 className="generalTítulo1">Registro</h1>
			<div className="register-form">
				<label className="generalLabel" htmlFor="nameReg">
					Nombre:&nbsp;
					{errorsFormulario.name && (
						<p className="errorValidation">{errorsFormulario.name}</p>
					)}
				</label>
				<input
					className="generalInput"
					id="nameReg"
					name="name"
					type="text"
					placeholder="Escribe tu nombre"
					onChange={handleChange}
					value={newUser.name}
					onBlur={handleBlur}
					autoComplete="off"
					required
				></input>

				<label className="generalLabel" htmlFor="surnameReg">
					Apellidos:&nbsp;
					{errorsFormulario.surname && (
						<p className="errorValidation">{errorsFormulario.surname}</p>
					)}
				</label>

				<input
					className="generalInput"
					id="surnameReg"
					name="surname"
					type="text"
					placeholder="Escribe tus apellidos"
					onChange={handleChange}
					onBlur={handleBlur}
					value={newUser.surname}
					autoComplete="off"
					required
				></input>

				<label className="generalLabel" htmlFor="emailReg">
					Correo electrónico:&nbsp;
					{errorsFormulario.email && (
						<p className="errorValidation">{errorsFormulario.email}</p>
					)}
				</label>
				<input
					className="generalInput"
					id="emailReg"
					name="email"
					type="email"
					placeholder="Escribe tu correo electrónico"
					onChange={handleChange}
					onBlur={handleBlur}
					value={newUser.email}
					autoComplete="off"
					required
				></input>

				<label className="generalLabel" htmlFor="passwordReg">
					Contraseña:&nbsp;
					{errorsFormulario.password && (
						<p className="errorValidation">{errorsFormulario.password}</p>
					)}
				</label>
				<input
					className="generalInput"
					id="passwordReg"
					name="password"
					type="password"
					placeholder="Escribe una contraseña"
					onChange={handleChange}
					onBlur={handleBlur}
					value={newUser.password}
					autoComplete="off"
					required
				></input>

				<label className="generalLabel" htmlFor="passwordRepeatReg">
					Repite la contraseña:&nbsp;
					{errorsFormulario.passwordRepeat && (
						<p className="errorValidation">{errorsFormulario.passwordRepeat}</p>
					)}
				</label>
				<input
					className="generalInput"
					id="passwordRepeatReg"
					name="passwordRepeat"
					type="password"
					placeholder="Repite la contraseña"
					onChange={handleChange}
					onBlur={handleBlur}
					value={newUser.passwordRepeat}
					autoComplete="off"
					required
				></input>
			</div>
			<div className="terminosConditions">
				<input
					className="checkboxBox"
					type="checkbox"
					name="terminos"
					id="terminos"
					checked={checkboxValidation}
					onChange={() => {
						setCheckboxValidation(!checkboxValidation);
					}}
				/>
				<label htmlFor="terminos">
					Acepto los <Link to="/conditions">términos y condiciones</Link>
				</label>
			</div>
			<button className="generalButton " type="submit">
				Enviar
			</button>
		</form>
	);
};

export default Register;
