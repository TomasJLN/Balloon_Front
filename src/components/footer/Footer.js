import React, { useState } from 'react';
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
            <a href="" target="blank">
              Condiciones de Uso
            </a>
          </li>
          <li>
            <a href="" target="blank">
              Política de privacidad
            </a>
          </li>
          <li>
            <a href="" target="blank">
              Contacto
            </a>
          </li>
          <li>
            <a href="" target="blank">
              FAQ
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
