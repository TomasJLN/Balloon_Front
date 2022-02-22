import { useContext, useEffect, useState } from 'react';
import { TokenContext } from '../../contexts/TokenContext';
import { UserContext } from '../../contexts/UserContext';
import { fileUpload } from '../../helpers/fileUpload';
import { toast } from 'react-toastify';
import Editmenu from '../../components/editProfile/editmenu/Editmenu';
import Editavatar from '../../components/editProfile/editavatar/Editavatar';
import Editpassword from '../../components/editProfile/editpassword/Editpassword';
import Editbooking from '../../components/editProfile/editbooking/Editbooking';

const Editprofile = () => {
  const [token, setToken] = useState(TokenContext);
  const [usuario, setUsuario] = useState(UserContext);
  const [newAvatar, setNewAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Editmenu />
      <Editavatar />
      <Editpassword />
      <Editbooking />
    </>
  );
};

export default Editprofile;
