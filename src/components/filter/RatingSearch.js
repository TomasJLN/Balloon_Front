import { Rating } from "react-simple-star-rating";

const RatingSearch = ({ rating, setRating }) => {
	return (
		<div className="ratingSearch">
			<p>Valoración</p>
			<div>
				<Rating
					fillColor="rgb(var(--primary-color-hard))"
					tooltipDefaultText="Por puntos"
					onClick={setRating}
					ratingValue={rating}
					size={20}
				/>
			</div>
		</div>
	);
};

export default RatingSearch;
