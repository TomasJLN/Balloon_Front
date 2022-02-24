import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form } from "formik";
import queryString from "query-string";
import SearchBar from "./SearchBar";
import RatingSearch from "./RatingSearch";
import DateSearch from "./DateSearch";
import CategorySearch from "./CategorySearch";
import LocationSearch from "./LocationSearch";
import PriceSearch from "./PriceSearch";
import "./filter.css";
import "react-multi-date-picker/styles/layouts/mobile.css";

const Filter = () => {
	const datePickerRef = useRef();

	const navigate = useNavigate();
	const location = useLocation();

	let { experience } = queryString.parse(location.search);
	experience = experience ? experience : "";

	const [rating, setRating] = useState("");
	const [searchCat, setSearchCat] = useState("");
	const [searchLoc, setSearchLoc] = useState("");
	const [searchStartPrice, setSearchStartPrice] = useState("0");
	const [searchEndPrice, setSearchEndPrice] = useState("");
	const [searchDate, setSearchDate] = useState("");
	const [toSearch, setToSearch] = useState(experience ? experience : "");

	useEffect(() => {
		if (location.pathname === "/") resetInput();
	}, [location.pathname]);

	const resetInput = () => {
		setToSearch("");
		setSearchCat("");
		setSearchLoc("");
		setSearchStartPrice("");
		setSearchDate("");
		setRating("");
	};

	const handleSubmit = (e) => {
		toSearch && navigate(`/allFilter?experience=${toSearch}`);
		e.preventDefault();

		resetInput();
	};

	useEffect(() => {
		let query = `/allFilter?experience=${experience}`;
		query += searchStartPrice ? `&start_price=${searchStartPrice}` : "";
		query += searchEndPrice ? `&end_price=${searchEndPrice}` : "";
		query += searchCat ? `&category=${searchCat}` : "";
		query += searchLoc ? `&location=${searchLoc}` : "";
		query += searchDate ? `&start=${searchDate[0]}` : "";
		query += searchDate.length > 1 ? `&end=${searchDate[1]}` : "";
		query += rating ? `&review?searchByExp=${rating}` : "";
		toSearch && navigate(`/allFilter?experience=${toSearch}`);

		navigate(query);
	}, [
		searchCat,
		searchLoc,
		searchStartPrice,
		searchEndPrice,
		experience,
		searchDate,
		rating,
		toSearch,
	]);

	return (
		<>
			<Formik>
				{() => (
					<Form onSubmit={handleSubmit}>
						<div className="hero">
							<div className="searchContainer">
								<SearchBar toSearch={toSearch} setToSearch={setToSearch} />

								<DateSearch
									datePickerRef={datePickerRef}
									searchDate={searchDate}
									setSearchDate={setSearchDate}
								/>
							</div>
						</div>

						<div className="filterContainer">
							<div className="selectFilter">
								<CategorySearch
									searchCat={searchCat}
									setSearchCat={setSearchCat}
								/>
								<LocationSearch
									searchLoc={searchLoc}
									setSearchLoc={setSearchLoc}
								/>
							</div>
							<div className="priceRateFilter">
								<PriceSearch
									searchStartPrice={searchStartPrice}
									setSearchStartPrice={setSearchStartPrice}
									searchEndPrice={searchEndPrice}
									setSearchEndPrice={setSearchEndPrice}
								/>

								<RatingSearch rating={rating} setRating={setRating} />
							</div>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Filter;
