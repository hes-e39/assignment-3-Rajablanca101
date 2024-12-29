import React, { useState } from 'react';
import './ConfigureTimers.css';
import SaveButton from '../generic/SaveButton';
import EditButton from '../generic/EditButton';
import Button from '../generic/Button';
import EditTimerModal from './EditTimerModal';

const ConfigureTimers = ({ timers, handleTimerUpdate, handleTimerDelete }) => {
  const [savedStates, setSavedStates] = useState({});
  const [editingTimer, setEditingTimer] = useState(null);

  const isConfigChanged = (timer) => {
    const currentConfig = getTimerConfig(timer);
    const savedConfig = savedStates[timer.index];
    return JSON.stringify(currentConfig) !== JSON.stringify(savedConfig);
  };
  

  const getTimerConfig = (timer) => {
    const timerData = {
      Stopwatch: () => ({
        targetValue: timer.component.props.targetValue || 0,
        description: timer.component.props.description || '',
      }),
      Countdown: () => ({
        targetValue: timer.component.props.value || 0,
        description: timer.component.props.description || '',
      }),
      XY: () => ({
        targetValue: timer.component.props.timeValue || 0,
        rounds: timer.component.props.rounds || 2,
        description: timer.component.props.description || '',
      }),
      Tabata: () => ({
        workTime: timer.component.props.workTime || 0,
        restTime: timer.component.props.restTime || 0,
        rounds: timer.component.props.rounds || 0,
        description: timer.component.props.description || '',
      }),
    };

    return timerData[timer.title]?.() || null;
  };

  const handleSave = (timer) => {
    const data = getTimerConfig(timer);
    handleTimerUpdate(timer.index, data);
    setSavedStates(prev => ({
      ...prev,
      [timer.index]: data
    }));
    setEditingTimer(null);
  };

  const handleEdit = (timer) => {
    setEditingTimer(timer);
  };

  return (
    <div className="configure-timers">
      {timers
        .filter((e) => e.valid)
        .map((timer) => (
          <div
            className="configure-timer"
            key={`timer-${timer.title}-${timer.index}`}
          >
            <div className="configure-timer-title">{timer.title}</div>
            {timer.component}
            <div className="configure-timer-actions">
              <SaveButton
                onClick={() => handleSave(timer)}
                className="save-button"
                disabled={!isConfigChanged(timer)}
              />
              <EditButton onClick={() => handleEdit(timer)} />
              <Button
                displayName="Delete"
                value={timer.index}
                className="btn btn-danger"
                onClick={handleTimerDelete}
              />
            </div>
          </div>
        ))}
      {editingTimer && (
        <EditTimerModal
          isOpen={true}
          onClose={() => setEditingTimer(null)}
          onSave={() => handleSave(editingTimer)}
          timer={editingTimer}
        >
          {React.cloneElement(editingTimer.component, { isEditing: true })}
        </EditTimerModal>
      )}
    </div>
  );
};

export default ConfigureTimers;