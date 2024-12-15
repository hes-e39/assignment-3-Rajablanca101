import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './components/error/ErrorFallback';

import DocumentationView from './views/DocumentationView';
import TimersView from './views/TimersView';
import ConfigureView from './views/ConfigureView';
import AppContext from './AppContext';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Sample Timers</Link>
        </li>
        <li>
          <Link to="/add">My Timers</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <AppContext>
        <div>
          <Router>
            <Nav />
            <Routes>
              <Route path="/docs" element={<DocumentationView />} />
              <Route path="/" element={<TimersView />} />
              <Route path="/add" element={<ConfigureView />} />
            </Routes>
          </Router>
        </div>
      </AppContext>
    </ErrorBoundary>
  );
};

export default App;