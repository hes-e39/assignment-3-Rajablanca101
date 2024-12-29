// Throttled storage helper to prevent excessive writes
let storageTimeout = null;
const STORAGE_DELAY = 1000; // Save every second

export const saveTimerState = (state) => {
  if (storageTimeout) {
    clearTimeout(storageTimeout);
  }

  storageTimeout = setTimeout(() => {
    localStorage.setItem('timerState', JSON.stringify({
      ...state,
      timestamp: Date.now()
    }));
  }, STORAGE_DELAY);
};


export const loadTimerState = () => {
  const savedState = localStorage.getItem('timerState');
  if (!savedState) return null;

  const state = JSON.parse(savedState);
  const timePassed = Date.now() - state.timestamp;

  // Update time-based values considering elapsed time
  return adjustTimerState(state, timePassed);
};

const adjustTimerState = (state, timePassed) => {
  const adjustedState = { ...state };

  // Adjust countdown timer
  if (state.countdownIsRunning && !state.countdownIsPaused) {
    adjustedState.countdownTime = Math.max(0, state.countdownTime - timePassed);
  }

  // Adjust stopwatch timer
  if (state.stopwatchIsRunning && !state.stopwatchIsPaused) {
    adjustedState.stopwatchTime = Math.min(
      state.stopwatchTargetValue,
      state.stopwatchTime + timePassed
    );
  }

  // Adjust XY timer
  if (state.xyIsRunning && !state.xyIsPaused) {
    const timePerRound = state.xyTimeValue;
    const totalElapsed = (state.xyCurrentRound - 1) * timePerRound + 
      (timePerRound - state.xyTime) + timePassed;
    
    adjustedState.xyCurrentRound = Math.min(
      state.xyRounds,
      Math.floor(totalElapsed / timePerRound) + 1
    );
    adjustedState.xyTime = timePerRound - (totalElapsed % timePerRound);
  }

  // Adjust Tabata timer
  if (state.tabataIsRunning && !state.tabataIsPaused) {
    const workoutTime = state.tabataTotalCountdown;
    const restTime = state.tabataTotalRestdown;
    const cycleTime = workoutTime + restTime;
    const totalElapsed = (state.tabataCurrentRound - 1) * cycleTime +
      (workoutTime - state.tabataCountdown) +
      (restTime - state.tabataRestdown) + timePassed;
    
    adjustedState.tabataCurrentRound = Math.min(
      state.tabataRounds,
      Math.floor(totalElapsed / cycleTime) + 1
    );
    
    const remainingInCycle = totalElapsed % cycleTime;
    if (remainingInCycle < workoutTime) {
      adjustedState.tabataCountdown = workoutTime - remainingInCycle;
      adjustedState.tabataRestdown = restTime;
    } else {
      adjustedState.tabataCountdown = 0;
      adjustedState.tabataRestdown = cycleTime - remainingInCycle;
    }
  }

  return adjustedState;
};