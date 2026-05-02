import { formatDate } from "../../helpers/formatDate";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { FaArrowLeft, FaCalendarAlt, FaCheckCircle, FaRegStar } from "react-icons/fa";
import { TokenContext } from "../../contexts/TokenContext";
import { useBookingDetails } from "../../hooks/useBookingDetails";
import { useGetExperienceOpinion } from "../../hooks/useGetExperienceOpinion";
import fetcher from "../../helpers/fetcher";
import "./rate-experience.css";

export const RateExperience = () => {
  const { ticket } = useParams();
  const [token] = useContext(TokenContext);
  const exDetails = useBookingDetails(ticket, token);
  const [result, setResult] = useState(null);
  const { dataReview, load, err } = useGetExperienceOpinion(ticket);
  const [review, setReview] = useState(dataReview);
  const [loading, setLoading] = useState(load);
  const [error, setError] = useState(err);
  const navigate = useNavigate();

  useEffect(() => {
    setReview(dataReview);
    setLoading(load);
    setError(err);
  }, [dataReview]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRating = (rate) => {
    setReview({ ...review, score: rate });
  };

  const handleNewReview = (e) => {
    e.preventDefault();
    setError(null);
    fetcher(setResult, setError, setLoading, `review/${ticket}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({
        ...review,
      }),
    });
  };

  useEffect(() => {
    toast.error(error);
    return () => {
      setError(null);
    };
  }, [error]);

  useEffect(() => {
    result && !error && toast.success(result) && navigate(-1);
    return () => {
      setResult(null);
    };
  }, [result]);

  return token ? (
    <div className="rate-experience">
      <div className="rate-experience-container">
        <header className="rate-experience-header">
          <div>
            <p className="rate-experience-kicker">
              {review?.voted === 1 ? "Opinión registrada" : "Experiencia por valorar"}
            </p>
            <h1 id={review?.voted === 1 ? "rate-exp-header-voted" : "rate-exp-header-unvoted"}>
              {review?.voted === 1 ? "Experiencia valorada" : "Cuéntanos cómo fue"}
            </h1>
          </div>
          <button
            className="rate-experience-back"
            onClick={() => {
              navigate(-1);
            }}
          >
            <FaArrowLeft aria-hidden="true" />
            Volver
          </button>
        </header>

        <section id="rate-exp" className="rate-experience-card">
          <figure className="rate-experience-media">
            <img
              src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${exDetails?.photo || "NA.png"}`}
              alt={exDetails?.title}
            />
          </figure>

          <div className="rate-experience-content">
            <div className="rate-experience-summary">
              <span className="rate-experience-status">
                {review?.voted === 1 ? (
                  <FaCheckCircle aria-hidden="true" />
                ) : (
                  <FaRegStar aria-hidden="true" />
                )}
                {review?.voted === 1 ? "Ya valorada" : "Pendiente de valoración"}
              </span>

              <h2 className="title-rate-exp">{exDetails?.title}</h2>
              <p className="rate-experience-date">
                <FaCalendarAlt aria-hidden="true" />
                Fecha experiencia: {formatDate(exDetails?.dateExperience, "yyyy-MM-dd")}
              </p>
            </div>

            <form className="rate-experience-form" onSubmit={handleNewReview}>
              <label htmlFor="rate-opinion">Tu opinión</label>
              <textarea
                id="rate-opinion"
                type="text"
                name="opinion"
                value={review?.description || ""}
                className="rateExperience-textarea"
                onChange={(e) => {
                  setReview({ ...review, description: e.target.value });
                }}
                placeholder="Opina sobre tu experiencia"
              ></textarea>

              <div className="rate-experience-rating">
                <span>Tu puntuación</span>
                <Rating
                  className="stars-rate-experience"
                  onClick={handleRating}
                  ratingValue={review?.score || 0}
                  showTooltip
                  tooltipArray={[
                    "Agónico",
                    "Mal",
                    "Normal",
                    "Fantástico",
                    "Memorable",
                  ]}
                />
              </div>

              <div className="btn-bottom">
                <button type="submit" className="generalButton" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar valoración"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  ) : (
    <div className="form-wrapper">
      <div className="text-warning">Debes estar registrado para valorar</div>
    </div>
  );
};
