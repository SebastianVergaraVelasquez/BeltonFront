import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) navigate('/');
    else alert('Credenciales inválidas');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <h2>Iniciar Sesión</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)}  />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
}
