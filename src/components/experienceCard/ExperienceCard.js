import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGetReviews } from "../../hooks/useGetReviews";
import { Rating } from "react-simple-star-rating";
import { MdLocationPin } from "react-icons/md";
import "./experience-card.css";

export const ExperienceCard = ({ exp, priority = false }) => {
	const coords = exp.coords.replace(/\s+/g, "");
	const url = `https://www.google.es/maps/@${coords},19z`;
	const photo = exp.photo || "NA.png";
	const thumbnailUrl = `${process.env.REACT_APP_BACKEND_URL}/uploads/thumbs/${encodeURIComponent(photo)}`;
	const originalUrl = `${process.env.REACT_APP_BACKEND_URL}/uploads/${encodeURIComponent(photo)}`;
	const navigate = useNavigate();
	const { reviews, error, loading } = useGetReviews(exp.id);
	const [avgRatin, setAvgRatin] = useState(0);
	const [imageUrl, setImageUrl] = useState(thumbnailUrl);

	useEffect(() => {
		!error && setAvgRatin(exp.ratin);
	}, [reviews, error, exp.ratin]);

	useEffect(() => {
		setImageUrl(thumbnailUrl);
	}, [thumbnailUrl]);

	return (
		<div
			className="card fade_in"
			onClick={(e) => {
				navigate(`/booking/${exp.id}`);
			}}
		>
			<img
				src={imageUrl}
				alt={exp.title}
				className="card-thumbnail"
				width="340"
				height="200"
				loading={priority ? "eager" : "lazy"}
				fetchpriority={priority ? "high" : "auto"}
				decoding={priority ? "sync" : "async"}
				onError={() => {
					if (imageUrl !== originalUrl) setImageUrl(originalUrl);
				}}
			/>
			<div className="card-details">
				<h3 className="card-title">{exp.title}</h3>
				<p>
					<a
						href={url}
						target="_blank"
						rel="noreferrer noopener"
						className="card-location"
					>
						<MdLocationPin className="icon-search" />
						{exp.location}
					</a>
				</p>
				<p className="stars-row">
					{avgRatin !== 0 && (
						<>
							<Rating
								ratingValue={exp.ratin}
								size="16px"
								tooltipClassName="stars-count"
								readonly={true}
							/>
							<span className="counter-reviews">({reviews.length})</span>
						</>
					)}
				</p>
				<p className="card-price">{exp.price} €</p>
			</div>
		</div>
	);
};
