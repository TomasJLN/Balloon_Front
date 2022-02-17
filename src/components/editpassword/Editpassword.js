import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetcher';
import {TokenContext} from '../../contexts/TokenContext';
import './editpassword.css';

const Editpassword = () => {

    const [token, setToken] = useContext(TokenContext);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewpassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    

    const navigate = useNavigate();

    useEffect(() => {
        if (token && !error) navigate('/');
    }, [token, error, navigate]);
       

        const handlepassword = async(e) => {
            e.preventDefault();
            setError(null);
                await fetcher(setToken, setError, setLoading, 'user/edit', {
                    method:'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({name, surname, password, newpassword})
                    });

        };


return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <section className="editpassword">
            <form onSubmit={handlepassword}>
                <h2 id="datos">Cambiar mis datos</h2>
                <label htmlFor="name">Nombre:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></input>
                <label htmlFor="surname">Apellidos:</label>
                <input
                    type="text"
                    id="surname"
                    name="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                ></input>
                <label htmlFor="password">Contraseña actual:</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></input>
                <label htmlFor="newemail">Nueva contraseña:</label>
                <input
                    type="text"
                    id="newpassword"
                    name="newpassword"
                    value={newpassword}
                    onChange={(e) => setNewpassword(e.target.value)}
                ></input>

                <button type="submit">Guardar</button>
            </form>
        </section>
      )}
      </>

    );
};        
                
export default Editpassword;
