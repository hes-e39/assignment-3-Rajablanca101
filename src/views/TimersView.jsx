import React, { useContext, useEffect, useState } from 'react';
import Stopwatch from '../components/timers/Stopwatch';
import Countdown from '../components/timers/Countdown';
import XY from '../components/timers/XY';
import Tabata from '../components/timers/Tabata';
import TimerList from '../components/timers/TimerList';
import DisplayTotalWorkoutTime from '../components/generic/DisplayTotalWorkoutTime';
import { TimerContext } from '../AppContext';
import { updateUrlFromTimers } from '../utils/helpers';
import { calculateTotalWorkoutTime, calculateRemainingTime } from '../utils/workoutTime';
import './TimersView.css';

const TimersView = () => {
  const { 
    timers, 
    appTimerIndex,
    stopwatchTime,
    countdownTime,
    xyTime,
    tabataCountdown,
    tabataRestdown,
    stopwatchIsRunning,
    countdownIsRunning,
    xyIsRunning,
    tabataIsRunning
  } = useContext(TimerContext);
  
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const defaultTimers = [
    { title: 'Stopwatch', C: <Stopwatch controls={true} index={-1} /> },
    { title: 'Countdown', C: <Countdown controls={true} index={-1} /> },
    { title: 'XY', C: <XY controls={true} index={-1} /> },
    { title: 'Tabata', C: <Tabata controls={true} index={-1} /> },
  ];

  useEffect(() => {
    const total = calculateTotalWorkoutTime(timers);
    setTotalWorkoutTime(total);
    setRemainingTime(total);
  }, [timers]);

  useEffect(() => {
    if (appTimerIndex >= 0) {
      const currentTimer = timers[appTimerIndex];
      let currentTime = 0;

      if (currentTimer) {
        switch (currentTimer.title) {
          case 'Stopwatch':
            currentTime = stopwatchIsRunning ? 
              (currentTimer.data?.targetValue || 0) - stopwatchTime : 0;
            break;
          case 'Countdown':
            currentTime = countdownIsRunning ? countdownTime : 0;
            break;
          case 'XY':
            currentTime = xyIsRunning ? xyTime : 0;
            break;
          case 'Tabata':
            currentTime = tabataIsRunning ? 
              (tabataCountdown + tabataRestdown) : 0;
            break;
        }
      }

      const remaining = calculateRemainingTime(timers, appTimerIndex, currentTime);
      setRemainingTime(remaining);
    }
  }, [
    appTimerIndex,
    stopwatchTime,
    countdownTime,
    xyTime,
    tabataCountdown,
    tabataRestdown
  ]);

  const handleReorder = (sourceIndex, destinationIndex) => {
    const reorderedTimers = Array.from(timers);
    const [removed] = reorderedTimers.splice(sourceIndex, 1);
    reorderedTimers.splice(destinationIndex, 0, removed);
    
    const updatedTimers = reorderedTimers.map((timer, index) => ({
      ...timer,
      index,
      component: React.cloneElement(timer.component, { index })
    }));
    
    updateUrlFromTimers(updatedTimers);
  };

  const handleRemove = (index) => {
    const updatedTimers = timers.filter((_, i) => i !== index).map((timer, newIndex) => ({
      ...timer,
      index: newIndex,
      component: React.cloneElement(timer.component, { index: newIndex })
    }));
    
    updateUrlFromTimers(updatedTimers);
  };

  const validTimers = timers.filter(t => t.valid);

  return (
    <>
      {validTimers.length > 0 && (
        <DisplayTotalWorkoutTime 
          totalTime={totalWorkoutTime} 
          remainingTime={remainingTime}
        />
      )}
      <TimerList
        timers={validTimers}
        onReorder={handleReorder}
        onRemove={handleRemove}
      />
      {defaultTimers.map((timer) => (
        <div className="timer" key={`timer-${timer.title}`}>
          <div className="timer-title">{timer.title}</div>
          {timer.C}
        </div>
      ))}
    </>
  );
};

export default TimersView;