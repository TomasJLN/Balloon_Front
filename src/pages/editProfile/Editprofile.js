import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Editmenu from "./editmenu/Editmenu";
import Editavatar from "./editavatar/Editavatar";
import Editpassword from "./editpassword/Editpassword";
import Editbooking from "./editbooking/Editbooking";
import { TokenContext } from "../../contexts/TokenContext";

const Editprofile = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  return (
    <>
      <Editmenu />
      <Editavatar />
      <Editpassword />
      {usuario.role === "user" && <Editbooking />}
    </>
  );
};

export default Editprofile;
