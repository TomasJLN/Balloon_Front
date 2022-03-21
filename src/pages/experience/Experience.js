import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExperience } from "../../hooks/useExperience";
import { useGetReviews } from "../../hooks/useGetReviews";
import { Reviews } from "../../components/reviews/Reviews";
import { CarouselSimilar } from "../../components/carouselSimilar/CarouselSimilar";
import { scrollToTop } from "../../helpers/scrollToTop";
import Mapa from "../../components/Mapa";
import "./experience.css";

const Experience = () => {
	const { id } = useParams();

	const {
		idCategory,
		title,
		description,
		price,
		location,
		coords,
		photo,
		endDate,

		startDate,
		conditions,
		normatives,
	} = useExperience(id);

	let url = `https://www.google.es/maps/@${coords},19z`;

	url = url.replace(/ +/g, "");

	let infoExperience = [];
	infoExperience.push({ title: "Condiciones", content: conditions });
	infoExperience.push({ title: "Normativas", content: normatives });

	const navigate = useNavigate();
	const { reviews, error, loading } = useGetReviews(id);
	const [avgRatin, setAvgRatin] = useState(0);

	useEffect(() => {
		reviews.length !== 0 &&
			setAvgRatin(
				reviews.reduce((acc, exp) => acc + exp.score, 0) / reviews.length
			);
		reviews.length === 0 && setAvgRatin(0);
	}, [reviews]);

	useEffect(() => {
		scrollToTop();
	}, [id]);

	return (
		<div className="exp-container">
			<div className="figure-desc-container">
				<div className="figure-container">
					<figure>
						{photo ? (
							<img
								src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo}`}
								alt={title}
								className="exp-pic"
							/>
						) : (
							<img
								src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
								alt={title}
								className="exp-pic"
							/>
						)}
					</figure>
				</div>

				<div className="description-container">
					<h1 id="exp-title">{title}</h1>

					<div className="exp-description">
						<p>{description}</p>

						<div>
							<div className="exp-date">
								<a
									href={url}
									target="_blank"
									rel="noreferrer noopener"
									className="card-location"
								>
									{" "}
									<div className="exp-location">
										En <strong>{location}</strong> desde{" "}
										<strong>{moment(startDate).format("DD-MM-YYYY")}</strong>{" "}
										hasta{" "}
										<strong>{moment(endDate).format("DD-MM-YYYY")}</strong>
									</div>
								</a>
							</div>
						</div>

						<div className="ratin-buy-button">
							<p id="precio-exp">{price} €</p>
							<button
								className="generalButton"
								onClick={(e) => {
									navigate(`/booking/${id}`);
								}}
							>
								Comprar
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="ratin-info">
				{avgRatin !== 0 ? (
					<Reviews id={id} reviews={reviews} />
				) : (
					<h2 id="ex-sim">Experiencia sin valoraraciones</h2>
				)}
			</div>
			<h2 id="map-title">¿Cómo llegar?</h2>
			<Mapa photo={photo} title={title} coords={coords} url={url} />
			<div className="exp-info-container"></div>

			<div>
				<h2 id="ex-sim">Otras experiencias que podrían interesarte</h2>
				<div>
					<CarouselSimilar
						id={id}
						reviews={reviews}
						avgRatin={avgRatin}
						idCategory={idCategory}
					/>
				</div>
			</div>
		</div>
	);
};

export default Experience;
