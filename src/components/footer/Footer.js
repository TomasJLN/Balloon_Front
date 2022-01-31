import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const [input, setInput] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  //Función que se encargará de introducir el correo

  const inputHandle = (e) => {
    setInput(e.target.value);
  };

  //Función que se encargará de validar el correo y
  //enviar el formulario a la bbdd

  const HandleSubmit = (e) => {
    e.preventDefault();

    if (input) {
      console.log(input);
      //añadir a la base de datos.
      setInput('');
    }
  };

  const inputCheckbox = (e) => {
    setCheckbox(!checkbox);
    console.log(checkbox);
  };
  return (
    <footer className="footer">
      <section className="newsletter">
        <form className="sendEmail" onSubmit={HandleSubmit}>
          <h2>NEWSLETTER</h2>
          <input
            type="text"
            id="email"
            value={input}
            onChange={inputHandle}
            placeholder="example@gmail.com"
          ></input>
          <button className="enviar" type="submit">
            Enviar
          </button>
        </form>
        <form className="condition">
          <input
            type="checkbox"
            id="politica"
            onChange={inputCheckbox}
            value={checkbox}
          ></input>

          <label htmlFor="politica">
            He leído y acepto la política de privacidad
          </label>
        </form>
      </section>
      <section className="links">
        <ul>
          <li>
            <Link to="/infoPage" target="blank">
              Condiciones de Uso
            </Link>
          </li>
          <li>
            <Link to="/infoPage" target="blank">
              Política de privacidad
            </Link>
          </li>
          <li>
            <Link to="/contact-form">Contacto</Link>
          </li>
          <li>
            <Link to="/infoPage" target="blank">
              FAQ
            </Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
