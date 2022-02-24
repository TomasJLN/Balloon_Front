import { Rating } from "react-simple-star-rating";

const RatingSearch = ({ rating, setRating }) => {
	return (
		<div className="ratingSearch">
			<p>Por valoración:</p>
			<Rating
				fillColor="black"
				tooltipDefaultText="Por puntos"
				onClick={setRating}
				ratingValue={rating}
			/>
		</div>
	);
};

export default RatingSearch;
