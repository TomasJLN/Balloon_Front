import moment from "moment";
import { Rating } from "react-simple-star-rating";
import "./reviews.css";

export const Reviews = ({ id, reviews }) => {
	//En caso de querer sólo 3 reviews por si existen muchas
	//const fewReviews = reviews.slice(0, 3);

	return (
		<div>
			<h2 id="ratin-title">Valoraciones</h2>
			{reviews.map((r) => (
				<div key={r.date} className="others-opinions">
					<Rating
						ratingValue={r.score}
						size="12px"
						className="stars-count-opinions"
						readonly={true}
					/>
					<div className="review-data">
						<q>{r.description}</q>
						<p className="detail-review">
							{r.user} - {moment(r.date).format("YYYY-MM-DD")}
						</p>
					</div>
				</div>
			))}
		</div>
	);
};
