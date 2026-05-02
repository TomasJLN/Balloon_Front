import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";
import { TokenContext } from "../../../contexts/TokenContext";
import { miniFetcher } from "../../../helpers/fetcher";
import { useUserBookings } from "../../../hooks/useUserBookings";
import { OtherBooking } from "../../../components/otherBooking/OtherBooking";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import "./editbooking.css";

const Editbooking = () => {
	const navigate = useNavigate();
	const { ticket } = useParams();
	const [token] = useContext(TokenContext);
	const [cancelStatus, setCancelStatus] = useState(null);
	const othersBookings = useUserBookings(ticket, token);

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
		<section className="profile-bookings-card" id="reservas">
			<div className="profile-card-title">
				<FaCalendarAlt />
				<h2>Mis reservas</h2>
			</div>
			<div className="profile-bookings-grid">
				{othersBookings.length < 1 ? (
					<p className="profile-empty">No dispone de ninguna reserva</p>
				) : (
					othersBookings.map((oq) => (
						<OtherBooking
							oq={oq}
							key={oq.id}
							handleCancelBooking={handleCancelBooking}
						/>
					))
				)}
			</div>

			<button
				type="button"
				className="profile-secondary"
				onClick={() => navigate("/")}
			>
				<FaArrowLeft /> Volver al Inicio
			</button>
		</section>
	);
};

export default Editbooking;
