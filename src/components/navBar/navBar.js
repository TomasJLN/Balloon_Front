import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import Dropdown from "../dropDown/DropDown";
import "./navBar.css";

const NavBar = ({
  toSearch,
  setToSearch,
  toSearchTit,
  setToSearchTit,
  searchCat,
  setSearchCat,
  setShowNavBar,
}) => {
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
    <menu id="slide" ref={ref} className="navbar">
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
      <Dropdown
        toSearch={toSearch}
        setToSearch={setToSearch}
        toSearchTit={toSearchTit}
        setToSearchTit={setToSearchTit}
        searchCat={searchCat}
        setSearchCat={setSearchCat}
        setShowNavBar={setShowNavBar}
      />
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
