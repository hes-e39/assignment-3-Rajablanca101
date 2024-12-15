import './DisplayTime.css'; 


const DisplayTime = ({ milliseconds, uservalue }) => {

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000) 
      .toString()
      .padStart(2, '0'); 
    const seconds = Math.floor((time % 60000) / 1000) 
      .toString()
      .padStart(2, '0');
    const millis = (time % 1000).toString().padStart(3, '0'); 
    return { minutes, seconds, millis }; 
  };


  const elapsedTime = formatTime(milliseconds);


  const targetTime = formatTime(uservalue);

  return (
    <div className="display-time-container">
  
      <div>
        {elapsedTime.minutes}:{elapsedTime.seconds}:{elapsedTime.millis}
      </div>

      <div className="display-time-uservalue">
        Target: {targetTime.minutes}:{targetTime.seconds}
      </div>
    </div>
  );
};

export default DisplayTime;

