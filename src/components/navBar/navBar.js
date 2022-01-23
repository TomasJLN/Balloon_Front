import { Link } from 'react-router-dom';
import './navBar.css';

const NavBar = ({ setShowNavBar }) => {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/" onClick={(s) => setShowNavBar(!s)}>
            INICIO
          </Link>
        </li>
        <li>MI CUENTA</li>
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
      </ul>
    </div>
  );
};
export default NavBar;
