import { useEffect, useState } from 'react';
import fetcher from '../../helpers/fetcher';
import './footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    console.log(email);
  }, [email]);

  const createNewsletter = async (e) => {
    e.preventDefault();
    console.log('al mandar al fetch ' + { email });

    await fetcher(setEmail, 'newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(email),
    });
  };

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
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="example@gmail.com"
            ></input>

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
