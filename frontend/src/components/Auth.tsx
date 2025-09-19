import React, { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    setError('');
    try {
      const endpoint = mode === 'login' ? '/auth/login' : '/auth/register';
      const payload = mode === 'login' ? { email, password } : { name, email, password };
      const res = await API.post(endpoint, payload);
      localStorage.setItem('token', res.data.token);
      navigate('/profile');
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Authentication failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4">{mode === 'login' ? 'Login' : 'Register'}</h2>
        {mode === 'register' && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input w-full mb-3 p-2 border rounded"
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input w-full mb-3 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input w-full mb-3 p-2 border rounded"
        />
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          onClick={submit}
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        <p className="mt-3 text-sm text-gray-500">
          {mode === 'login' ? 'No account?' : 'Already have an account?'}{' '}
          <span
            className="text-indigo-600 cursor-pointer"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
}
