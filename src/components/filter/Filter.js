import { Formik, Form, Field } from "formik";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButton from "../toggleButton/ToggleButton";
import SearchBar from "./SearchBar";
import RatingSearch from "./RatingSearch";
import DateSearch from "./DateSearch";
import CategorySearch from "./CategorySearch";
import LocationSearch from "./LocationSearch";
import PriceSearch from "./PriceSearch";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "./filter.css";
import { AiOutlineControl } from "react-icons/ai";

const Filter = ({ catTit, setCatTit }) => {
	const datePickerRef = useRef();
	const navigate = useNavigate();

	const [rating, setRating] = useState("");
	const [searchCat, setSearchCat] = useState("");
	const [searchLoc, setSearchLoc] = useState("");
	const [searchPrice, setSearchPrice] = useState([1, 1000]);
	const [isToggleOn, setIsToggleOn] = useState(false);
	const [isButtonToggleOn, setIsButtonToggleOn] = useState(false);
	const [searchDate, setSearchDate] = useState("");
	const [toSearch, setToSearch] = useState("");
	const [order, setOrder] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();

		setIsButtonToggleOn(true);
		navigate(`/allFilter?experience=${toSearch}`);
	};

	const handleToggle = (e) => {
		e.preventDefault();

		setIsToggleOn(!isToggleOn);
	};
	let query = "/";

	console.log("ORDEEER", order);

	useEffect(() => {
		query = toSearch ? `/allFilter?experience=${toSearch}` : `/?`;
		query += order ? `&direction=${order}` : "";
		query += searchPrice[0] === 1 ? "" : `&start_price=${searchPrice[0]}`;
		query += searchPrice[1] === 1000 ? "" : `&end_price=${searchPrice[1]}`;
		query += searchCat ? `&category=${searchCat}` : "";
		query += searchLoc ? `&location=${searchLoc}` : "";
		query += searchDate ? `&start=${searchDate[0]}` : "";
		query += searchDate.length > 1 ? `&end=${searchDate[1]}` : "";
		query += rating ? `&review?searchByExp=${rating}` : "";
		navigate(query);
	}, [order, searchCat, searchLoc, searchPrice, searchDate, rating]);

	useEffect(() => {
		setIsButtonToggleOn(false);
		setIsToggleOn(false);
		navigate("/");
	}, [toSearch]);

	return (
		<>
			<Formik>
				{() => (
					<Form onSubmit={handleSubmit}>
						<div className="hero">
							<div id="principal">
								{catTit ? (
									<h1>Categoría {catTit}</h1>
								) : (
									<h1>Encuentra la experiencia que estabas buscando</h1>
								)}
							</div>

							<div className="searchContainer">
								<SearchBar toSearch={toSearch} setToSearch={setToSearch} />

								<DateSearch
									datePickerRef={datePickerRef}
									searchDate={searchDate}
									setSearchDate={setSearchDate}
								/>
							</div>
						</div>
						{!isButtonToggleOn ? (
							""
						) : (
							<div className="toggleContainer">
								{!isToggleOn ? (
									<button
										style={{
											display: "flex",
											alignItems: "center",
											padding: "5px 10px",
											fontSize: "17px",
											backgroundColor: "white",
											borderRadius: "4px",
										}}
										onClick={handleToggle}
									>
										Más filtros
										<AiOutlineControl style={{ fontSize: "25px" }} />
									</button>
								) : (
									<button
										style={{
											display: "flex",
											alignItems: "center",
											padding: "5px 10px",
											fontSize: "17px",
											backgroundColor: "white",
											borderRadius: "4px",
										}}
										onClick={handleToggle}
									>
										Cerrar filtros{" "}
										<AiOutlineControl style={{ fontSize: "25px" }} />
									</button>
								)}
							</div>
						)}

						{isToggleOn && (
							<div className="filterContainer slideInDownfade_in">
								{!catTit && (
									<CategorySearch
										searchCat={searchCat}
										setSearchCat={setSearchCat}
									/>
								)}
								<LocationSearch
									searchLoc={searchLoc}
									setSearchLoc={setSearchLoc}
								/>
								<PriceSearch
									searchPrice={searchPrice}
									setSearchPrice={setSearchPrice}
								/>
								<RatingSearch rating={rating} setRating={setRating} />
							</div>
						)}
						<div className="resultTit">
							{isButtonToggleOn ? (
								<h2>Resultado de búsqueda para: {toSearch}</h2>
							) : (
								<h2>No te pierdas nuestras experiencias destacadas...</h2>
							)}
						</div>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
							}}
							className="order"
						>
							<label>Ordenar por:</label>
							<Field
								className="order"
								value={order}
								onChange={(e) => {
									setOrder(e.target.value);
								}}
								name="locationfilter"
								as="select"
							>
								<option className="order" value="ASC">
									Mas baratos primero
								</option>

								<option className="order" value="DESC">
									Mas caros primero
								</option>
							</Field>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Filter;
