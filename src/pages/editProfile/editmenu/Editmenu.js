import { useContext } from "react";
import { FaLock, FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import { UserContext } from "../../../contexts/UserContext";
/* import "./editmenu.css"; */
import "../../dashBoard/dashboard.css";

const Editmenu = () => {
	const [usuario, setUsuario] = useContext(UserContext);
	return (
		<section>
			<div className="profile-container">
				<h1 id="create-title">Editar perfil</h1>
				<div className="list-container">
					<ul>
						<a href="#foto">
							<li>
								<FaUserCircle /> Cambiar mi foto
							</li>
						</a>
						<a href="#datos">
							<li>
								<FaLock /> Cambiar mis datos
							</li>
						</a>
						{usuario.role === "user" && (
							<a href="#reservas">
								{" "}
								<li>
									<FaCalendarAlt /> Mis reservas
								</li>
							</a>
						)}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Editmenu;
