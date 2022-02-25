import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import fetcher from '../../helpers/fetcher';
import './popup.css';

export const Popup = ({ setShowPopup }) => {
  const [emailRecovery, setEmailRecovery] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRecoveryPassword = async (e) => {
    e.preventDefault();
    console.log('Recuperando contraseña...', emailRecovery);
    setError(null);
    await fetcher(setResult, setError, setLoading, 'user/password/recover', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: emailRecovery }),
    });
  };

  useEffect(() => {
    !error && result.includes('comprueba tu email') && navigate('/recovery');
  }, [result]);

  useEffect(() => {
    error && console.log(error);
  }, [error]);

  return (
    <section id="popup-bg" onClick={() => setShowPopup(false)}>
      <article id="popup-fg" onClick={(e) => e.stopPropagation()}>
        <h3>RECUPERAR CONTRASEÑA</h3>
        <form id="popup-form" onSubmit={handleRecoveryPassword}>
          <label htmlFor="email-recovery">Email</label>
          <input
            type="text"
            id="email-recovery"
            size="30"
            onChange={(e) => {
              setEmailRecovery(e.target.value);
            }}
          />
          <button type="submit" className="btn-send">
            Recuperar
          </button>
        </form>
      </article>
    </section>
  );
};
