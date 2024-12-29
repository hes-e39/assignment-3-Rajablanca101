import React from 'react';
import './DisplayTotalWorkoutTime.css';

const DisplayTotalWorkoutTime = ({ totalTime, remainingTime }) => {
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="total-workout-container">
      <div className="total-time-label">Total Workout Time</div>
      <div className="total-time">
        {formatTime(remainingTime)} / {formatTime(totalTime)}
      </div>
    </div>
  );
};


export default DisplayTotalWorkoutTime;