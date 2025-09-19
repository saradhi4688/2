// frontend/src/components/QuizGenerated.tsx
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import API from '../api/api';

type Q = { id: string; text: string; type?: string; options?: string[] };

export default function QuizGenerated(): React.ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const state = (location.state || {}) as any;
  const [questions, setQuestions] = useState<Q[]>(
    Array.isArray(state.questions) ? state.questions : []
  );
  const [quizId, setQuizId] = useState<string | null | undefined>(
    state.quizId || null
  );
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  // redirect if no questions
  useEffect(() => {
    if (!questions || questions.length === 0) {
      const t = setTimeout(() => navigate('/profile-setup'), 1200);
      return () => clearTimeout(t);
    }
  }, [questions, navigate]);

  const setAnswer = (qid: string, val: any) => {
    setAnswers((p) => ({ ...p, [qid]: val }));
  };

  const submit = async () => {
    setLoading(true);
    try {
      const payload = { answers, quizId };
      const res = await API.post('/quiz/submit', payload);
      setResult(res.data);
    } catch (err) {
      console.error(err);
      alert('Submit failed — try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="p-6">
        <div className="bg-white p-6 rounded shadow">
          <div className="text-gray-700">
            No questions available. Redirecting to profile setup...
          </div>
        </div>
      </div>
    );
  }

  const suggestions = result?.quiz?.suggestions;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-3">Your Questions</h2>

        <div className="space-y-4">
          {questions.map((q) => (
            <div key={q.id} className="p-3 border rounded">
              <div className="font-medium">{q.text}</div>
              <div className="mt-2">
                {q.type === 'scale' ? (
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={answers[q.id] ?? 3}
                    onChange={(e) => setAnswer(q.id, Number(e.target.value))}
                  />
                ) : q.options && q.options.length ? (
                  q.options.map((opt) => (
                    <label key={opt} className="inline-flex items-center mr-3">
                      <input
                        type="radio"
                        name={q.id}
                        value={opt}
                        checked={answers[q.id] === opt}
                        onChange={() => setAnswer(q.id, opt)}
                        className="mr-2"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))
                ) : (
                  <input
                    className="input mt-2 border rounded px-2 py-1"
                    value={answers[q.id] ?? ''}
                    onChange={(e) => setAnswer(q.id, e.target.value)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 flex gap-3">
          <button
            onClick={submit}
            className="px-4 py-2 rounded bg-green-600 text-white"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Answers'}
          </button>
          <button
            onClick={() => navigate('/profile-setup')}
            className="px-4 py-2 rounded border"
          >
            Edit profile
          </button>
        </div>

        {/* Suggestions block */}
        {suggestions && (
          <div className="mt-6 p-4 border rounded bg-gray-50">
            <h3 className="font-semibold mb-3">Personalized Suggestions</h3>

            <div className="mb-3">
              <strong>Recommended Streams:</strong>
              <div className="mt-1">
                {(suggestions.recommendedStreams || []).join(', ')}
              </div>
            </div>

            <div className="mb-3">
              <strong>Top Courses:</strong>
              <ul className="list-disc ml-6 mt-1">
                {(suggestions.topCourses || []).map((c: any, i: number) => (
                  <li key={i}>
                    <strong>{c.title}</strong>
                    {c.why ? ` — ${c.why}` : ''}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <strong>Career Paths:</strong>
              <ul className="list-disc ml-6 mt-1">
                {(suggestions.careerPaths || []).map((p: any, i: number) => (
                  <li key={i}>
                    <strong>{p.role}</strong>
                    {p.path ? ` — ${p.path}` : ''}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-3">
              <strong>Next Steps:</strong>
              <ol className="list-decimal ml-6 mt-1">
                {(suggestions.nextSteps || []).map((s: any, i: number) => (
                  <li key={i}>{s}</li>
                ))}
              </ol>
            </div>

            <div className="text-sm text-gray-600 mt-2">
              Confidence: {(suggestions.confidence ?? 0).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
