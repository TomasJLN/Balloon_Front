import { useNavigate, useParams } from 'react-router-dom';
import Accordion from '../../components/accordion/Accordion';
import { useExperience } from '../../hooks/useExperience';
import './experience.css';

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
      <p>🌟🌟🌟🌟🌟</p>
      <p>{description}</p>
      <h2 id="precio">{price} €</h2>

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
      <div className="back-div">
        <button
          className="btn-back"
          onClick={() => {
            navigate(-1);
          }}
        >
          ↩️ back
        </button>
      </div>
    </div>
  );
};

export default Experience;
