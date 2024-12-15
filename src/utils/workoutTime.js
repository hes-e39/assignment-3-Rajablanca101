export const calculateTotalWorkoutTime = (timers) => {
  return timers.reduce((total, timer) => {
    if (!timer.valid || !timer.data) return total;

    const timeMap = {
      Stopwatch: (data) => data.targetValue || 0,
      Countdown: (data) => data.targetValue || 0,
      XY: (data) => (data.targetValue || 0) * (data.rounds || 0),
      Tabata: (data) => (data.workTime + data.restTime) * data.rounds,
    };

    return total + (timeMap[timer.title]?.(timer.data) || 0);
  }, 0);
};

export const calculateRemainingTime = (timers, currentIndex, currentTimer) => {
  let remainingTime = 0;

  
  // Add remaining time for current timer
  if (currentTimer) {
    remainingTime += currentTimer;
  }

  // Add time for remaining timers
  for (let i = currentIndex + 1; i < timers.length; i++) {
    const timer = timers[i];
    if (!timer.valid || !timer.data) continue;

    const timeMap = {
      Stopwatch: (data) => data.targetValue || 0,
      Countdown: (data) => data.targetValue || 0,
      XY: (data) => (data.targetValue || 0) * (data.rounds || 0),
      Tabata: (data) => (data.workTime + data.restTime) * data.rounds,
    };

    remainingTime += timeMap[timer.title]?.(timer.data) || 0;
  }

  return remainingTime;
};