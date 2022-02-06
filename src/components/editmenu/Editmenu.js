import {NavLink} from "react-router-dom";
import {FaUserCircle, FaUserCheck} from 'react-icons/fa';
import {FaLock, FaCalendarAlt} from 'react-icons/fa';
import './editmenu.css';


const Editmenu = () => {


return (

<section className="editmenu">
    <ul>
        <li>
        <NavLink exact to="/editprofile" activeClassName="active">
        Información personal
        </NavLink>
        <FaUserCheck/>
        </li>
        <li>
        <NavLink exact to="/editprofile" activeClassName="active"> 
        Seguridad
        </NavLink>
        <FaLock/>
        </li>
        <li>
        <NavLink exact to="/editprofile" activeClassName="editbooking">
        Mis reservas
        </NavLink>
        <FaCalendarAlt/>
        </li> 
    </ul>
</section>

);
};

export default Editmenu;