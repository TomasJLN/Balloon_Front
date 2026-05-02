import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { FaUserCircle } from "react-icons/fa";
import Editmenu from "./editmenu/Editmenu";
import Editavatar from "./editavatar/Editavatar";
import Editpassword from "./editpassword/Editpassword";
import Editbooking from "./editbooking/Editbooking";
import "./editprofile.css";

const Editprofile = () => {
  const [usuario] = useContext(UserContext);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <section className="profile-page">
        <div className="profile-container">
          <header className="profile-header">
            <div>
              <p className="profile-kicker">Área personal</p>
              <h1>Editar perfil</h1>
            </div>
            <div className="profile-user-pill">
              <FaUserCircle />
              <span>{usuario?.name || "Usuario"}</span>
            </div>
          </header>

          <Editmenu />

          <div className="profile-edit-grid">
            <Editavatar />
            <Editpassword />
          </div>

          {usuario.role === "user" && <Editbooking />}
        </div>
      </section>
    </>
  );
};

export default Editprofile;
