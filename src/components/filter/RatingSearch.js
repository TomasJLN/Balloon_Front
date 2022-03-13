import { Rating } from "react-simple-star-rating";

const RatingSearch = ({ rating, setRating }) => {
	return (
		<div className="ratingSearch">
			<div className="generalFilter">
				<Rating
					fillColor="rgb(255, 85, 58)"
					tooltipDefaultText="Por puntos"
					onClick={setRating}
					ratingValue={rating}
					size={25}
				/>
			</div>
		</div>
	);
};

export default RatingSearch;
