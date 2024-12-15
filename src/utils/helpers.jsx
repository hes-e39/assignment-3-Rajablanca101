// URL state management helpers
export const encodeTimerState = (timer) => {
  const stateMap = {
    Stopwatch: (data) => `sw-${data.targetValue}-${encodeURIComponent(data.description || '')}`,
    Countdown: (data) => `cd-${data.targetValue}-${encodeURIComponent(data.description || '')}`,
    XY: (data) => `xy-${data.targetValue}-${data.rounds}-${encodeURIComponent(data.description || '')}`,
    Tabata: (data) => `tb-${data.workTime}-${data.restTime}-${data.rounds}-${encodeURIComponent(data.description || '')}`,
  };

  return stateMap[timer.title]?.(timer.data) || '';
};

export const decodeTimerState = (encoded) => {
  const [type, ...params] = encoded.split('-');
  
  
  const typeMap = {
    sw: {
      title: 'Stopwatch',
      data: { 
        targetValue: parseInt(params[0]),
        description: decodeURIComponent(params[1] || '')
      },
    },
    cd: {
      title: 'Countdown',
      data: { 
        targetValue: parseInt(params[0]),
        description: decodeURIComponent(params[1] || '')
      },
    },
    xy: {
      title: 'XY',
      data: { 
        targetValue: parseInt(params[0]),
        rounds: parseInt(params[1]),
        description: decodeURIComponent(params[2] || '')
      },
    },
    tb: {
      title: 'Tabata',
      data: {
        workTime: parseInt(params[0]),
        restTime: parseInt(params[1]),
        rounds: parseInt(params[2]),
        description: decodeURIComponent(params[3] || '')
      },
    },
  };

  return typeMap[type] || null;
};

export const updateUrlFromTimers = (timers) => {
  const validTimers = timers.filter(t => t.valid && t.data);
  const encodedState = validTimers.map(t => encodeTimerState(t)).join('&');
  window.history.replaceState({}, '', `?timers=${encodedState}`);
};

export const getTimersFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  const timersParam = params.get('timers');
  
  if (!timersParam) return [];
  
  return timersParam
    .split('&')
    .map(decodeTimerState)
    .filter(Boolean);
};