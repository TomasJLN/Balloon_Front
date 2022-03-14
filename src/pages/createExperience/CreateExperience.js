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
import "react-multi-date-picker/styles/layouts/mobile.css";

export const CreateExperience = () => {
	const [expData, setExpData] = useState({
		idCategory: "",
		title: "",
		description: "",
		price: "",
		location: "",
		coords: "",
		startDate: new DateObject(),
		endDate: new DateObject(),
		active: true,
		featured: true,
		totalPlaces: "",
		conditions: "N/A",
		normatives: "N/A",
	});
	console.log("startDate", expData.startDate);
	console.log("startDate", expData.endDate);

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

	return (
		<>
			<section>
				{getID && <h1>Experiencia creada: {getID}</h1>}
				{error && <h1 style={{ color: "red" }}>{error}</h1>}
				<div className="title-back">
					<h1 className="title">Crear Experiencia</h1>
					<div className="back-div">
						<button
							className="btn-back"
							onClick={() => {
								navigate(-1);
							}}
						>
							↩️ back
						</button>
					</div>
				</div>
				<br />
				<hr />
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
							<p>Destacado</p>
							<Switch
								checked={expData.featured}
								onChange={handleFeaturedChange}
							/>
						</div>
					</div>
					<div className="inputForm">
						<input
							className="generalInput"
							type="text"
							id="edit-exp-name"
							name="experience"
							value={expData.title}
							onChange={(e) => {
								setExpData({ ...expData, title: e.target.value });
							}}
							placeholder="Título de la experiencia"
						/>
						<textarea
							className="generalTextarea"
							type="text"
							name="description"
							value={expData.description}
							onChange={(e) => {
								setExpData({ ...expData, description: e.target.value });
							}}
							placeholder="Descripción de la experiencia"
						/>
						<input
							className="generalInput"
							type="text"
							name="price"
							value={expData.price}
							onChange={(e) => {
								setExpData({ ...expData, price: e.target.value });
							}}
							placeholder="Precio de la experiencia"
						/>
						<input
							className="generalInput"
							type="text"
							name="totalPlaces"
							value={expData.totalPlaces}
							onChange={(e) => {
								setExpData({ ...expData, totalPlaces: e.target.value });
							}}
							placeholder="Plazas por día"
						/>
						<label>Fecha de inicio</label>
						<DatePicker
							value={expData.startDate}
							onChange={(e) =>
								setExpData({ ...expData, startDate: e.target?.value })
							}
							minDate={new DateObject().add(1, "days")}
							editable={false}
						/>
						<label>Fecha fin</label>

						<DatePicker
							value={expData.endDate}
							onChange={(e) =>
								setExpData({ ...expData, endDate: e.target?.value })
							}
							editable={false}
						/>

						<input
							className="generalInput"
							type="text"
							name="location"
							value={expData.location}
							onChange={(e) => {
								setExpData({ ...expData, location: e.target.value });
							}}
							placeholder="Lugar de la experiencia"
						/>
						<input
							className="generalInput"
							type="text"
							name="coords"
							value={expData.coords}
							onChange={(e) => {
								setExpData({ ...expData, coords: e.target.value });
							}}
							placeholder="coordenadas"
						/>
						<input
							className="generalInput"
							type="text"
							name="condiciones"
							value={expData.conditions}
							onChange={(e) => {
								setExpData({ ...expData, conditions: e.target.value });
							}}
							placeholder="Condiciones de la experiencia"
						/>
						<input
							className="generalInput"
							type="text"
							name="normatives"
							value={expData.normatives}
							onChange={(e) => {
								setExpData({ ...expData, normatives: e.target.value });
							}}
							placeholder="Normativas de la experiencia"
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
