import React, { useState, useEffect } from 'react';

function Alert( props ) {
  const [timeRemaining, setTimeRemaining] = useState(3); 
  useEffect(() => {
    let timer;

    if (timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
    } 

    return () => {
      clearInterval(timer);
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      props.onClose();
    }
  }, [timeRemaining, props.onClose]);

  return (
    <div className="alert-container">
      <div className="alert" style={{ backgroundColor: `${props.color}` }}>
        <span className="close-button" onClick={props.onClose}>
          &times;
        </span>
        <p>{props.text}</p>
      </div>
    </div>
  );
};

export default Alert;
