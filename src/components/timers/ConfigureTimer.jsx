import React from 'react';
import './ConfigureTimer.css';
import Button from '../generic/Button';

const ConfigureTimer = ({ handleTimerAdd }) => {
  return (
    <div className="configure-timer-container">
      <div className="configure-timer-label">
        <label>Add Timer(s): </label>
      </div>
      <div className="configure-timer-buttons-row">
        <Button
          displayName="Add Stopwatch"
          value="Stopwatch"
          className="btn btn-stopwatch"
          onClick={handleTimerAdd}
        />
        <Button
          displayName="Add Countdown"
          value="Countdown"
          className="btn btn-countdown"
          onClick={handleTimerAdd}
        />
        
      </div>
      <div className="configure-timer-buttons-row">
        <Button
          displayName="Add XY"
          value="XY"
          className="btn btn-xy"
          onClick={handleTimerAdd}
        />
        <Button
          displayName="Add Tabata"
          value="Tabata"
          className="btn btn-tabata"
          onClick={handleTimerAdd}
        />
      </div>
    </div>
  );
};

export default ConfigureTimer;
