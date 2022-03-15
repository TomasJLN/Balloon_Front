import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExperience } from "../../hooks/useExperience";
import { useGetReviews } from "../../hooks/useGetReviews";
import { Reviews } from "../../components/reviews/Reviews";
import { CarouselSimilar } from "../../components/carouselSimilar/CarouselSimilar";
import Accordion from "../../components/accordion/Accordion";
import { scrollToTop } from "../../helpers/scrollToTop";
import Mapa from "../../components/Mapa";
import { MdLocationPin } from "react-icons/md";
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
		<div className="single-card">
			<div>
				<h1 className="title">{title}</h1>
			</div>
			<div className="buttoncontainer">
				<button
					className="buttonback"
					onClick={() => {
						navigate(-1);
					}}
				>
					Volver
				</button>
			</div>
			<figure>
				{photo ? (
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo}`}
						alt={title}
						className="exp-picture"
					/>
				) : (
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
						alt={title}
						className="exp-picture"
					/>
				)}
			</figure>
			<div className="rating-back">
				<p className="stars-row">
					{avgRatin > 0 && (
						<>
							<Rating
								ratingValue={avgRatin}
								size="16px"
								tooltipClassName="stars-count"
								readonly={true}
							/>
							<span className="counter-reviews">({reviews.length})</span>
						</>
					)}
				</p>
			</div>
			<div className="exp-description">
				<p className="description">Descripción general:</p>
				<p>{description}</p>
			</div>
			<div>
				<span>
					<a
						href={url}
						target="_blank"
						rel="noreferrer noopener"
						className="card-location"
					>
						<MdLocationPin className="icon-search" />
						{location}
					</a>
					<Mapa photo={photo} title={title} coords={coords} url={url} />
				</span>
			</div>

			<h2 id="precio-exp">{price} €</h2>

			<div className="ratin-comprar">
				<button
					className="generalButton"
					onClick={(e) => {
						navigate(`/booking/${id}`);
					}}
				>
					Comprar
				</button>
			</div>
			<div>
				{infoExperience.map(({ title, content }) => (
					<Accordion
						className="accordion-section"
						key={title}
						title={title}
						content={content}
					/>
				))}
			</div>
			<hr id="opinions-section" />
			{avgRatin !== 0 && <Reviews id={id} reviews={reviews} />}
			<hr />
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
