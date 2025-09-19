// frontend/src/components/QuizPage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { questions, quizId } = location.state || { questions: [], quizId: null };

  if (!questions || !questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No questions available. Go back and generate a quiz.</p>
        <button onClick={() => navigate('/profile-setup')} className="ml-4 px-4 py-2 border rounded">Back</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg animate-fade-in space-y-4">
        <h2 className="text-2xl font-bold">Your Quiz</h2>
        {questions.map((q: any, i: number) => (
          <div key={q.id} className="p-3 border rounded">
            <p className="font-medium">{i + 1}. {q.text}</p>
            <input type="text" placeholder="Your answer..." className="mt-2 w-full p-2 border rounded" />
          </div>
        ))}
        <button
          onClick={() => navigate('/profile')}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
