import React, { useEffect, useState } from 'react';
import API from '../api/api';

/**
 * @typedef {Object} TimelineItem
 * @property {string} _id
 * @property {string} title
 * @property {string} [description]
 * @property {string} [date] // ISO
 * @property {string} [type]
 */

export default function Timeline() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const loadTimeline = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await API.get('/timeline', { headers });
        if (!mounted) return;
        // backend returns items sorted; but ensure sorting client-side by date asc
        const data = res.data || [];
        data.sort((a, b) => {
          const da = a.date ? new Date(a.date).getTime() : 0;
          const db = b.date ? new Date(b.date).getTime() : 0;
          return da - db;
        });
        setItems(data);
      } catch (err) {
        console.error(err);
        if (err?.response?.status === 401) {
          setError('Please log in to see personalized timeline items.');
        } else {
          setError('Failed to load timeline. Try again later.');
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadTimeline();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow p-6">
        <h1 className="text-2xl font-semibold">Timeline & Notifications</h1>
        <p className="text-sm text-gray-500 mt-1">Admissions, scholarship windows, exam dates and more.</p>

        <div className="mt-6">
          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading timeline...</div>
          ) : error ? (
            <div className="text-center py-6 text-sm text-red-600">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No upcoming items.</div>
          ) : (
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it._id} className="p-4 border rounded-lg flex-col md:flex md:flex-row md:items-center md:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">{it.title}</h3>
                      <div className="text-sm text-gray-500 md:ml-4">
                        {it.date
                          ? new Intl.DateTimeFormat('en-IN', {
                              dateStyle: 'medium',
                              timeStyle: 'short',
                              timeZone: 'Asia/Kolkata'
                            }).format(new Date(it.date))
                          : 'Date not set'}
                      </div>
                    </div>

                    {it.type && <div className="text-xs mt-1 inline-block px-2 py-1 rounded bg-gray-100 text-gray-600">{it.type}</div>}

                    {it.description && <p className="mt-3 text-sm text-gray-700">{it.description}</p>}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
