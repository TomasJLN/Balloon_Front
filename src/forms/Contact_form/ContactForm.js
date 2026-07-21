import "../../pages/Contact/Contact.css";
import { useEffect } from "react";
import { Link } from "react-router";
import { FaArrowLeft, FaFlask, FaLock, FaRegComments } from "react-icons/fa";

const ContactForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="contact-demo-page">
      <div className="contact-demo-card">
        <div className="contact-demo-icon" aria-hidden="true">
          <FaRegComments />
        </div>
        <p className="contact-demo-kicker">
          <FaFlask aria-hidden="true" /> Contacto demostrativo
        </p>
        <h1>Este proyecto no recibe mensajes</h1>
        <p className="contact-demo-lead">
          Balloon es una aplicación académica de portfolio y no representa una
          empresa ni un servicio de atención al cliente real.
        </p>

        <div className="contact-demo-notice">
          <FaLock aria-hidden="true" />
          <div>
            <h2>No solicitamos datos personales</h2>
            <p>
              No introduzcas nombres, correos, teléfonos, contraseñas ni otra
              información real. No existe ningún formulario de envío ni se
              almacena información de contacto.
            </p>
          </div>
        </div>

        <div className="contact-demo-actions">
          <Link to="/" className="contact-demo-primary">
            <FaArrowLeft aria-hidden="true" /> Volver al inicio
          </Link>
          <Link to="/aviso-legal" className="contact-demo-secondary">
            Consultar aviso legal
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
