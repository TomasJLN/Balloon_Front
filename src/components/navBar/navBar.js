import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = ({ setShowNavBar }) => {
  return (
    <menu className="navbar">
      <li>
        <Link to="/" onClick={(s) => setShowNavBar(!s)}>
          INICIO
        </Link>
      </li>
      <li>
        <Link to="/account" onClick={(s) => setShowNavBar(!s)}>
          MI CUENTA
        </Link>
      </li>
      {/* <li>CATEGORIAS</li>
            <ul>
                <li>AVENTURAS</li>
                <li>GOURMET</li>
                <li>SCAPE ROOMS</li>
            </ul> */}
      <li>
        <Link to="/contact-form" onClick={(s) => setShowNavBar(!s)}>
          CONTACTO
        </Link>
      </li>
      <li>FAQ</li>
    </menu>
  );
};
export default NavBar;
