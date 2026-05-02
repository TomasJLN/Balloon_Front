import { useContext } from "react";
import { FaLock, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../../contexts/UserContext";
import "./editmenu.css";

const Editmenu = () => {
  const [usuario] = useContext(UserContext);
  return (
    <nav className="editmenu" aria-label="Secciones de perfil">
      <a href="#foto">
        <FaUserCircle /> Cambiar mi foto
      </a>
      <a href="#datos">
        <FaLock /> Cambiar mis datos
      </a>
      {usuario.role === "user" && (
        <a href="#reservas">
          <FaCalendarAlt /> Mis reservas
        </a>
      )}
    </nav>
  );
};

export default Editmenu;
