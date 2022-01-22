import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <section className="newsletter">
        <form className="sendEmail">
          <h2>NEWSLETTER</h2>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
          ></input>
          <button className="enviar" type="submit">
            Enviar
          </button>
        </form>
        <form className="condition">
          <input type="checkbox" id="politica" name="politica"></input>
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
