import moment from 'moment';
import { Rating } from 'react-simple-star-rating';
import './reviews.css';

export const Reviews = ({ id, reviews }) => {
  return (
    <div>
      <h3 className="title-center">OPINIONES</h3>
      {reviews.map((r) => (
        <>
          <div className="others-opinions">
            <Rating
              ratingValue={r.score}
              size="12px"
              className="stars-count-opinions"
              readonly={true}
            />
            <div className="review-data">
              <q>{r.description}</q>
              <p className="detail-review">
                {r.user} - {moment(r.date).format('YYYY-MM-DD')}
              </p>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
