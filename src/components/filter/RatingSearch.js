import { Rating } from "react-simple-star-rating";

const RatingSearch = ({ rating, setRating }) => {
	return (
		<div className="ratingSearch">
			<Rating
				fillColor="black"
				tooltipDefaultText="Por puntos"
				onClick={setRating}
				ratingValue={rating}
				size={25}
			/>
		</div>
	);
};

export default RatingSearch;
