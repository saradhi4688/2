import React from 'react';
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen p-8">
      <header className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold">
          Digital Guidance — Find the right course & college
        </h1>
        <p className="mt-2">A free advisor for students considering graduation.</p>
        <div className="mt-6">
          <Link
            to="/quiz"
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            Take Quick Quiz
          </Link>
          <Link
            to="/colleges"
            className="ml-4 px-4 py-2 rounded border"
          >
            Nearby Colleges
          </Link>
        </div>
      </header>
    </div>
  );
}