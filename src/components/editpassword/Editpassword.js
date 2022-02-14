import React, {useState, useEffect, useContext} from 'react';
import {NavLink} from "react-router-dom";
import fetcher from '../../helpers/fetcher';
import {TokenContext} from '../../contexts/TokenContext';
import './editpassword.css';

const Editpassword = () => {

    const [token, setToken] = useContext(TokenContext);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setpassword] = useState('');
    const [newpassword, setnewpassword] = useState('');
    const [err, setErr] = useState(null);

    useEffect(() => {
        err && alert(err);
      }, [err, setErr]);
    
      useEffect(() => {
        setErr(null);
      }, []);
   

        const handlepassword = async(e) => {
            e.preventDefault();
                await fetcher(setErr, 'user/edit', {
                    method:'PUT',
                    headers: {
                    Authorization: token, },
                    body: JSON.stringify({name, surname, password, newpassword})
                    });

        };


return (
    <section className="editpassword">
        <form onSubmit={Editpassword}>
            <h2>Cambiar mis datos</h2>
            <label htmlFor="name">Nombre*:</label>
            <input
                type="text"
                id="name"
                name="name"
                required
                value={name}
                onChange={handlepassword}
            ></input>
            <label htmlFor="surname">Apellidos*:</label>
            <input
                type="text"
                id="surname"
                name="surname"
                required
                value={surname}
                onChange={handlepassword}
            ></input>
            <label htmlFor="password">Contraseña actual*:</label>
            <input
                type="email"
                id="password"
                name="password"
                required
                value={password}
                onChange={handlepassword}
            ></input>
            <label htmlFor="newemail">Nueva contraseña*:</label>
            <input
                type="text"
                id="newpassword"
                name="newpassword"
                required
                value={newpassword}
                onChange={handlepassword}
            ></input>

            <button type="submit">
            Guardar
            </button>
        </form>
    </section>

);
};        
                
export default Editpassword;
