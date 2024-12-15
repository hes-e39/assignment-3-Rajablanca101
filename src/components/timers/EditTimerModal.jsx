import React from 'react';
import './EditTimerModal.css';

const EditTimerModal = ({ isOpen, onClose, onSave, timer, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-title">Edit {timer.title}</h2>
        {React.cloneElement(children, { isEditing: true })}
        <div className="modal-buttons">
          <button className="modal-save" onClick={onSave}>Save</button>
          <button className="modal-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};


export default EditTimerModal;