import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import Editmenu from '../../components/editProfile/editmenu/Editmenu';
import Editavatar from '../../components/editProfile/editavatar/Editavatar';
import Editpassword from '../../components/editProfile/editpassword/Editpassword';
import Editbooking from '../../components/editProfile/editbooking/Editbooking';
import { TokenContext } from '../../contexts/TokenContext';

const Editprofile = () => {
  const [token, setToken] = useContext(TokenContext);
  const [usuario, setUsuario] = useContext(UserContext);
  console.log(usuario);
  return (
    <>
      <Editmenu />
      <Editavatar />
      <Editpassword />
      {usuario.role === 'user' && <Editbooking />}
    </>
  );
};

export default Editprofile;
