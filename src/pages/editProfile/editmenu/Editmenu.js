import { useContext } from "react";
import { FaLock, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../../contexts/UserContext";
import "./editmenu.css";
import { useNavigate } from "react-router-dom";

const Editmenu = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useContext(UserContext);
  return (
    <section className="editmenu">
      <button
        className="btn-back"
        onClick={() => {
          navigate("/");
        }}
      >
        ↩️ back
      </button>
      <ul>
        <li>
          <div id="back">
            <FaUserCircle />
          </div>
          <a href="#foto">Cambiar mi foto</a>
        </li>
        <li>
          <div>
            <FaLock />
          </div>
          <a href="#datos">Cambiar mis datos</a>
        </li>
        {usuario.role === "user" && (
          <li>
            <div>
              <FaCalendarAlt />
            </div>
            <a href="#reservas">Mis reservas</a>
          </li>
        )}
      </ul>
    </section>
  );
};

export default Editmenu;
