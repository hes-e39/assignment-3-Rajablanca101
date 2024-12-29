import React, { useState, useEffect, createContext } from 'react';
import Stopwatch from './components/timers/Stopwatch';
import Countdown from './components/timers/Countdown';
import XY from './components/timers/XY';
import Tabata from './components/timers/Tabata';
import { updateUrlFromTimers, getTimersFromUrl } from './utils/helpers';
import { saveTimerState, loadTimerState } from './utils/storage';

export const TimerContext = createContext({});

export const AppContext = ({ children }) => {
  const [timers, setTimers] = useState([]);
  const [timersChanged, setTimersChanged] = useState(0);
  const [appTimerAction, setAppTimerAction] = useState('');
  const [appTimerIndex, setAppTimerIndex] = useState(-1);


  useEffect(() => {
    const savedTimers = getTimersFromUrl();
    if (savedTimers.length > 0) {
      const timersWithComponents = savedTimers.map((timer, index) => ({
        ...timer,
        component: getTimerComponent(timer.title, index),
        valid: true,
        index,
      }));
      setTimers(timersWithComponents);
    }

    // Load saved timer state
    const savedState = loadTimerState();
    if (savedState) {
      // Restore all timer states
      setStopwatchTime(savedState.stopwatchTime);
      setStopwatchTargetValue(savedState.stopwatchTargetValue);
      setStopwatchIsRunning(savedState.stopwatchIsRunning);
      setStopwatchIsPaused(savedState.stopwatchIsPaused);

      setCountdownTime(savedState.countdownTime);
      setCountdownValue(savedState.countdownValue);
      setCountdownIsRunning(savedState.countdownIsRunning);
      setCountdownIsPaused(savedState.countdownIsPaused);

      setXyTime(savedState.xyTime);
      setXyTimeValue(savedState.xyTimeValue);
      setXyCurrentRound(savedState.xyCurrentRound);
      setXyIsRunning(savedState.xyIsRunning);
      setXyIsPaused(savedState.xyIsPaused);

      setTabataCountdown(savedState.tabataCountdown);
      setTabataRestdown(savedState.tabataRestdown);
      setTabataTotalCountdown(savedState.tabataTotalCountdown);
      setTabataTotalRestdown(savedState.tabataTotalRestdown);
      setTabataRounds(savedState.tabataRounds);
      setTabataCurrentRound(savedState.tabataCurrentRound);
      setTabataIsRunning(savedState.tabataIsRunning);
      setTabataIsPaused(savedState.tabataIsPaused);
    }
  }, []);

  const getTimerComponent = (title, index) => {
    const components = {
      Stopwatch: <Stopwatch controls={true} index={index} />,
      Countdown: <Countdown controls={true} index={index} />,
      XY: <XY controls={true} index={index} />,
      Tabata: <Tabata controls={true} index={index} />,
    };
    return components[title];
  };

  // Stopwatch states
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [stopwatchTargetValue, setStopwatchTargetValue] = useState(0);
  const [stopwatchIsRunning, setStopwatchIsRunning] = useState(false);
  const [stopwatchIsPaused, setStopwatchIsPaused] = useState(false);

  // Countdown states
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownValue, setCountdownValue] = useState(0);
  const [countdownIsRunning, setCountdownIsRunning] = useState(false);
  const [countdownIsPaused, setCountdownIsPaused] = useState(false);

  // XY states
  const [xyTime, setXyTime] = useState(0);
  const [xyTimeValue, setXyTimeValue] = useState(0);
  const [xyRounds, setXyRounds] = useState(2);
  const [xyCurrentRound, setXyCurrentRound] = useState(1);
  const [xyIsRunning, setXyIsRunning] = useState(false);
  const [xyIsPaused, setXyIsPaused] = useState(false);

  // Tabata states
  const [tabataCountdown, setTabataCountdown] = useState(0);
  const [tabataRestdown, setTabataRestdown] = useState(0);
  const [tabataTotalCountdown, setTabataTotalCountdown] = useState(0);
  const [tabataTotalRestdown, setTabataTotalRestdown] = useState(0);
  const [tabataRounds, setTabataRounds] = useState(0);
  const [tabataCurrentRound, setTabataCurrentRound] = useState(1);
  const [tabataIsRunning, setTabataIsRunning] = useState(false);
  const [tabataIsPaused, setTabataIsPaused] = useState(false);

  // Save timer state when any relevant state changes
  useEffect(() => {
    if (stopwatchIsRunning || countdownIsRunning || xyIsRunning || tabataIsRunning) {
      saveTimerState({
        stopwatchTime,
        stopwatchTargetValue,
        stopwatchIsRunning,
        stopwatchIsPaused,
        
        countdownTime,
        countdownValue,
        countdownIsRunning,
        countdownIsPaused,
        
        xyTime,
        xyTimeValue,
        xyRounds,
        xyCurrentRound,
        xyIsRunning,
        xyIsPaused,
        
        tabataCountdown,
        tabataRestdown,
        tabataTotalCountdown,
        tabataTotalRestdown,
        tabataRounds,
        tabataCurrentRound,
        tabataIsRunning,
        tabataIsPaused,
      });
    }
  }, [
    stopwatchTime, stopwatchIsRunning,
    countdownTime, countdownIsRunning,
    xyTime, xyCurrentRound, xyIsRunning,
    tabataCountdown, tabataRestdown, tabataCurrentRound, tabataIsRunning
  ]);

  const getNextValidIndex = (index) => {
    for (let i = index + 1; i < timers.length; i++) {
      if (timers[i].valid) {
        return i;
      }
    }
    return false;
  };

  const appControl = (value) => {
    if (value === 'Reset') {
      setAppTimerAction(value);
      localStorage.removeItem('timerState');
    } else if (value === 'Start') {
      setAppTimerAction(value);
      const appTimerNextIndex = getNextValidIndex(appTimerIndex);
      if (appTimerNextIndex === false) {
        setAppTimerIndex(0);
      } else {
        setAppTimerIndex(appTimerNextIndex);
      }
    } else if (value === 'Stop') {
      setAppTimerAction(value);
      localStorage.removeItem('timerState');
    } else if (value === 'Pause') {
      setAppTimerAction(value);
    } else if (value === 'Resume') {
      setAppTimerAction(value);
    } else if (value === 'Next') {
      setAppTimerAction('Start');
      const appTimerNextIndex = getNextValidIndex(appTimerIndex);
      if (appTimerNextIndex === false) {
        setAppTimerIndex(-1);
      } else {
        setAppTimerIndex(appTimerNextIndex);
      }
    }
  };

  const addTimer = (title) => {
    const index = timers.length;
    const newTimer = {
      title,
      data: null,
      component: getTimerComponent(title, index),
      valid: true,
      index,
    };
    
    setTimers([...timers, newTimer]);
    setTimersChanged(timersChanged + 1);
  };

  const updateTimer = (index, data) => {
    const updatedTimers = [...timers];
    updatedTimers[index] = {
      ...updatedTimers[index],
      valid: true,
      data,
    };
    setTimers(updatedTimers);
    updateUrlFromTimers(updatedTimers);
    setTimersChanged(timersChanged + 1);
  };

  const deleteTimer = (index) => {
    const updatedTimers = [...timers];
    updatedTimers[index].valid = false;
    updatedTimers[index].data = null;
    setTimers(updatedTimers);
    updateUrlFromTimers(updatedTimers);
    setTimersChanged(timersChanged + 1);
  };

  // Timer action handlers remain the same
  const handleStopwatchAction = (action) => {
    switch (action) {
      case 'Start':
        setStopwatchTime(0);
        setStopwatchIsRunning(true);
        setStopwatchIsPaused(false);
        break;
      case 'Pause':
        setStopwatchIsPaused(true);
        break;
      case 'Resume':
        setStopwatchIsPaused(false);
        break;
      case 'Reset':
        setStopwatchTime(0);
        setStopwatchTargetValue(0);
        setStopwatchIsRunning(false);
        setStopwatchIsPaused(false);
        localStorage.removeItem('timerState');
        break;
      default:
        break;
    }
  };

  const handleCountdownAction = (action) => {
    switch (action) {
      case 'Start':
        if (countdownValue > 0) {
          setCountdownTime(countdownValue);
          setCountdownIsRunning(true);
          setCountdownIsPaused(false);
        }
        break;
      case 'Pause':
        setCountdownIsPaused(true);
        break;
      case 'Resume':
        setCountdownIsPaused(false);
        break;
      case 'Reset':
        setCountdownTime(0);
        setCountdownValue(0);
        setCountdownIsRunning(false);
        setCountdownIsPaused(false);
        localStorage.removeItem('timerState');
        break;
      default:
        break;
    }
  };

  const handleXYAction = (action) => {
    switch (action) {
      case 'Start':
        setXyTime(xyTimeValue);
        setXyCurrentRound(1);
        setXyIsRunning(true);
        setXyIsPaused(false);
        break;
      case 'Pause':
        setXyIsPaused(true);
        break;
      case 'Resume':
        setXyIsPaused(false);
        break;
      case 'Reset':
        setXyTime(0);
        setXyTimeValue(0);
        setXyCurrentRound(1);
        setXyIsRunning(false);
        setXyIsPaused(false);
        localStorage.removeItem('timerState');
        break;
      default:
        break;
    }
  };

  const handleTabataAction = (action) => {
    switch (action) {
      case 'Start':
        setTabataCountdown(tabataTotalCountdown);
        setTabataRestdown(tabataTotalRestdown);
        setTabataCurrentRound(1);
        setTabataIsRunning(true);
        setTabataIsPaused(false);
        break;
      case 'Pause':
        setTabataIsPaused(true);
        break;
      case 'Resume':
        setTabataIsPaused(false);
        break;
      case 'Reset':
        setTabataCountdown(0);
        setTabataRestdown(0);
        setTabataRounds(0);
        setTabataCurrentRound(1);
        setTabataIsRunning(false);
        setTabataIsPaused(false);
        localStorage.removeItem('timerState');
        break;
      default:
        break;
    }
  };

  return (
    <TimerContext.Provider
      value={{
        // Timer management
        timers,
        addTimer,
        updateTimer,
        deleteTimer,
        appControl,
        appTimerAction,
        appTimerIndex,

        // Stopwatch state and methods
        stopwatchTime,
        setStopwatchTime,
        stopwatchTargetValue,
        setStopwatchTargetValue,
        stopwatchIsRunning,
        stopwatchIsPaused,
        handleStopwatchAction,

        // Countdown state and methods
        countdownTime,
        setCountdownTime,
        countdownValue,
        setCountdownValue,
        countdownIsRunning,
        countdownIsPaused,
        handleCountdownAction,

        // XY state and methods
        xyTime,
        setXyTime,
        xyTimeValue,
        setXyTimeValue,
        xyRounds,
        setXyRounds,
        xyCurrentRound,
        setXyCurrentRound,
        xyIsRunning,
        xyIsPaused,
        handleXYAction,

        // Tabata state and methods
        tabataCountdown,
        setTabataCountdown,
        tabataRestdown,
        setTabataRestdown,
        tabataTotalCountdown,
        setTabataTotalCountdown,
        tabataTotalRestdown,
        setTabataTotalRestdown,
        tabataRounds,
        setTabataRounds,
        tabataCurrentRound,
        setTabataCurrentRound,
        tabataIsRunning,
        tabataIsPaused,
        handleTabataAction,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default AppContext;