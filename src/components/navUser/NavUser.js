import { useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { TokenContext } from "../../contexts/TokenContext";
import { FaUser, FaChartBar, FaSignOutAlt, FaSignInAlt, FaTicketAlt } from "react-icons/fa";
import "./navUser.css";

const NavUser = ({ setUserMenu, usuario }) => {
  const [token, setToken] = useContext(TokenContext);
  const ref = useRef(null);
  const navigate = useNavigate();
  const { role, name, surname, email, avatar } = usuario;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        e.stopPropagation();
        setUserMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => document.removeEventListener("click", handleClickOutside, true);
  }, [setUserMenu]);

  const handleLogout = () => {
    setToken("");
    sessionStorage.removeItem("selectDate");
    sessionStorage.removeItem("nTickets");
    navigate("/");
    window.location.reload(false);
  };

  return (
    <nav ref={ref} className="nav-user">
      {token && (
        <div className="nav-user-profile">
          {avatar ? (
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${avatar}`}
              alt={name}
              className="nav-user-avatar"
            />
          ) : (
            <div className="nav-user-avatar nav-user-avatar--placeholder">
              <FaUser />
            </div>
          )}
          <div className="nav-user-info">
            <span className="nav-user-name">{name} {surname}</span>
            <span className="nav-user-email">{email}</span>
          </div>
        </div>
      )}

      {token && <div className="nav-user-divider" />}

      <menu>
        {token && (role === "admin" || role === "viewer") && (
          <li className="dropdown-btn" onClick={() => setUserMenu(false)}>
            <Link to="/dashboard"><FaChartBar /> Dashboard</Link>
          </li>
        )}
        {token && role === "user" && (
          <li className="dropdown-btn" onClick={() => setUserMenu(false)}>
            <Link to="/profile"><FaTicketAlt /> Mis reservas demo</Link>
          </li>
        )}
        {!token && (
          <li className="dropdown-btn" onClick={() => setUserMenu(false)}>
            <Link to="/account"><FaSignInAlt /> Acceso demo</Link>
          </li>
        )}
        {token && (
          <li className="dropdown-btn dropdown-btn--logout" onClick={handleLogout}>
            <FaSignOutAlt /> Cerrar sesión
          </li>
        )}
      </menu>
    </nav>
  );
};

export default NavUser;
