import React, {useState, useContext} from 'react';
import fetcher from '../../helpers/fetcher';
import {TokenContext} from '../../contexts/TokenContext';
import './editpassword.css';

const Editpassword = () => {

        const [token, setToken] = useContext(TokenContext);
        const [oldpassword, setOldpassword] = useState('');
        const [newpassword, setNewPassword] = useState('');


        const editnumber = async(e) => {
        e.preventDefault();
        await fetcher('user/password', {
        method:'PUT',
        headers: {
        Authorization: token, },
        body: JSON.stringify({oldpassword, newpassword})
        });
    };


        return (
        <section>
            <form className="editpassword" onSubmit={Editpassword}>
            <h2>Cambiar contraseña</h2>
            <label htmlFor="oldpassword">Contraseña:</label>
            <input
                type="password"
                id="oldpassword"
                name="oldpassword"
                value={oldpassword}
                onChange={editnumber}
            ></input>
            <label htmlFor="newpassword">NuevaContraseña:</label>
            <input
                type="password"
                id="newpassword"
                name="newpassword"
                value={newpassword}
                onChange={editnumber}
            ></input>
                
            <button className="actualizar" type="submit">
            Actualizar
            </button>
            </form>
        </section>

        );
};
                
export default Editpassword;
