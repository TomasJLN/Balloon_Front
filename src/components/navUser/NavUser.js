import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../contexts/TokenContext";
import "./navUser.css";

const NavUser = ({ setUserMenu, usuario }) => {
  const [token, setToken] = useContext(TokenContext);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { role } = usuario;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        e.stopPropagation();
        setUserMenu((s) => !s);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [setUserMenu]);

  const handleLogout = () => {
    sessionStorage.setItem("token", JSON.stringify(""));
    setToken("");
    sessionStorage.removeItem("selectDate");
    sessionStorage.removeItem("nTickets");
    navigate("/");
    window.location.reload(false);
  };

  return (
    <nav ref={ref} className="nav-user" onClick={(e) => setUserMenu((s) => !s)}>
      <menu>
        {token && role === "admin" && (
          <li className="dropdown-btn">
            <Link to="/dashboard">Dashboard</Link>
          </li>
        )}
        {token && (
          <li className="dropdown-btn">
            <Link to="/profile">Perfil</Link>
          </li>
        )}

        {!token && (
          <li className="dropdown-btn">
            <Link to="/register">Registro</Link>
          </li>
        )}
        {token && (
          <li className="dropdown-btn" onClick={handleLogout}>
            <Link to="">Log out</Link>
          </li>
        )}
        {!token && (
          <li className="dropdown-btn">
            <Link to="/account">Log in</Link>
          </li>
        )}
        {/* {!token && (
          <li>
            <Link to="/recovery">Recuperar contraseña</Link>
          </li>
        )} */}
      </menu>
    </nav>
  );
};

export default NavUser;
