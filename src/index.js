import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { createRoot } from 'react-dom/client';
import Quiz from './components/Quiz';
import { QuizProvider } from './contexts/quiz';

const App = () => {
  return (
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  );
};

const root = createRoot(document.getElementById('app'));

root.render(<App />);
