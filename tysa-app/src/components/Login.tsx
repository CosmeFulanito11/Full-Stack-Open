import React, { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { findUser, setCurrentUser } from '../utils/storage';
import Notification from './ui/Notificacion';
import { Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notif, setNotif] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const user = findUser(email, password);

    if (user) {
      setCurrentUser(user);
      onLogin(user.email);

      setNotif({ message: `¡Bienvenido, ${user.name || user.email}!`, type: 'success' });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500); // Tiempo para que se vea la notificación
    } else {
      setNotif({ message: 'Credenciales incorrectas. Intenta de nuevo.', type: 'error' });
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  // Cierra automáticamente la notificación tras 3s
  useEffect(() => {
    if (notif) {
      const timer = setTimeout(() => setNotif(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notif]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#aabafc] via-[#3f4fc0] to-[#13186f] px-4 relative">

      {/* Notificación */}
      {notif && (
        <div className="absolute top-4 right-4 z-50">
          <Notification
            type={notif.type}
            message={notif.message}
            onClose={() => setNotif(null)}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md shadow-lg rounded-3xl p-6 sm:p-8 w-full max-w-md border border-white text-white"
      >
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-center mb-6 font-semibold">¡Bienvenido(a)!</h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm sm:text-base font-medium text-white mb-1">Email</label>
          <input
            type="email"
            id="email"
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm sm:text-base font-medium text-white mb-1">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 cursor-pointer"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm underline decoration-1 cursor-pointer text-center sm:text-left">¿Olvidaste tu contraseña?</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="button"
            className="w-full sm:w-1/2 bg-white/10 border border-white text-white py-2 rounded-xl hover:bg-white/20 transition"
            onClick={goToRegister}
          >
            Registrarse
          </button>

          <button
            type="submit"
            className="w-full sm:w-1/2 bg-white text-blue-600 py-2 rounded-xl hover:bg-gray-200 transition"
          >
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
