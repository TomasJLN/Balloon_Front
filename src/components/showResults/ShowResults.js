import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useFiltered } from "../../hooks/useFiltered";
import { ExperienceCard } from "../experienceCard/ExperienceCard";
import { toast } from "react-toastify";
import "./show-results.css";
import { PopupRegisterOk } from "../popupRegisterOk/PopupRegisterOk";

const ShowResults = ({ toSearchTit, toSearch, searchCat, setSearchCat }) => {
	const location = useLocation();

	const [btnMore, setBtnMore] = useState(false);
	const [expByPage, setExpByPage] = useState(6);
	const [lastIndex, setLastIndex] = useState(expByPage);
	const [windowWidth, setWindowWidth] = useState(window.outerWidth);
	const [registerOk, setRegisterOk] = useState(false);

	const q = location.search;

	let query = q;

	useEffect(() => {
		if (q.includes("?register=ok")) setRegisterOk(true);
		return () => {
			setRegisterOk(false);
		};
	}, []);

	let resultTitle = "Nuestras experiencias destacadas...";

	if (searchCat) {
		resultTitle = `Categoría ${searchCat}`;
	} else if (toSearch) {
		resultTitle = `Resultado de búsqueda para: ${toSearch}`;
	} else if (!toSearch) {
		resultTitle = "Experiencias destacadas";
	}

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
				<div className="loading">
					<h1>Cargando...</h1>
				</div>
			) : (
				<>
					{registerOk && <PopupRegisterOk setRegisterOk={setRegisterOk} />}
					{pagFiltered.length > 0 && (
						<h2 className="result-title">{resultTitle}</h2>
					)}
					<div className="card-deck fade_in">
						{pagFiltered.length > 0 ? (
							pagFiltered.map((exp) => (
								<ExperienceCard key={exp.id} exp={exp} />
							))
						) : (
							<h2 className="info show_no_results">
								No se encontraron resultados
							</h2>
						)}
					</div>
					{btnMore && pagFiltered.length > 0 && (
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
