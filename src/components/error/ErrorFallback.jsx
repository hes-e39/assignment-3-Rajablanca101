import React from 'react';
import './ErrorFallback.css';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="error-container">
      <h2 className="error-title">Something went wrong!</h2>
      <pre className="error-message">{error.message}</pre>
      <button
        className="error-retry-button"
        onClick={resetErrorBoundary}
      >
        Try again
        
      </button>
    </div>
  );
};

export default ErrorFallback;