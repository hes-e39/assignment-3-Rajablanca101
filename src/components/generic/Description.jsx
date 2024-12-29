import React from 'react';
import './Description.css';

const Description = ({ description, onChange, isEditing }) => {
  if (isEditing) {
    return (
      <div className="description-container">
        <label className="description-label">Exercise Description:</label>
        <textarea
          className="description-input"
          value={description || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Describe your exercise (e.g., '50 push-ups' or 'Run 1 mile')"
        />
      </div>
    );
  }

  
  return description ? (
    <div className="description-container">
      <div className="description-text">{description}</div>
    </div>
  ) : null;
};

export default Description;