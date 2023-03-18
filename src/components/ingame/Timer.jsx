import React, { useState, useEffect } from "react";

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [previousTime, setPreviousTime] = useState(30 * 60);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!paused) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [paused]);

  useEffect(() => {
    if (timeLeft === 0) {
      setPlayerTurn((prevPlayerTurn) => (prevPlayerTurn === 1 ? 2 : 1));
      setPreviousTime(timeLeft);
      setTimeLeft(previousTime);
    }
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const switchTurns = () => {
    setPlayerTurn((prevPlayerTurn) => (prevPlayerTurn === 1 ? 2 : 1));
    setPreviousTime(timeLeft);
    setTimeLeft(previousTime);
  };

  const togglePause = () => {
    setPaused((prevPaused) => !prevPaused);
  };

  return (
    <div>
      <p>Player {playerTurn}'s turn</p>
      <p>
        {minutes.toString().padStart(2, "0")}:
        {seconds.toString().padStart(2, "0")}
      </p>
      {paused ? (
        <button onClick={togglePause}>Resume</button>
      ) : (
        <button onClick={togglePause}>Pause</button>
      )}
      <button onClick={switchTurns}>Switch turns</button>
    </div>
  );
}

export default CountdownTimer;
