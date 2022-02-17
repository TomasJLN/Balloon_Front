import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import './editbooking.css';

const Editbooking = () => {
//const mybooking = useMybooking();

return (
    <section>
         <form className="editbooking">
            <h2 id="reservas">Mis reservas</h2>
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

    <a href="#back">Volver a menú</a>

    </section>
   
    );
};

export default Editbooking;