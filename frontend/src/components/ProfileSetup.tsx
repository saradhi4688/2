// frontend/src/components/ProfileSetup.tsx
import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function ProfileSetup() {
  const [age, setAge] = useState<number | ''>('');
  const [interests, setInterests] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Load existing profile if logged in
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await API.get('/user/profile', { headers });
        if (!mounted) return;
        const p = res.data.user;
        if (p?.age) setAge(p.age);
        if (p?.interests) setInterests(Array.isArray(p.interests) ? p.interests.join(', ') : p.interests);
      } catch {
        // ignore guest
      }
    })();
    return () => { mounted = false; };
  }, []);

  const submit = async (ev?: React.FormEvent) => {
    ev?.preventDefault();
    setLoading(true);
    setError('');

    try {
      const interestArray = interests.split(',').map(i => i.trim()).filter(Boolean);
      if (!age || !interestArray.length) {
        setError('Age and interests are required.');
        setLoading(false);
        return;
      }

      // Update profile for logged-in users
      const token = localStorage.getItem('token');
      if (token) {
        await API.patch('/user/profile', { age, interests: interestArray }, { headers: { Authorization: `Bearer ${token}` } });
      }

      // Generate quiz
      const res = await API.post('/quiz/generate', { age, interests: interestArray }, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      const { questions, quizId } = res.data;
      navigate('/quiz', { state: { questions, quizId } });

    } catch (err: any) {
      console.error('Quiz generation error:', err);
      setError('Failed to generate quiz. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg space-y-4 animate-fade-in"
      >
        <h1 className="text-2xl font-bold text-center">Tell us about yourself</h1>
        <InputField label="Age" type="number" value={age} onChange={setAge} min={10} max={80} />
        <InputField
          label="Interests (comma separated)"
          value={interests}
          onChange={setInterests}
          placeholder="e.g. math, coding, music"
        />

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          {loading ? 'Generating...' : 'Generate Quiz'}
        </button>
      </form>
    </div>
  );
}

// Input Field
function InputField({ label, type = 'text', value, onChange, min, max, placeholder }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-500">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
        min={min} max={max}
        placeholder={placeholder}
        className="mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
