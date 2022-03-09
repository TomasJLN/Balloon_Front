import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import fetcher from '../../helpers/fetcher';
import './recovery-password.css';

const RecoveryPassword = () => {
  const [result, setResult] = useState('');
  const [recoveryCode, setRecoveryCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    await fetcher(setResult, setError, setLoading, 'user/password/reset', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recoveryCode, newPassword }),
    });
  };

  useEffect(() => {
    result.includes('Contraseña actualizada') && navigate('/account');
  }, [result]);

  useEffect(() => {
    error && toast.error(error);
    setRecoveryCode('');
    setNewPassword('');
  }, [error]);

  return (
    <div>
      <form className="generalForm" onSubmit={handleSubmit}>
        <h1 className="generalTitulo1">Recuperar contraseña</h1>
        <label className="generalLabel" htmlFor="recoveryCode">Código de recuperación:</label>
        <input
          className="generalInput"
          type="text"
          id="recoveryCode"
          value={recoveryCode}
          onFocus={() => setRecoveryCode('')}
          onChange={(e) => setRecoveryCode(e.target.value)}
          autoComplete="off"
        />
        <label className="generalLabel" htmlFor="newPassword">Nueva Contraseña:</label>
        <input
          className="generalInput"
          type="password"
          id="newPassword"
          value={newPassword}
          onFocus={() => setNewPassword('')}
          onChange={(e) => setNewPassword(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="generalButton"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RecoveryPassword;
