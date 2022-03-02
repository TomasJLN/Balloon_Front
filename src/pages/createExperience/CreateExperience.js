import React, { useContext, useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import fetcher from "../../helpers/fetcher";
import { TokenContext } from "../../contexts/TokenContext";
import { useNavigate } from "react-router-dom";
import { fileUpload } from "../../helpers/fileUpload";
import { toast } from "react-toastify";
import "./create-experience.css";
import { useCategories2 } from "../../hooks/useCategories2";
import { useExperience } from "../../hooks/useExperience";

export const CreateExperience = () => {
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
	const navigate = useNavigate();

	const handleActiveChange = (e) => {
		setExpData({ ...expData, active: e.target.checked });
	};
	const handleFeaturedChange = (e) => {
		setExpData({ ...expData, featured: e.target.checked });
	};

	const handleNewExperience = (e) => {
		e.preventDefault();
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
	};

	const handlePictureClick = () => {
		document.querySelector("#fileSelector").click();
	};

	useEffect(() => {
		console.log("photoExp -> ", photoExp, !error);
		photoExp && !error && setExpData({ ...expData });
		error && toast.error(error.message);
	}, [setPhotoExp, photoExp, error, setExpData]);

	useEffect(() => {
		result && setGetID(result);
	}, [result, navigate]);

	const categories = useCategories2();

	return (
		<>
			<section>
				{getID && <h1>ID_ {getID}</h1>}
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
				<form onSubmit={handleNewExperience} className="edit-cat-form">
					<div className="group-switch">
						<div>
							<select name="id-cat-exp">
								<option>{}</option>
								{categories.map((cat) => (
									<option
										value={expData.idCategory}
										onChange={(e) => {
											setExpData({ ...expData, idCategory: e.target.value });
										}}
										key={cat.id}
									>
										{cat.title}
									</option>
								))}
							</select>
						</div>
						<div className="edit-sect-activar">
							<p>Activar</p>
							<Switch checked={expData.active} onChange={handleActiveChange} />
							<p>Destacado</p>
							<Switch
								checked={expData.featured}
								onChange={handleFeaturedChange}
							/>
						</div>
					</div>
					<div id="edit-exp-title">
						<label htmlFor="edit-exp-name">Título: </label>
						<textarea
							type="text"
							id="edit-exp-name"
							name="experience"
							value={expData.title}
							onChange={(e) => {
								setExpData({ ...expData, title: e.target.value });
							}}
							placeholder="Título de la experiencia"
						/>
					</div>
					<div id="edit-exp-description">
						<textarea
							type="text"
							name="description"
							value={expData.description}
							onChange={(e) => {
								setExpData({ ...expData, description: e.target.value });
							}}
							placeholder="Descripción de la experiencia"
						/>
					</div>
					<div>
						<input
							type="text"
							name="price"
							value={expData.price}
							onChange={(e) => {
								setExpData({ ...expData, price: e.target.value });
							}}
							placeholder="Precio de la experiencia"
						/>
					</div>
					<div>
						<input
							type="text"
							name="totalPlaces"
							value={expData.totalPlaces}
							onChange={(e) => {
								setExpData({ ...expData, totalPlaces: e.target.value });
							}}
							placeholder="Plazas por día"
						/>
					</div>
					<div>
						<input
							type="text"
							name="starDate"
							value={expData.startDate}
							onChange={(e) => {
								setExpData({ ...expData, startDate: e.target.value });
							}}
							placeholder="Fecha inicio experiencia"
						/>
						<input
							type="text"
							name="endDate"
							value={expData.endDate}
							onChange={(e) => {
								setExpData({ ...expData, endDate: e.target.value });
							}}
							placeholder="Fecha fin experiencia"
						/>
					</div>
					<div>
						<input
							type="text"
							name="location"
							value={expData.location}
							onChange={(e) => {
								setExpData({ ...expData, location: e.target.value });
							}}
							placeholder="Lugar de la experiencia"
						/>
						<input
							type="text"
							name="coords"
							value={expData.coords}
							onChange={(e) => {
								setExpData({ ...expData, coords: e.target.value });
							}}
							placeholder="Fecha inicio experiencia"
						/>
					</div>
					<div>
						<textarea
							type="text"
							name="condiciones"
							value={expData.conditions}
							onChange={(e) => {
								setExpData({ ...expData, conditions: e.target.value });
							}}
							placeholder="Condiciones de la experiencia"
						/>
					</div>
					<div>
						<textarea
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
							<p className="title-center">Imagen de la categoría</p>

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
					<button type="submit" className="generalbutton">
						Crear
					</button>
				</form>
			</section>
		</>
	);
};
