import {useState, useContext} from 'react';
import fetcher from '../../helpers/fetcher';
import { TokenContext } from '../../contexts/TokenContext';
import './editemail.css';

const Editemail = () => {

    const [token, setToken] = useContext(TokenContext);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(avatar);

        const handlemail = async(e) => {
            e.preventDefault();
            await fetcher('user/edit', {
            method:'PUT',
            headers: {
            Authorization: token, },
            body: JSON.stringify({name, surname, oldemail, newemail})
            });
        };


return (
    <section>
        <form className="editemail" onSubmit={Editemail}>

        <h2>Editar datos personales</h2>
        <label htmlFor="name">Nombre*:</label>
        <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={handlemail}
        ></input>
        <label htmlFor="surname">Apellidos*:</label>
        <input
            type="text"
            id="surname"
            name="surname"
            required
            value={surname}
            onChange={handlemail}
        ></input>
        <label htmlFor="oldemail">Correo electrónico*:</label>
        <input
            type="email"
            id="oldemail"
            name="oldemail"
            required
            value={oldemail}
            onChange={handlemail}
        ></input>
        <label htmlFor="newemail">Nuevo correo electrónico*:</label>
        <input
            type="text"
            id="newemail"
            name="newemail"
            required
            value={newemail}
            onChange={handlemail}
        ></input>

        <button className="Guardar" type="submit">
        Guardar
        </button>
        </form>
        </section>

);
};
export default Editemail;