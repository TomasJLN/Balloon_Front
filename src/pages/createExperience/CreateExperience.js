import { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import fetcher from "../../helpers/fetcher";
import { TokenContext } from "../../contexts/TokenContext";
import { Link, useNavigate } from "react-router-dom";
import { fileUpload } from "../../helpers/fileUpload";
import { toast } from "react-toastify";
import { useGetCategories } from "../../hooks/useGetCategories";
import "./create-experience.css";
import DatePicker, { DateObject } from "react-multi-date-picker";

export const CreateExperience = () => {
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [expData, setExpData] = useState({
		idCategory: "",
		title: "",
		description: "",
		price: "",
		location: "",
		coords: "",
		startDate: "",
		endDate: "",
		active: true,
		featured: true,
		totalPlaces: "",
		conditions: "N/A",
		normatives: "N/A",
	});

	const [photoExp, setPhotoExp] = useState(null);
	const [result, setResult] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [token, setToken] = useContext(TokenContext);
	const [getID, setGetID] = useState("");
	const [created, setCreated] = useState(false);
	const { categories } = useGetCategories();

	const navigate = useNavigate();

	const handleActiveChange = (e) => {
		setExpData({ ...expData, active: e.target.checked });
	};
	const handleFeaturedChange = (e) => {
		setExpData({ ...expData, featured: e.target.checked });
	};

	const handleNewExperience = (e) => {
		e.preventDefault();
		if (getID === "") {
			fetcher(setResult, setError, setLoading, "experience", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: token,
				},
				body: JSON.stringify({
					...expData,
					active: expData.active ? "1" : "0",
				}),
			});
		} else {
			toast.error("Experiencia ya creada");
		}
	};
	//
	const handlePictureChange = async (e) => {
		setLoading(true);
		setError(null);
		if (getID) {
			const file = e.target.files[0];
			const url = `${process.env.REACT_APP_BACKEND_URL}/experience/${getID}/photo`;
			const key = "photo";
			if (file) {
				const resp = await fileUpload(url, key, setError, file, token);
				setPhotoExp(resp.data);
			}
		}
		setLoading(false);
		navigate(-1);
	};

	const handlePictureClick = () => {
		document.querySelector("#fileSelector").click();
	};

	useEffect(() => {
		photoExp && !error && setExpData({ ...expData });
		error && toast.error(error.message);
	}, [setPhotoExp, photoExp, error, setExpData]);

	useEffect(() => {
		result && setGetID(result);
	}, [result, navigate]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<section className="form-wrapper">
				<h1 id="create-title" style={{ textAlign: "center", color: "white" }}>
					Crear Experiencia
				</h1>
				{getID && <h1>Experiencia creada: {getID}</h1>}
				{error && <h1 style={{ color: "red" }}>{error}</h1>}

				<form onSubmit={handleNewExperience} className="generalForm">
					<div>
						<div>
							<label htmlFor="id-cat-exp">Categoría: </label>
							<select
								name="id-cat-exp"
								id="id-cat-exp"
								onChange={(e) =>
									setExpData({ ...expData, idCategory: e.target.value })
								}
							>
								<option value={1} key={0}>
									Categoría
								</option>
								{categories.map((cat) => (
									<option value={cat.id} key={cat.id}>
										{cat.title}
									</option>
								))}
							</select>
						</div>
						<div className="edit-sect-activar">
							<p className="Active">Activar</p>
							<Switch checked={expData.active} onChange={handleActiveChange} />
							<p>Destacar</p>
							<Switch
								checked={expData.featured}
								onChange={handleFeaturedChange}
							/>
						</div>
					</div>
					<div className="inputForm">
						<label className="generalLabel" htmlFor="creat-exp-name">
							Título de la experiencia: </label>
						<input
							className="generalInput"
							type="text"
							id="creat-exp-name"
							name="experience"
							value={expData.title}
							onChange={(e) => {
								setExpData({ ...expData, title: e.target.value });
							}}
						/>
						<label className="generalLabel" htmlFor="creat-text-exp">
							Descripción de la experiencia: </label>
						<textarea
							className="generalTextarea"
							id="creat-text-exp"
							type="text"
							name="description"
							value={expData.description}
							onChange={(e) => {
								setExpData({ ...expData, description: e.target.value });
							}}
						/>
						<label className="generalLabel" htmlFor="price">
							Precio de la experiencia: </label>
						<input
							className="generalInput"
							type="text"
							name="price"
							value={expData.price}
							onChange={(e) => {
								setExpData({ ...expData, price: e.target.value });
							}}
						/>
						<label className="generalLabel" htmlFor="totalplaces">
							Plazas por día: </label>
						<input
							className="generalInput"
							type="text"
							id="totalplaces"
							name="totalPlaces"
							value={expData.totalPlaces}
							onChange={(e) => {
								setExpData({ ...expData, totalPlaces: e.target.value });
							}}
						/>
						<label className="generalLabel" htmlFor="fechainicio">
							Fecha de inicio: </label>	
						<DatePicker
							id="fechainicio"
							value={expData.startDate}
							onChange={(e) => {
								setExpData({ ...expData, startDate: e.format() });
							}}
							minDate={new DateObject().add(1, "days")}
							editable={false}
						/>
						<label className="generalLabel" htmlFor="fechafin">
							Fecha de fin: </label>	
						<DatePicker
						    id="fechafin"
							value={expData.endDate}
							onChange={(e) => setExpData({ ...expData, endDate: e.format() })}
							editable={false}
						/>
						<label className="generalLabel" htmlFor="location">
							Lugar de la experiencia: </label>
						<input
							className="generalInput"
							type="text"
							id="location"
							name="location"
							value={expData.location}
							onChange={(e) => {
								setExpData({ ...expData, location: e.target.value });
							}}
							placeholder="40°25′13″N 3°42′21″O"

						/>
						<label className="generalLabel" htmlFor="coords">
							Coordenadas: </label>
						<input
							className="generalInput"
							type="text"
							id="coords"
							name="coords"
							value={expData.coords}
							onChange={(e) => {
								setExpData({ ...expData, coords: e.target.value });
							}}
						/>
						<label className="generalLabel" htmlFor="normatives">
							Normativa de la experiencia: </label>
						<input
							className="generalInput"
							type="text"
							id="normatives"
							name="normatives"
							value={expData.normatives}
							onChange={(e) => {
								setExpData({ ...expData, normatives: e.target.value });
							}}
						/>
						<label className="generalLabel" htmlFor="condiciones">
							Condiciones de la experiencia: </label>
						<input
							className="generalInput"
							type="text"
							id="condiciones"
							name="condiciones"
							value={expData.conditions}
							onChange={(e) => {
								setExpData({ ...expData, conditions: e.target.value });
							}}
						/>
					</div>
					<br />
					{!error && getID && (
						<div>
							<p className="title-center">Imagen de la Experiencia</p>

							<figure className="photo-figure-category">
								{photoExp ? (
									<img
										src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photoExp}`}
										alt={expData.title}
										className="photo-experience"
										onClick={handlePictureClick}
									/>
								) : (
									<img
										src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
										alt={expData.title}
										onClick={handlePictureClick}
										className="photo-experience"
									/>
								)}
							</figure>

							<input
								type="file"
								id="fileSelector"
								style={{ display: "none" }}
								onChange={handlePictureChange}
							/>
						</div>
					)}
					{!getID && (
						<button type="submit" className="generalButton">
							Crear Experiencia
						</button>
					)}
					{getID && (
						<Link to="/dashboard">
							<button className="generalButton">Volver a Dashboard</button>
						</Link>
					)}
				</form>
			</section>
		</>
	);
};
