import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { scrollToTop } from "../../helpers/scrollToTop";
import { useExperience } from "../../hooks/useExperience";
import fetcher from "../../helpers/fetcher";
import { TokenContext } from "../../contexts/TokenContext";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "./booking.css";
import "../experience/experience.css";
import { useGetReviews } from "../../hooks/useGetReviews";
import { Reviews } from "../../components/reviews/Reviews";
import { CarouselSimilar } from "../../components/carouselSimilar/CarouselSimilar";
import Mapa from "../../components/Mapa";
import moment from "moment";

const Booking = () => {
	const { id } = useParams();
	const { reviews } = useGetReviews(id);

	const {
		idCategory,

		title,
		description,
		price,
		location,
		coords,
		photo,
		startDate,
		endDate,
		totalPlaces,
		conditions,
		normatives,
	} = useExperience(id);

	let url = `https://www.google.es/maps/@${coords},19z`;

	url = url.replace(/ +/g, "");

	console.log("url", url);

	const [numTickets, setNumTickets] = useState(1);
	const [bookingDate, setBookingDate] = useState(
		new DateObject().add(1, "days")
	);
	const [places, setPlaces] = useState([]);
	const [result, setResult] = useState("");
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [token, setToken] = useContext(TokenContext);
	const [usuario, setUsuario] = useContext(UserContext);
	const [pay, setPay] = useState(null);
	const [avgRatin, setAvgRatin] = useState(0);

	let maxFreePlaces = 10;

	useEffect(() => {
		fetcher(
			setPlaces,
			setError,
			setLoading,
			`filters/occupied?experienceID=${id}&date=${bookingDate}`,
			{}
		);
		setNumTickets(1);
	}, [bookingDate, id, maxFreePlaces]);

	const { occupied } = places[0] || { occupied: 0 };

	occupied > 0
		? (maxFreePlaces = totalPlaces - occupied)
		: (maxFreePlaces = totalPlaces);

	let infoExperience = [];
	infoExperience.push({ title: "Condiciones", content: conditions });
	infoExperience.push({ title: "Normativas", content: normatives });

	const navigate = useNavigate();

	const handleSubtractTicket = () => {
		if (numTickets > 1) setNumTickets(numTickets - 1);
	};

	const handleAddTicket = () => {
		if (numTickets < maxFreePlaces) setNumTickets(numTickets + 1);
	};

	const handleTicket = (e) => {
		if (e.target.value > maxFreePlaces) setNumTickets(maxFreePlaces);
		else {
			setNumTickets(e.target.value.replace(/\D/, ""));
		}
	};

	const handleNewBooking = (e) => {
		e.preventDefault();
		setResult("");

		if (pay) {
			const createBooking = async () => {
				await fetcher(setResult, setError, setLoading, "booking", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify({
						dateExperience:
							typeof bookingDate === "string"
								? bookingDate
								: bookingDate.format(),
						quantity: numTickets,
						idExperience: id,
					}),
				});
			};
			!usuario.role && navigate("/account");
			usuario.role === "user" && createBooking();
			usuario.role === "admin" &&
				toast.error("Un administrador no puede\nhacer reservas...");
		} else {
			toast.error("Debes seleccionar un método de pago");
		}
	};

	useEffect(() => {
		result.length > 1 && navigate(`/bookingDetail/${result}`);
	}, [result, setResult, navigate]);

	useEffect(() => {
		if (error !== null) toast.error("algo salió mal... ", error);
		return () => {
			setError(null);
		};
	}, [error]);

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
		<>
			{loading ? (
				<h1 className="spinner-container">Cargando...</h1>
			) : (
				<div className="wrap-content">
					<div className="experience-data">
						<div className="photo-thumbnail">
							{photo ? (
								<img
									src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${photo}`}
									alt={title}
									className="exp-pic"
								/>
							) : (
								<img
									src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
									alt={title}
									className="exp-pic"
								/>
							)}
						</div>
						<div style={{ padding: "2rem" }}>
							<div className="title-description">
								<h1>{title}</h1>
								<p className="description-text">{description}</p>
								<div className="exp-location">
									En{" "}
									<a href={url} target="blank">
										<strong>{location}</strong>
									</a>{" "}
									desde{" "}
									<strong>{moment(startDate).format("DD-MM-YYYY")}</strong>{" "}
									hasta <strong>{moment(endDate).format("DD-MM-YYYY")}</strong>
								</div>
								<div className="accordion-section">
									<ul className="normatives">
										{infoExperience.map(({ title, content }) => (
											<li key={title}>
												<strong>{title}</strong>: {content}
											</li>
										))}
									</ul>
									<div className="check-out">
										<p className="precio-unidad">Precio ticket: {price} €</p>
									</div>
								</div>
							</div>
							<div className="info-checkout-container">
								<form className="booking-form">
									<div id="select-date">
										<label htmlFor="date">Escoger Fecha</label>
										<DatePicker
											style={{
												display: "flex",
												alignItems: "center",
												width: "120px",
												textAlign: "center",
												fontSize: "1.1rem",
												border: "none",
												boxShadow: "2px 2px 4px grey",
											}}
											id="date"
											value={bookingDate}
											onChange={setBookingDate}
											editable={false}
											minDate={new Date(startDate)}
											maxDate={new Date(endDate)}
										/>
									</div>
									<div className="tickets-booking">
										<div id="select-quantity">
											<label htmlFor="quantity">Nº Tickets</label>
											<button
												type="button"
												className="button-quantity"
												onClick={handleSubtractTicket}
											>
												-
											</button>
											<input
												type="text"
												name="quantity"
												id="quantity"
												className="input-quantity"
												value={numTickets}
												onChange={handleTicket}
											/>
											<button
												type="button"
												className="button-quantity"
												onClick={handleAddTicket}
											>
												+
											</button>
										</div>
										{
											<h5 style={{ textAlign: "center" }}>
												Máximas plazas disponibles: {maxFreePlaces}
											</h5>
										}
									</div>
									<div className="pay-method">
										<p>Forma de pago</p>
										<div
											className="pay-option"
											onChange={(e) => setPay(e.target.value)}
										>
											<select className="booking-select">
												<option value="none">Elegir forma de pago</option>
												<option id="paypal" name="payMethod" value="paypal">
													Paypal
												</option>
												<option
													id="creditCard"
													name="payMethod"
													value="creditCard"
												>
													Targeta de crédito
												</option>
												<option id="bizum" name="payMethod" value="bizum">
													Bizum
												</option>
											</select>
										</div>
									</div>
								</form>
								<div className="check-out">
									<p className="precio-total">
										Total: {(price * numTickets).toFixed(2)} €
									</p>

									<div className="right-align">
										<button
											className="generalButton"
											onClick={handleNewBooking}
										>
											RESERVAR
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="rating-back">
						<button
							className="btn-back"
							onClick={() => {
								navigate(-1);
							}}
						>
							↩️ back
						</button>
					</div>
					<div className="ratin-info">
						{avgRatin !== 0 ? (
							<Reviews id={id} reviews={reviews} />
						) : (
							<h2 id="ex-sim">Experiencia sin valoraraciones</h2>
						)}
					</div>
					<h2 id="map-title">¿Cómo llegar?</h2>
					<Mapa photo={photo} title={title} coords={coords} url={url} />
					<div className="exp-info-container"></div>

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
			)}
		</>
	);
};

export default Booking;
