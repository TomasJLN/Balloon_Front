import { AiOutlineShoppingCart } from "react-icons/ai";

const PopUpBooking = ({ bookingInfo, setPopUp, handleNewBooking }) => {
  return (
    <section id="popup-booking-container">
      <article id="popup-booking">
        <div>
          <AiOutlineShoppingCart style={{ fontSize: "50px" }} />
        </div>
        <p className="booking-demo-badge">Demostración académica</p>
        <h2>Vas a simular esta reserva:</h2>
        <h3 style={{ textAlign: "center", padding: "1rem" }}>
          {bookingInfo.title}, {bookingInfo.location}.
        </h3>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${bookingInfo.photo}`}
          alt={bookingInfo.title}
          className="exp-pic-pop"
        />
        <h3>
          Participantes: {bookingInfo.numTickets} | Total:{" "}
          {(bookingInfo.price * bookingInfo.numTickets).toFixed(2)} €
        </h3>
        <p className="booking-demo-message">
          No se realizará ningún cargo ni se enviará ningún correo. La reserva
          se conservará solo durante esta sesión para que puedas probar el área
          de usuario.
        </p>
        <div className="pop-up-button-set" id="popup-bookin-form">
          <button
            onClick={(e) => {
              setPopUp(false);
              handleNewBooking();
              sessionStorage.removeItem("selectDate");
              sessionStorage.removeItem("nTickets");
            }}
            className="generalButton"
          >
            Confirmar simulación
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
