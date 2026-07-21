import { Link } from "react-router";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <section className="links">
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/account">Acceso demo</Link>
          </li>
          <li>
            <Link to="/contact">Contacto</Link>
          </li>

          <li>
            <Link to="/about">Nosotras</Link>
          </li>
          <li>
            <Link to="/aviso-legal">Aviso legal</Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
