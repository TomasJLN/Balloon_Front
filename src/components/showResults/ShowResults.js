import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFiltered } from "../../hooks/useFiltered";
import { ExperienceCard } from "../experienceCard/ExperienceCard";
import { toast } from "react-toastify";
import "./show-results.css";

const ShowResults = ({
	toSearchTit,
	toSearch,

	catTit,
	setCatTit,
}) => {
	let resultTitle = "";

	if (catTit && !toSearchTit) {
		resultTitle = catTit;
	} else if (toSearchTit && !catTit) {
		resultTitle = toSearch;
	} else if (toSearchTit && catTit) {
		resultTitle = catTit;
	} else {
		resultTitle = "Destacados";
	}

	console.log("catTit", catTit);
	console.log("toSearchTit", toSearchTit);

	const location = useLocation();

	const [btnMore, setBtnMore] = useState(false);
	const [expByPage, setExpByPage] = useState(6);
	const [lastIndex, setLastIndex] = useState(expByPage);
	const [windowWidth, setWindowWidth] = useState(window.outerWidth);

	const q = location.search;

	let query = q;

	query.length < 1 ? (query = "?experience=&active=1&featured=1") : (query = q);

	const { filtered, loading, error } = useFiltered(query);

	const pagFiltered = filtered.slice(0, lastIndex);

	useEffect(() => {
		const getWindowWidth = () => {
			windowWidth > 767 ? setExpByPage(12) : setExpByPage(6);
		};
		getWindowWidth();
	}, []);

	useEffect(() => {
		error && toast.error(error);
	}, [error]);

	useEffect(() => {
		setLastIndex(expByPage);
		setBtnMore(true);
	}, [query, expByPage, setExpByPage, windowWidth]);

	useEffect(() => {
		if (filtered.length > 0 && lastIndex >= filtered.length) {
			setBtnMore(false);
		}
	}, [filtered, lastIndex]);

	const handleLoadMore = () => {
		if (lastIndex >= filtered.length) {
			setBtnMore(false);
		} else {
			setBtnMore(true);
			setLastIndex(lastIndex + expByPage);
		}
	};

	return (
		<>
			{loading ? (
				<div className="spinner-container">
					<h1>Loading...</h1>
				</div>
			) : (
				<>
					{" "}
					{pagFiltered.length > 0 && (
						<h2>Resultado para la búsqueda: {resultTitle}</h2>
					)}
					<div className="card-deck fade_in">
						{pagFiltered.length > 0 ? (
							pagFiltered.map((exp) => (
								<ExperienceCard key={exp.id} exp={exp} />
							))
						) : (
							<h1 className="info fade_in">
								No se encontraron resultados para: {toSearch}
							</h1>
						)}
					</div>
					{btnMore && (
						<button onClick={handleLoadMore} className="show-more">
							Cargar más...
						</button>
					)}
				</>
			)}
		</>
	);
};

export default ShowResults;
