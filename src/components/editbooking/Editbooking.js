import React, {useState} from 'react';
import './editbooking.css';

const Editbooking = () => {
//const mybooking = useMybooking();

return (

    <form className="editbooking">
        <h2 className="editbooking">Mis reservas</h2>


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
    );
};

export default Editbooking;