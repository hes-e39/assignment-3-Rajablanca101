import React from 'react';
import './DisplayRound.css';

const DisplayRound = ({ round, total, uservalue }) => {
  return (
    <div className="display-round-container">
      {round} / {total}
      <div className="display-round-uservalue">{uservalue}</div>
    </div>
  );
};


export default DisplayRound;
