import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetReviews } from "../../hooks/useGetReviews";
import { Rating } from "react-simple-star-rating";
import { MdLocationPin } from "react-icons/md";
import "./experience-card.css";

export const ExperienceCard = ({ exp }) => {
  const coords = exp.coords.replace(/\s+/g, "");
  const url = `https://www.google.es/maps/@${coords},19z`;
  const navigate = useNavigate();
  const { reviews, error, loading } = useGetReviews(exp.id);
  const [avgRatin, setAvgRatin] = useState(0);

  useEffect(() => {
    !error && setAvgRatin(exp.ratin);
  }, [reviews, error]);

  return (
    <div
      className="card fade_in"
      onClick={(e) => {
        navigate(`/experience/${exp.id}`);
      }}
    >
      {exp.photo ? (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${exp.photo}`}
          alt={exp.title}
          className="card-thumbnail"
        />
      ) : (
        <img
          src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
          alt={exp.title}
          className="card-thumbnail"
        />
      )}
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
