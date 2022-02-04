import { useEffect, useState } from 'react';
import fetcher from '../../helpers/fetcher';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  const [mail, setMail] = useState({ email: '' });
  const [checkbox, setCheckbox] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    error && alert(error);
  }, [error, setError]);

  useEffect(() => {
    result && alert(result);
  }, [result, setResult]);

  const createNewsletter = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);
    if (checkbox) {
      await fetcher(setResult, setError, setLoading, 'newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(mail),
      });
    } else {
      alert('Debes aceptar la política de privacidad');
    }
    setMail({ email: '' });
    resetCheck();
  };

  const handleCheck = (e) => {
    setCheckbox(!checkbox);
  };

  const resetCheck = () => {
    setCheckbox(false);
  };

  const aviso = error ? true : false;

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

            <button className="enviar" type="submit">
              Enviar
            </button>
          </div>
          {/* {aviso && (
            <div style={{ color: 'red' }}>Inserte el correo correctamente</div>
          )} */}

          <div className="privacidad">
            <label htmlFor="politica">
              <input
                type="checkbox"
                id="politica"
                name="politica"
                onClick={handleCheck}
                checked={checkbox}
                onChange={(e) => setCheckbox(e.target.checked)}
              ></input>
              He leído y acepto la política de privacidad
            </label>
          </div>
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
