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
	const [searchPrice, setSearchPrice] = useState([0, 1000]);

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
		query += searchPrice[0] ? `&start_price=${searchPrice[0]}` : "";
		query += searchPrice[1] ? `&end_price=${searchPrice[1]}` : "";
		query += searchCat ? `&category=${searchCat}` : "";
		query += searchLoc ? `&location=${searchLoc}` : "";
		query += searchDate ? `&start=${searchDate[0]}` : "";
		query += searchDate.length > 1 ? `&end=${searchDate[1]}` : "";
		query += rating ? `&review?searchByExp=${rating}` : "";
		toSearch && navigate(`/allFilter?experience=${toSearch}`);

		navigate(query);
	}, [searchCat, searchLoc, searchPrice, experience, searchDate, rating]);
	console.log("SEARCH PRICE", searchPrice);

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
					</Form>
				)}
			</Formik>
		</>
	);
};

export default Filter;
