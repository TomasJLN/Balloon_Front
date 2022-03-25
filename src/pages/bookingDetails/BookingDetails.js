import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OtherBooking } from "../../components/otherBooking/OtherBooking";
import { QrTicket } from "../../components/qr_ticket/QrTicket";
import { TokenContext } from "../../contexts/TokenContext";
import { miniFetcher } from "../../helpers/fetcher";
import { useBookingDetails } from "../../hooks/useBookingDetails";
import { useBookingQRs } from "../../hooks/useBookingQRs";
import { useUserBookings } from "../../hooks/useUserBookings";
import { toast } from "react-toastify";
import "./booking-details.css";
import "../booking/booking.css";

export const BookingDetails = () => {
	const { ticket } = useParams();
	const [token, setToken] = useContext(TokenContext);
	const [cancelStatus, setCancelStatus] = useState(null);

	const exDetails = useBookingDetails(ticket, token);
	const QRs = useBookingQRs(ticket, token);
	const othersBookings = useUserBookings(ticket, token);
	const navigate = useNavigate();

	const handleCancelBooking = (e, ticket) => {
		e.preventDefault();
		const cancelBooking = async () => {
			setCancelStatus(
				await miniFetcher(`booking/${ticket}`, {
					method: "DELETE",
					headers: { Authorization: token },
				})
			);
		};
		cancelBooking();
	};

	useEffect(() => {
		cancelStatus && toast.success(cancelStatus);
		setCancelStatus(null);
	}, [cancelStatus]);

	return (
		<div className="wrap-content">
			<div className="initial-wrap">
				<div className="photo-thumbnail">
					{exDetails?.photo ? (
						<img
							src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${exDetails?.photo}`}
							alt={exDetails?.title}
							className="exp-pic"
						/>
					) : (
						<img
							src={`${process.env.REACT_APP_BACKEND_URL}/uploads/NA.png`}
							alt={exDetails?.title}
							className="exp-pic"
						/>
					)}
				</div>
				<div className="title-description">
					<h1 className="title-center">Resumen de tu pedido</h1>
					<h2 className="title-center">
						{exDetails?.title}, {exDetails?.location}
					</h2>

					<div className="booking-details">
						<p>
							{" "}
							<strong>
								<span>Nº de pedido: </span>
							</strong>
							{exDetails?.ticket}
						</p>

						<p>
							<strong>Descripción:</strong> {exDetails?.description}
						</p>
						<p>
							<strong>Fecha experiencia: </strong>
							{moment(exDetails?.dateExperience).format("YYYY-MM-DD")}
						</p>
						<p>
							<strong> Fecha de la reserva: </strong>
							{moment(exDetails?.createdAt).format("YYYY-MM-DD")}
						</p>
					</div>
				</div>
			</div>
			<hr />
			<h2 className="title-center">Descargar códigos QR para participantes</h2>
			<h3 className="title-center">No olvides apuntar las referencias</h3>
			<div className="qr-booking">
				{QRs.map((q, index) => (
					<QrTicket key={index} q={q} />
				))}
			</div>
			<hr />
			<br />
			<div className="back-to-profile">
				<button
					onClick={() => {
						navigate(`/profile`);
					}}
				>
					🎟️ Mis reservas
				</button>
			</div>
			<br />
			<div>
				<h2 className="title-center"> Otras reservas del usuario</h2>
				<div className="other-bookings-wrap">
					{othersBookings.map((oq) => (
						<OtherBooking
							oq={oq}
							key={oq.id}
							handleCancelBooking={handleCancelBooking}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
