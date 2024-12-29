import React, { useContext } from 'react';
import { TimerContext } from '../AppContext';
import ConfigureTimers from '../components/timers/ConfigureTimers';
import ConfigureTimer from '../components/timers/ConfigureTimer';
import './ConfigureView.css';

const ConfigureView = () => {
  const {
    timers,
    addTimer,
    updateTimer,
    deleteTimer,
  } = useContext(TimerContext);

  const handleTimerAdd = (event) => {
    const timer = event.target.value;
    addTimer(timer);
  };

  const handleTimerUpdate = (index, data) => {
    updateTimer(index, data);
  };

  const handleTimerDelete = (event) => {
    const timerIndex = event.target.value;
    deleteTimer(timerIndex);
  };

  return (
    <div>
      <ConfigureTimers
        timers={timers}
        handleTimerUpdate={handleTimerUpdate}
        handleTimerDelete={handleTimerDelete}
      />
      <ConfigureTimer handleTimerAdd={handleTimerAdd} />
    </div>
  );
};

export default ConfigureView;