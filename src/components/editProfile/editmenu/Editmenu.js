import {FaLock, FaCalendarAlt, FaUserCircle} from 'react-icons/fa';
import './editmenu.css';


const Editmenu = () => {


return (

<section className="editmenu">
    <ul>
        <li>
            <div id="back"><FaUserCircle/></div>
            <a href="#foto">Cambiar mi foto</a>
        </li>
        <li>
            <div><FaLock/></div>
            <a href="#datos">Cambiar mis datos</a>
        </li>
        <li>
            <div><FaCalendarAlt/></div>
            <a href="#reservas">Mis reservas</a>
        </li> 
    </ul>
</section>

);
};

export default Editmenu;