import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './components/Root';

const App = () => {
  return <Root />;
};

const root = createRoot(document.getElementById('app'));

root.render(<App />);
