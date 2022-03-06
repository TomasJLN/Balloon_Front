import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Dropdown from "../dropDown/DropDown";
import "./navBar.css";

const NavBar = ({ setShowNavBar }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        e.stopPropagation();
        setShowNavBar((s) => !s);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setShowNavBar]);

  return (
    <menu ref={ref} className="navbar">
      <li className="dropdown-btn">
        <Link to="/" onClick={(s) => setShowNavBar(!s)}>
          INICIO
        </Link>
      </li>
      <li className="dropdown-btn">
        <Link to="/account" onClick={(s) => setShowNavBar(!s)}>
          MI CUENTA
        </Link>
      </li>
      {/* Añadimos al componente dropDown la función para cambiar el valor de showNavBar (setShowNavBar)
		  para poder cerrar el menú cuando hagamos click en una categoría */}
      <Dropdown setShowNavBar={setShowNavBar} />
      <li className="dropdown-btn">
        <Link to="/contact-form" onClick={(s) => setShowNavBar(!s)}>
          CONTACTO
        </Link>
      </li>
      <li className="dropdown-btn">
        <Link to="/faq" onClick={(s) => setShowNavBar(!s)}>
          FAQ
        </Link>
      </li>
    </menu>
  );
};

export default NavBar;
