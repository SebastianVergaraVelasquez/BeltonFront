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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <form
        onSubmit={handleSubmit}
        className="p-4 rounded shadow bg-white text-center"
        style={{ minWidth: '300px' }}
      >
        <img
          src="/media/logo.jpeg"
          alt="Belton Gym"
          className="mb-4"
          style={{ width: '100px', height: '100px' }}
        />

        <h2 className="mb-4">Iniciar Sesión</h2>

        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-dark w-100">
          Ingresar
        </button>
      </form>
    </div>
  );
}
