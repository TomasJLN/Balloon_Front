import { Rating } from "react-simple-star-rating";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useExperience } from "../../hooks/useExperience";
import { useGetReviews } from "../../hooks/useGetReviews";
import { Reviews } from "../../components/reviews/Reviews";
import { CarouselSimilar } from "../../components/carouselSimilar/CarouselSimilar";
import Accordion from "../../components/accordion/Accordion";
import { scrollToTop } from "../../helpers/scrollToTop";
import Mapa from "../../components/Mapa";
import { MdLocationPin } from "react-icons/md";
import "./experience.css";
import moment from "moment";

const Experience = () => {
  const { id } = useParams();

  const {
    idCategory,
    title,
    description,
    price,
    location,
    coords,
    photo,
    endDate,

    startDate,
    conditions,
    normatives,
  } = useExperience(id);

  let url = `https://www.google.es/maps/@${coords},19z`;

  url = url.replace(/ +/g, "");

  let infoExperience = [];
  infoExperience.push({ title: "Condiciones", content: conditions });
  infoExperience.push({ title: "Normativas", content: normatives });

  const navigate = useNavigate();
  const { reviews, error, loading } = useGetReviews(id);
  const [avgRatin, setAvgRatin] = useState(0);

  useEffect(() => {
    reviews.length !== 0 &&
      setAvgRatin(
        reviews.reduce((acc, exp) => acc + exp.score, 0) / reviews.length
      );
    reviews.length === 0 && setAvgRatin(0);
  }, [reviews]);

  useEffect(() => {
    scrollToTop();
  }, [id]);

  return (
    <div className="exp-container">
      
    <div className='figure-desc-container'>
       <div className="figure-container">
          <figure >
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
          </figure>
     </div>
    

        <div className="description-container">
          <h1 id="exp-title">{title}</h1>
          <div className="rating-back">
        {avgRatin > 0 && (
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
      </div>
          <div className="exp-description">
            <p>{description}</p>
          
          <div>
            <p className="exp-date">
              <a
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                className="card-location"
              >
                {" "}
                <span>
                  <MdLocationPin className="icon-search" />
                  En <strong>{location}</strong> desde{" "}
                  <strong>{moment(startDate).format("DD-MM-YYYY")}</strong>{" "}
                  hasta <strong>{moment(endDate).format("DD-MM-YYYY")}</strong>
                </span>
              </a>
            </p>
            </div>

          <div className="ratin-buy-button">
            <p id="precio-exp">{price} €</p>
            <button
              className="buy-button"
              onClick={(e) => {
                navigate(`/booking/${id}`);
              }}
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
      </div>
      <div className='map-container'>
      <h2 id="map-title">¿Cómo llegar?</h2>
        <Mapa photo={photo} title={title} coords={coords} url={url} />
<div className='exp-info-container'>
  
  <div className='extra-info'>
<p>Otra información</p>
      {infoExperience.map(({ title, content }) => (
        
        <Accordion
          className="accordion-section"
          key={title}
          title={title}
          content={content}
        />
      ))}
      </div>
      <div className='ratin-info'>
{avgRatin !== 0 ? <p>Valoraciones de clientes</p> : <p>Sin valoraciones por el momento</p>}
       <hr id="opinions-section" />
      {avgRatin !== 0 && (
      <Reviews id={id} reviews={reviews} />)}
      <hr />
      </div>
      </div>
      
     </div>
        
        

     

      

      <div>
        <h2 id="ex-sim">Otras experiencias que podrían interesarte</h2>
        <div>
          <CarouselSimilar
            id={id}
            reviews={reviews}
            avgRatin={avgRatin}
            idCategory={idCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Experience;
