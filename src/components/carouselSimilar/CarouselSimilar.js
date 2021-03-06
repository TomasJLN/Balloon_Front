import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { miniFetcher } from "../../helpers/fetcher";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper";
import { MdLocationPin } from "react-icons/md";
import "../experienceCard/experience-card.css";
import "swiper/css/bundle";
import "./carouselSimilar.css";
// Styles must use direct files imports

export const CarouselSimilar = ({ id, reviews, avgRatin, idCategory = 1 }) => {
	SwiperCore.use([Autoplay, Pagination, Navigation]);

	const [expCat, setExpCat] = useState([]);
	const [filterExp, setFilterExp] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const expByCat = async () => {
			setExpCat(await miniFetcher("experience/list", {}));
		};
		expByCat();

		return () => {
			setExpCat([]);
		};
	}, [idCategory]);

	useEffect(() => {
		setFilterExp(
			expCat.filter((e) => {
				return e.idCategory === idCategory && e.id !== +id;
			})
		);
	}, [expCat, idCategory, id]);

	return (
		<div>
			<Swiper
				pagination={{ clickable: true }}
				loop={true}
				autoplay={{
					delay: 3000,
				}}
				breakpoints={{
					1400: {
						width: 1400,
						slidesPerView: 5,
					},

					1280: {
						width: 1280,
						slidesPerView: 3,
					},
					768: {
						width: 768,
						slidesPerView: 2,
					},
					390: {
						width: 390,
						slidesPerView: 1,
					},
				}}
				spaceBetween={15}
			>
				{filterExp.map((exp) => (
					<SwiperSlide key={exp.title}>
						<div
							className="card fade_in"
							onClick={(e) => {
								window.scrollTo(0, 0);
								navigate(`/booking/${exp.id}`);
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
								<h2 className="card-title-similar">{exp.title}</h2>
								{
									<p>
										<MdLocationPin className="icon-search" />
										{exp.location}
									</p>
								}

								<p className="card-price">{exp.price} ???</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
