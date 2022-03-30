import moment from "moment";
import { toast } from "react-toastify";
import { Rating } from "react-simple-star-rating";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TokenContext } from "../../contexts/TokenContext";
import { useBookingDetails } from "../../hooks/useBookingDetails";
import { useGetExperienceOpinion } from "../../hooks/useGetExperienceOpinion";
import fetcher from "../../helpers/fetcher";
import "./rate-experience.css";

export const RateExperience = () => {
  const { ticket } = useParams();
  const [token, setToken] = useContext(TokenContext);
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
      {review.voted === 1 ? (
        <header id="rate-exp-header-voted">
          EXPERIENCIA VALORADA{" "}
          <button
            className="btn-back"
            onClick={() => {
              navigate(-1);
            }}
          >
            ↩️ back
          </button>
        </header>
      ) : (
        <header id="rate-exp-header-unvoted">
          EXPERIENCIA POR VALORAR{" "}
          <button
            className="btn-back"
            onClick={() => {
              navigate(-1);
            }}
          >
            ↩️ back
          </button>
        </header>
      )}

      <section id="rate-exp">
        <h3 className="title-rate-exp">{exDetails?.title}</h3>
        <h4>
          Fecha experiencia:{" "}
          {moment(exDetails?.dateExperience).format("YYYY-MM-DD")}
        </h4>

        <form onSubmit={handleNewReview}>
          <textarea
            type="text"
            name="opinion"
            value={review?.description}
            className="rateExperience-textarea"
            onChange={(e) => {
              setReview({ ...review, description: e.target.value });
            }}
            placeholder="Opina sobre tu experiencia"
          ></textarea>
          <Rating
            className="stars-rate-experience"
            onClick={handleRating}
            ratingValue={review?.score}
            showTooltip
            tooltipArray={[
              "Agónico",
              "Mal",
              "Normal",
              "Fantástico",
              "Memorable",
            ]}
          />

          <div className="btn-bottom">
            <button
              type="submit"
              className="generalButton"
              onClick={handleNewReview}
            >
              Enviar
            </button>
          </div>
        </form>
      </section>
    </div>
  ) : (
    <div className="form-wrapper">
      <div className="text-warning">Debes estar registrado para valorar</div>
    </div>
  );
};
