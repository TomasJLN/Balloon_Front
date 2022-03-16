import { Rating } from "react-simple-star-rating";

const RatingSearch = ({ rating, setRating }) => {
  return (
    <div className="ratingSearch">
      <div className="generalFilter">
        <Rating
          fillColor="rgb(var(--primary-color-hard))"
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
