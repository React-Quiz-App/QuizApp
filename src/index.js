import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import Quiz from './components/Quiz';
import { QuizProvider } from './contexts/quiz';
import HomePage from './components/HomePage';

const App = () => {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
};

const root = createRoot(document.getElementById('app'));

root.render(<App />);
