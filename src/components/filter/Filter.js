import { Formik, Form, Field } from "formik";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import RatingSearch from "./RatingSearch";
import DateSearch from "./DateSearch";
import CategorySearch from "./CategorySearch";
import LocationSearch from "./LocationSearch";
import PriceSearch from "./PriceSearch";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "./filter.css";

const Filter = ({
	toSearchTit,
	setToSearchTit,
	toSearch,
	setToSearch,
	searchCat,
	setSearchCat,
	isFilterOn,
	setIsFilterOn,
}) => {
	const datePickerRef = useRef();
	const navigate = useNavigate();

	const [rating, setRating] = useState("");
	const [searchLoc, setSearchLoc] = useState("");
	const [searchPrice, setSearchPrice] = useState([1, 1000]);
	const [searchDate, setSearchDate] = useState("");
	const [order, setOrder] = useState("");

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	};

	const resetFilter = () => {
		setSearchCat("");
		setSearchLoc("");
		setSearchPrice([1, 1000]);
		setRating("");
		setSearchDate("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		resetFilter();

		setToSearchTit(true);
		navigate(`/allFilter?experience=${toSearch}`);

		scrollToBottom();
		setIsFilterOn(true);
	};

	let query = "/";

	useEffect(() => {
		query = toSearch ? `/allFilter?experience=${toSearch}` : `/?`;
		query += order ? `&direction=${order}` : "";
		query += searchPrice[0] === 1 ? "" : `&start_price=${searchPrice[0]}`;
		query += searchPrice[1] === 1000 ? "" : `&end_price=${searchPrice[1]}`;
		query += searchCat ? `&category=${searchCat}` : "";
		query += searchLoc ? `&location=${searchLoc}` : "";
		query += searchDate ? `&start=${searchDate[0]}` : "";
		query += searchDate.length > 1 ? `&end=${searchDate[1]}` : "";
		query += rating ? `&ratin=${rating}` : "";
		navigate(query);
	}, [order, searchCat, searchLoc, searchPrice, searchDate, rating]);

	return (
		<>
			<Formik>
				{() => (
					<Form onSubmit={handleSubmit}>
						<div className="hero">
							<div id="principal">
								<h1>Encuentra la experiencia que estabas buscando</h1>
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

						{isFilterOn && (
							<div
								ref={messagesEndRef}
								className="filterContainer slideInDownfade_in"
							>
								<CategorySearch
									searchCat={searchCat}
									setSearchCat={setSearchCat}
								/>

								<LocationSearch
									searchLoc={searchLoc}
									setSearchLoc={setSearchLoc}
								/>
								<PriceSearch
									searchPrice={searchPrice}
									setSearchPrice={setSearchPrice}
								/>
								<RatingSearch rating={rating} setRating={setRating} />
								<div className="clear-filter">
									<button
										className="filterButton"
										onClick={(e) => {
											e.preventDefault();
											resetFilter();
											setToSearch("");
										}}
									>
										Limpiar filtro
									</button>
								</div>
							</div>
						)}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-start",
								backgroundColor: "white",
								padding: "1rem",
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
