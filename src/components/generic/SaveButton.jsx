import React from 'react';
import './SaveButton.css';

const SaveButton = ({ onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`save-button ${className}`}
      disabled={disabled}
    >
      Save Timer
    </button>
  );
};


export default SaveButton;