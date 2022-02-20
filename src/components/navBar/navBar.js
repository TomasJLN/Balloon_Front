import { Link } from 'react-router-dom';
import { useContext, useEffect, useRef } from 'react';
import './navBar.css';

const NavBar = ({ setShowNavBar }) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        e.stopPropagation();
        setShowNavBar((s) => !s);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [setShowNavBar]);
  return (
    <menu ref={ref} className="navbar">
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
