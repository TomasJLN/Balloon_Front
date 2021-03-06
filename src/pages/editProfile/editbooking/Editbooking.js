import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { TokenContext } from "../../../contexts/TokenContext";
import { miniFetcher } from "../../../helpers/fetcher";
import { useUserBookings } from "../../../hooks/useUserBookings";
import { OtherBooking } from "../../../components/otherBooking/OtherBooking";
import "./editbooking.css";

const Editbooking = () => {
	const navigate = useNavigate();
	const { ticket } = useParams();
	const [token, setToken] = useContext(TokenContext);
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
		<section>
			<h2 className="result-title" style={{ color: "black" }} id="reservas">
				Mis reservas
			</h2>
			<div className="general">
				{othersBookings.length < 1 ? (
					<p className="title-center">No dispone de ninguna reserva</p>
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

			<p
				className="title-center link-text big-font"
				onClick={() => navigate("/")}
			>
				Volver al Inicio
			</p>
		</section>
	);
};

export default Editbooking;
