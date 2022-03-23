import { MdInfo } from "react-icons/md";

const PopUpBooking = ({ bookingInfo }) => {
	let tickets = bookingInfo.numTickets;
	if (tickets > 1) {
		tickets = "tickets";
	} else {
		tickets = "ticket";
	}
	return (
		<section id="popup-booking-container">
			<article id="popup-booking">
				<h2>Estas a punto de reservar:</h2>
				<h3>
					{bookingInfo.numTickets} {tickets} para {bookingInfo.title} en{" "}
					{bookingInfo.location} por un total de:{" "}
					{(bookingInfo.price * bookingInfo.numTickets).toFixed(2)} €
				</h3>
				<img
					src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${bookingInfo.photo}`}
					alt={bookingInfo.title}
					className="exp-pic"
				/>

				<form id="popup-form">
					<button type="submit" className="generalButton">
						Confirmar
					</button>
				</form>
			</article>
		</section>
	);
};

export default PopUpBooking;
