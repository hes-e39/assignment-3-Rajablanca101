import React, { useContext, useEffect, useState } from 'react';
import DisplayTime from '../generic/DisplayTime';
import Controls from '../generic/Controls';
import Description from '../generic/Description';
import { TimerContext } from '../../AppContext';
import { useTimer } from '../../hooks/useTimer';
import './Stopwatch.css';

const Stopwatch = ({ controls, index, isEditing }) => {
  const {
    stopwatchTime,
    setStopwatchTime,
    stopwatchTargetValue,
    setStopwatchTargetValue,
    stopwatchIsRunning,
    stopwatchIsPaused,
    handleStopwatchAction,
    appControl,
    appTimerAction,
    appTimerIndex,
    updateTimer,
    timers,
  } = useContext(TimerContext);

  
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (index >= 0 && timers[index]?.data?.description) {
      setDescription(timers[index].data.description);
    }
  }, [index, timers]);

  useTimer({
    time: stopwatchTime,
    setTime: setStopwatchTime,
    isRunning: stopwatchIsRunning,
    isPaused: stopwatchIsPaused,
    targetValue: stopwatchTargetValue,
    onComplete: () => {
      handleStopwatchAction('Reset');
      appControl('Next');
    }
  });

  useEffect(() => {
    if (appTimerAction === 'Reset' || appTimerIndex === index) {
      handleStopwatchAction(appTimerAction);
    }
  }, [appTimerAction, appTimerIndex, index, handleStopwatchAction]);

  const handleTimeChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setStopwatchTargetValue(Number(value) * 1000);
    }
  };

  const handleDescriptionChange = (newDescription) => {
    setDescription(newDescription);
    if (index >= 0) {
      const currentTimer = timers[index];
      updateTimer(index, { 
        ...currentTimer.data,
        description: newDescription 
      });
    }
  };

  return (
    <div className="stopwatch-container">
      <DisplayTime milliseconds={stopwatchTime} uservalue={stopwatchTargetValue} />
      <Description 
        description={description}
        onChange={handleDescriptionChange}
        isEditing={isEditing}
      />
      <div className="stopwatch-input-container">
        <input
          type="number"
          className="styled-input"
          placeholder="Enter time in seconds"
          value={stopwatchTargetValue / 1000}
          onChange={handleTimeChange}
        />
      </div>
      {controls && (
        <Controls
          onClick={(e) => handleStopwatchAction(e.target.value)}
          valueStart="Start"
          valuePause={stopwatchIsPaused ? 'Resume' : 'Pause'}
          valueStop="Reset"
        />
      )}
    </div>
  );
};

export default Stopwatch;