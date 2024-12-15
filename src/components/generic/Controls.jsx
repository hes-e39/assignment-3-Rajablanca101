import React from 'react';
import Button from './Button';
import './Controls.css';

const Controls = ({
  valueStart,
  valuePause,
  valueStop,
  valueReset,
  onClick,
}) => {
  return (
    <div className="controls-container">
      <Button
        displayName={valueStart}
        value={valueStart}
        className="controls-button start"
        onClick={onClick}
      />
      <Button
        displayName={valuePause}
        value={valuePause}
        className="controls-button pause"
        onClick={onClick}
      />
      <Button
        displayName={valueStop}
        value={valueStop}
        className="controls-button reset"
        onClick={onClick}
      />
    </div>
  );
};

export default Controls;
