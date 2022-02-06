import {useState, useContext} from 'react';
import fetcher from '../../helpers/fetcher';
import {TokenContext} from '../../contexts/TokenContext';
import './editavatar.css';

const Editavatar = () => {

    const [token, setToken] = useContext(TokenContext);
    const [avatar, setAvatar] = useState(avatar);

        const handlavatar = async(e) => {
            e.preventDefault();
            await fetcher('user/avatar', {
            method:'PUT',
            headers: {
            Authorization: token, },
            body: JSON.stringify({avatar})
            });
        };


return (
<section>


    <button className="Guardar" type="submit">
        Cambiar Foto
    </button>

</section>

);
};
export default Editavatar;