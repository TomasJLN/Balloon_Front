import moment from "moment";
import { useNavigate } from "react-router-dom";
import "./other-booking.css";
import React, { useEffect } from "react";

export const OtherBooking = ({ oq, handleCancelBooking }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [oq]);

	const navigate = useNavigate();
	return (
		<div className="card-category fade_in card">
			<figure className="card-figure-category">
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
				className="title-card-category"
				onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
			>
				<p>Reserva: {oq.ticket}</p>
				<p>Fecha Reserva: {moment(oq.dateExperience).format("YYYY-MM-DD")}</p>
			</div>
			<p
				className="title-exp-edit"
				onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
			>
				{oq.title.length > 100 ? `${oq.title.slice(0, 100)}...` : oq.title}
			</p>

			<div className="row-button-category">
				<button
					className="generalButton"
					onClick={(e) => navigate(`/bookingDetail/${oq.ticket}`)}
				>
					Detalles
				</button>
				<button
					id={moment().format() > oq.dateExperience ? "vota" : "no-vota"}
					className="generalButton"
					onClick={(e) => navigate(`/review/${oq.ticket}`)}
				>
					Valorar
				</button>
				<button
					className="generalButton"
					onClick={(e) => handleCancelBooking(e, oq.ticket)}
				>
					Cancelar
				</button>
			</div>
		</div>
	);
};
