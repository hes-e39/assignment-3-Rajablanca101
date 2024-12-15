import React from 'react';
import './EditButton.css';

const EditButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="edit-button">
      Edit Timer
    </button>
  );
};


export default EditButton;