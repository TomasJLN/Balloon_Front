import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    console.log(recoveryCode, newPassword);
    setError(null);
    await fetcher(setResult, setError, setLoading, 'user/password/reset', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ recoveryCode, newPassword }),
    });
  };

  useEffect(() => {
    console.log(result);
    result.includes('Contraseña actualizada') && navigate('/account');
  }, [result]);

  return (
    <div>
      <h1>Pantalla de recovery password</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="recoveryCode">Código de recuperación:</label>
        <input
          type="text"
          id="recoveryCode"
          onChange={(e) => setRecoveryCode(e.target.value)}
        />
        <label htmlFor="newPassword">Nueva Contraseña:</label>
        <input
          type="password"
          id="newPassword"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Enviar
        </button>
      </form>
    </div>
  );
};
export default RecoveryPassword;
