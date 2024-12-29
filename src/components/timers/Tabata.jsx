import React, { useEffect, useContext, useState } from 'react';
import './Tabata.css';
import DisplayTime from '../generic/DisplayTime';
import Controls from '../generic/Controls';
import Description from '../generic/Description';
import { TimerContext } from '../../AppContext';

const Tabata = ({ controls, index, isEditing }) => {
  const {
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

  
  useEffect(() => {
    if (!tabataIsRunning || tabataIsPaused) return;

    const timer = setTimeout(() => {
      if (tabataCountdown > 0) {
        setTabataCountdown((prev) => prev - 10);
      } else if (tabataRestdown > 0) {
        setTabataRestdown((prev) => prev - 10);
      } else if (tabataCurrentRound < tabataRounds) {
        setTabataCurrentRound((prev) => prev + 1);
        setTabataCountdown(tabataTotalCountdown);
        setTabataRestdown(tabataTotalRestdown);
      } else {
        handleTabataAction('Reset');
        appControl('Next');
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [
    tabataCountdown,
    tabataRestdown,
    tabataIsRunning,
    tabataIsPaused,
    tabataCurrentRound,
    tabataRounds,
    tabataTotalCountdown,
    tabataTotalRestdown,
  ]);

  useEffect(() => {
    if (appTimerAction === 'Reset' || appTimerIndex === index) {
      handleTabataAction(appTimerAction);
    }
  }, [appTimerAction, appTimerIndex]);

  const handleInputChange = (type, value) => {
    const val = Number(value);
    if (val >= 0) {
      if (type === 'countdown') setTabataTotalCountdown(val * 1000);
      if (type === 'restdown') setTabataTotalRestdown(val * 1000);
      if (type === 'rounds') setTabataRounds(val);
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
    <div className="tabata-container">
      <DisplayTime milliseconds={tabataCountdown} uservalue={tabataTotalCountdown} />
      <DisplayTime milliseconds={tabataRestdown} uservalue={tabataTotalRestdown} />
      <div className="round-display">
        {tabataRounds ? `Round ${tabataCurrentRound} of ${tabataRounds}` : 'Number of Rounds'}
      </div>
      <Description 
        description={description}
        onChange={handleDescriptionChange}
        isEditing={isEditing}
      />
      <div className="tabata-inputs">
        {[
          {
            label: 'Workout Time (seconds):',
            value: tabataTotalCountdown / 1000,
            type: 'countdown',
          },
          {
            label: 'Rest Time (seconds):',
            value: tabataTotalRestdown / 1000,
            type: 'restdown',
          },
          { label: 'Rounds:', value: tabataRounds, type: 'rounds' },
        ].map(({ label, value, type }) => (
          <div key={type}>
            <label>{label}</label>
            <input
              type="number"
              value={value || ''}
              onChange={(e) => handleInputChange(type, e.target.value)}
            />
          </div>
        ))}
      </div>
      {controls && (
        <Controls
          onClick={(e) => handleTabataAction(e.target.value)}
          valueStart="Start"
          valuePause={tabataIsPaused ? 'Resume' : 'Pause'}
          valueStop="Reset"
        />
      )}
    </div>
  );
};

export default Tabata;