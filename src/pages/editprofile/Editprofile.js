import Editmenu from '../../components/editProfile/editmenu/Editmenu';
import Editavatar from '../../components/editProfile/editavatar/Editavatar';
import Editpassword from '../../components/editProfile/editpassword/Editpassword';
import Editbooking from '../../components/editProfile/editbooking/Editbooking';

const Editprofile = () => {
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
