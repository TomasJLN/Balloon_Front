import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { miniFetcher } from "../../helpers/fetcher";
import "./carouselSimilar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "../experienceCard/experience-card.css";
import { FaSearchLocation } from "react-icons/fa";
import { Rating } from "react-simple-star-rating";
import { MdLocationPin } from "react-icons/md";

export const CarouselSimilar = ({ reviews, avgRatin, idCategory = 1 }) => {
	const [expCat, setExpCat] = useState([]);
	const [filterExp, setFilterExp] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const expByCat = async () => {
			setExpCat(await miniFetcher("experience/list", {}));
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
			<Swiper
				breakpoints={{
					// when window width is >= 640px
					1920: {
						width: 1920,
						slidesPerView: 5,
					},
					// when window width is >= 768px
					1280: {
						width: 1280,
						slidesPerView: 3,
					},
					768: {
						width: 768,
						slidesPerView: 2,
					},
					375: {
						width: 375,
						slidesPerView: 1,
					},
				}}
				spaceBetween={15}
				onSlideChange={() => console.log("slide change")}
				onSwiper={(swiper) => console.log(swiper)}
			>
				{filterExp.map((exp) => (
					<SwiperSlide>
						<div
							className="card fade_in"
							onClick={(e) => {
								window.removeEventListener("scroll", onclick);
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
										{/* <a
              href={url}
              target="_blank"
              rel="noreferrer noopener"
              className="card-location"
            > */}
										<MdLocationPin className="icon-search" />
										{exp.location}
										{/* </a> */}
									</p>
								}
								<p className="stars-row">
									{avgRatin !== 0 && (
										<>
											<Rating
												ratingValue={avgRatin / reviews.length}
												size="16px"
												tooltipClassName="stars-count"
												readonly={true}
											/>
											<span className="counter-reviews">
												({reviews.length})
											</span>
										</>
									)}
								</p>
								<p className="card-price">{exp.price} €</p>
							</div>
						</div>
					</SwiperSlide>
				))}
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
			</Swiper>
			{/* <Carousel dynamicHeight={true} showIndicators={false}>
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
      </Carousel> */}
		</div>
	);
};
