import { AiOutlineShoppingCart } from "react-icons/ai";

const PopUpBooking = ({ bookingInfo, setPopUp, handleNewBooking }) => {
	return (
		<section id="popup-booking-container">
			<article id="popup-booking">
				<div>
					<AiOutlineShoppingCart style={{ fontSize: "50px" }} />
				</div>
				<h2>Estas a punto de comprar:</h2>
				<h3 style={{ textAlign: "center", padding: "1rem" }}>
					{bookingInfo.title}, {bookingInfo.location}.
				</h3>
				<img
					src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${bookingInfo.photo}`}
					alt={bookingInfo.title}
					className="exp-pic"
				/>
				Unidades: {bookingInfo.numTickets} | Total:{" "}
				{(bookingInfo.price * bookingInfo.numTickets).toFixed(2)} €
				<div className="pop-up-button-set" id="popup-bookin-form">
					<button
						onClick={(e) => {
							setPopUp(false);
							handleNewBooking();
						}}
						className="generalButton"
					>
						Confirmar
					</button>
					<button onClick={() => setPopUp(false)} className="generalButton">
						Cancelar
					</button>
				</div>
			</article>
		</section>
	);
};

export default PopUpBooking;
