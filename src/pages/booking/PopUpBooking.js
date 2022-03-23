const PopUpBooking = ({ bookingInfo }) => {
	return (
		<section id="popup-bg">
			<article id="popup-fg">
				<h2>Estas a punto de reservar</h2>
				<h3>{bookingInfo.title}</h3>
				<h4>En {bookingInfo.location}</h4>
				<form id="popup-form">
					<button type="submit" className="generalButton">
						Vale
					</button>
				</form>
			</article>
		</section>
	);
};

export default PopUpBooking;
