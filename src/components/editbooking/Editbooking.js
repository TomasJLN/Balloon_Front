import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import './editbooking.css';

const Editbooking = () => {
//const mybooking = useMybooking();

return (
    <section>
         <form className="editbooking">
            <h2 className="editbooking">Mis reservas</h2>
            <div>Foto reserva</div>

            <button className="ver" type="submit">
            Ver
            </button>

            <button className="Valorar" type="submit">
            Valorar
            </button>

            <button className="Cancelar" type="submit">
            Cancelar
            </button>

    </form>

    </section>
   
    );
};

export default Editbooking;