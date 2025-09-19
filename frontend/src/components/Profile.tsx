import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await API.get('/auth/profile');
        if (!mounted) return;
        setProfile(res.data.user || {});
      } catch {
        navigate('/auth');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-xl shadow-lg animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Your Profile</h2>
          <div className="flex gap-2">
            <Link to="/quiz" className="px-3 py-2 border rounded hover:bg-gray-50">Take Quiz</Link>
            <button onClick={logout} className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700">Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['name','email','age','gender','classLevel'].map(key => (
            <Field key={key} label={key} value={profile[key]} />
          ))}
          <Field label="Interests" value={profile.interests?.join(', ')} />
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Quiz History</h3>
          {profile.quizHistory?.length ? (
            <ul className="space-y-2">
              {profile.quizHistory.slice().reverse().map((q: any) => (
                <li key={q.quizId} className="p-2 border rounded">Recommended: {q.recommendedStreams?.join(', ') || '—'}</li>
              ))}
            </ul>
          ) : (<div>No quizzes yet.</div>)}
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | number }) {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-lg font-medium">{value || '—'}</div>
    </div>
  );
}
