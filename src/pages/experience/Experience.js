import { useNavigate, useParams } from 'react-router-dom';
import Accordion from '../../components/accordion/Accordion';
import { useExperience } from '../../hooks/useExperience';
import { Rating } from 'react-simple-star-rating';
import './experience.css';
import { useGetReviews } from '../../hooks/useGetReviews';
import { useEffect, useState } from 'react';
import { Reviews } from '../../components/reviews/Reviews';

const Experience = () => {
  const { id } = useParams();

  const {
    category,
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

  let infoExperience = [];
  infoExperience.push({ title: 'Condiciones', content: conditions });
  infoExperience.push({ title: 'Normativas', content: normatives });

  const navigate = useNavigate();
  const { reviews, error, loading } = useGetReviews(id);
  const [avgRatin, setAvgRatin] = useState(0);

  useEffect(() => {
    !error && setAvgRatin(reviews.reduce((acc, exp) => acc + exp.score, 0));
  }, [reviews]);

  return (
    <div className="single-card">
      <h1 className="title">{title}</h1>
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
      <div className="rating-back">
        <p>
          {' '}
          {avgRatin !== 0 && (
            <Rating
              ratingValue={avgRatin}
              size="16px"
              showTooltip
              tooltipClassName="stars-count"
              readonly={true}
            />
          )}
        </p>
        <button
          className="btn-back"
          onClick={() => {
            navigate(-1);
          }}
        >
          ↩️ back
        </button>
      </div>
      <div className="exp-description">
        <p>Descripción: </p>
        <p>{description}</p>
      </div>
      <h2 id="precio-exp">{price} €</h2>

      <div className="ratin-comprar">
        <button
          className="btn-comprar"
          onClick={(e) => {
            navigate(`/booking/${id}`);
          }}
        >
          Comprar
        </button>
      </div>
      <div className="accordion-section">
        {infoExperience.map(({ title, content }) => (
          <Accordion key={title} title={title} content={content} />
        ))}
      </div>
      <hr />
      {avgRatin !== 0 && <Reviews id={id} reviews={reviews} />}
    </div>
  );
};

export default Experience;
