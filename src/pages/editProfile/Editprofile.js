import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import Editmenu from "./editmenu/Editmenu";
import Editavatar from "./editavatar/Editavatar";
import Editpassword from "./editpassword/Editpassword";
import Editbooking from "./editbooking/Editbooking";
import "./editprofile.css";

const Editprofile = () => {
	const [usuario, setUsuario] = useContext(UserContext);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<div className="edit-profile-wrapper">
			<div className="edit-profile-links">
				<Editmenu />
			</div>

			<Editavatar />
			<Editpassword />
			{usuario.role === "user" && <Editbooking />}
		</div>
	);
};

export default Editprofile;
