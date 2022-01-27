import { useEffect, useState } from 'react';
import fetcher from '../../helpers/fetcher';
import './footer.css';

const Footer = () => {
  const [mail, setMail] = useState({ email: '' });
  const [checkbox, setCheckbox] = useState(false);
  const [result, setResult] = useState([]);

  const createNewsletter = async (e) => {
    e.preventDefault();

    if (checkbox) {
      await fetcher(setResult, 'newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mail),
      });
      alert(result);
    } else {
      alert('Debes aceptar la política de privacidad, coño!!');
    }
  };

  const aviso = result.includes('no puede quedar') ? true : false;

  return (
    <footer className="footer">
      <section className="newsletter">
        <form className="sendEmail" onSubmit={createNewsletter}>
          <h2>NEWSLETTER</h2>
          <div>
            <input
              type="text"
              id="email"
              name="email"
              value={mail.email}
              onChange={(e) => {
                setMail({ email: e.target.value });
              }}
              placeholder="example@gmail.com"
            ></input>
            {aviso && <div>Correo mal</div>}

            <button className="enviar" type="submit">
              Enviar
            </button>
          </div>
          <div>
            <input
              type="checkbox"
              id="politica"
              name="politica"
              value={checkbox}
              onChange={(e) => {
                setCheckbox(!checkbox);
                console.log(checkbox);
              }}
            ></input>
          </div>
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
