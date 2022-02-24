import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import { miniFetcher } from '../../helpers/fetcher';
import './carouselSimilar.css';

export const CarouselSimilar = ({ idCategory = 1 }) => {
  const [expCat, setExpCat] = useState([]);
  const [filterExp, setFilterExp] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const expByCat = async () => {
      setExpCat(await miniFetcher('experience/list', {}));
    };
    expByCat();
  }, [idCategory]);

  useEffect(() => {
    setFilterExp(
      expCat.filter((e) => {
        return e.idCategory === idCategory;
      })
    );
  }, [expCat, idCategory]);

  return (
    <div>
      <Carousel dynamicHeight={true} showIndicators={false}>
        {filterExp.map((s, index) => (
          <div
            key={index}
            onClick={(e) => {
              navigate(`/experience/${s.id}`);
            }}
          >
            {s.photo ? (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${s.photo}`}
                alt={s.title}
                className="exp-picture"
              />
            ) : (
              <img
                src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
                alt={s.title}
                className="exp-picture"
              />
            )}
            <span className="legend" id="la-etiqueta">
              <p id="title-carousel-card">
                {' '}
                {s.title.length > 40 ? s.title.slice(0, 40) + '...' : s.title}
              </p>
              <p id="price-carousel-card">{s.price} €</p>
            </span>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
