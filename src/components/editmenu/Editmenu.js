import {NavLink} from "react-router-dom";
import {FaLock, FaCalendarAlt, FaUserCircle} from 'react-icons/fa';
import './editmenu.css';


const Editmenu = () => {


return (

<section className="editmenu">
    <ul>
        <li>
        <div><FaUserCircle/></div>
        <NavLink exact to="/editprofile" activeClassName="active">
        Cambiar mi foto
        </NavLink>
        </li>
        <li><div><FaLock/></div>
        <NavLink exact to="/editprofile" activeClassName="active"> 
        Cambiar mis datos
        </NavLink>
        </li>
        <li><div><FaCalendarAlt/></div>
        <NavLink exact to="/editprofile" activeClassName="Editbooking">
        Mis reservas
        </NavLink>

        </li> 
    </ul>
</section>

);
};

export default Editmenu;