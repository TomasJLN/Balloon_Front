import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./other-booking.css";

export const OtherBooking = ({ oq, handleCancelBooking }) => {
	const navigate = useNavigate();
	return (
		<div className="card fade_in margin-cards">
			<figure className="card-thumbnail">
				{oq.photo ? (
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${oq.photo}`}
						alt={oq?.title}
						className="card-thumbnail"
						onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
					/>
				) : (
					<img
						src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
						alt={oq?.title}
						className="img-card-otherbooking"
						onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
					/>
				)}
			</figure>
			<div
				className="header-booking padding-general"
				onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
			>
				<p>Reserva: {oq.ticket}</p>
				<p>Fecha Reserva: {moment(oq.dateExperience).format("YYYY-MM-DD")}</p>
			</div>
			<p
				className="title-booking padding-general"
				onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
			>
				{oq.title.length > 100 ? `${oq.title.slice(0, 100)}...` : oq.title}
			</p>

			<div className="btns-bookings">
				<button
					className="btn-booking"
					onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
				>
					Detalles
				</button>
				<button
					id={moment().format() > oq.dateExperience ? "vota" : "no-vota"}
					className="btn-booking"
					onClick={(e) => navigate(`/review/${oq.ticket}`)}
				>
					Valorar
				</button>
				<button
					className="btn-booking"
					onClick={(e) => handleCancelBooking(e, oq.ticket)}
				>
					Cancelar
				</button>
			</div>
		</div>
	);
};
