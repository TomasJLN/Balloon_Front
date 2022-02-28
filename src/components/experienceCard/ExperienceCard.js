import { useEffect, useState } from "react";
import { FaSearchLocation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useGetReviews } from "../../hooks/useGetReviews";
import { Rating } from "react-simple-star-rating";
import "./experience-card.css";

export const ExperienceCard = ({ exp }) => {
  const coords = exp.coords.replace(/\s+/g, "");
  const url = `https://www.google.es/maps/@${coords},19z`;
  const navigate = useNavigate();
  const { reviews, error, loading } = useGetReviews(exp.id);
  const [avgRatin, setAvgRatin] = useState(0);

  useEffect(() => {
    window.removeEventListener("scroll", onloadstart);
  }, []);

  useEffect(() => {
    !error && setAvgRatin(reviews.reduce((acc, exp) => acc + exp.score, 0));
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
        <h2 className="card-title">{exp.title}</h2>
        {
          <p>
            <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="card-location"
            >
              <FaSearchLocation className="icon-search" />
              {exp.location}
            </a>
          </p>
        }
        <p className="stars-row">
          {avgRatin !== 0 && (
            <>
              <Rating
                ratingValue={avgRatin}
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
