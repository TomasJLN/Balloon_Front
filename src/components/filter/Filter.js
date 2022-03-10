import { Formik, Form } from "formik";
import queryString from "query-string";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleButton from "../toggleButton/ToggleButton";
import SearchBar from "./SearchBar";
import RatingSearch from "./RatingSearch";
import DateSearch from "./DateSearch";
import CategorySearch from "./CategorySearch";
import LocationSearch from "./LocationSearch";
import PriceSearch from "./PriceSearch";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "./filter.css";

const Filter = () => {
	const datePickerRef = useRef();
	const navigate = useNavigate();

	const [rating, setRating] = useState("");
	const [searchCat, setSearchCat] = useState("");
	const [searchLoc, setSearchLoc] = useState("");
	const [searchPrice, setSearchPrice] = useState([1, 1000]);
	const [isToggleOn, setIsToggleOn] = useState(false);
	const [searchDate, setSearchDate] = useState("");
	const [toSearch, setToSearch] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleToggle = () => {
		setIsToggleOn(!isToggleOn);
	};

	useEffect(() => {
		let query = toSearch ? `/allFilter?experience=${toSearch}` : `/?`;
		query += searchPrice[0] === 1 ? "" : `&start_price=${searchPrice[0]}`;
		query += searchPrice[1] === 1000 ? "" : `&end_price=${searchPrice[1]}`;
		query += searchCat ? `&category=${searchCat}` : "";
		query += searchLoc ? `&location=${searchLoc}` : "";
		query += searchDate ? `&start=${searchDate[0]}` : "";
		query += searchDate.length > 1 ? `&end=${searchDate[1]}` : "";
		query += rating ? `&review?searchByExp=${rating}` : "";
		navigate(query);
	}, [searchCat, searchLoc, searchPrice, searchDate, rating, toSearch]);

	return (
		<>
			<Formik>
				{() => (
					<Form onSubmit={handleSubmit}>
						<div className="hero">
							<div>
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
						<div className="toggleContainer">
							<ToggleButton handleToggle={handleToggle} />
						</div>

						{isToggleOn && (
							<div className="filterContainer slideInDownfade_in">
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
							</div>
						)}
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Filter;
