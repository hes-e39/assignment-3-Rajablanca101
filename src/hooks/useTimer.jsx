import { useEffect } from 'react';

export const useTimer = ({
  time,
  setTime,
  isRunning,
  isPaused,
  targetValue,
  onComplete,
  interval = 10
}) => {
  useEffect(() => {
    let timer; 

    
    if (isRunning && !isPaused && time < targetValue) {
      timer = setInterval(() => {
        setTime(prev => {
          const newTime = prev + interval;
          if (newTime >= targetValue) {
            if (onComplete) {
              onComplete();
            }
            return targetValue;
          }
          return newTime;
        });
      }, interval);
    }

    
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning, isPaused, targetValue, interval, onComplete]);
};