import React, { useState, useEffect } from "react";

const TouchTypingApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [nextKeys, setNextKeys] = useState("");
  const [keysPressed, setKeysPressed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [timer, setTimer] = useState(300);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Start the timer when the component mounts
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);

      // Stop the timer when 5 minutes are up
      if (timer === 0) {
        clearInterval(interval);
        setIsRunning(false);
      }

      return () => clearInterval(interval);
    }
  }, [isRunning, timer]);

  useEffect(() => {
    // Generate the next set of keys to type
    const availableKeys = ["a", "s", "d", "f", "j", "k", "l", ";"];
    const randomIndex = Math.floor(Math.random() * availableKeys.length);
    const nextKey = availableKeys[randomIndex];
    setNextKeys(nextKey);
  }, [inputValue]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Update the key count and accuracy
    const typedKeys = value.replace(/\s/g, "").length;
    setKeysPressed(typedKeys);

    const expectedKey = nextKeys.toLowerCase();
    const lastTypedKey = value[value.length - 1] || "";
    const isCorrect = lastTypedKey.toLowerCase() === expectedKey;
    const updatedAccuracy = isCorrect ? accuracy + 1 : accuracy - 1;
    setAccuracy(Math.max(0, Math.min(100, updatedAccuracy)));
  };

  const handleStart = () => {
    // Reset the state and start the timer
    setInputValue("");
    setKeysPressed(0);
    setAccuracy(100);
    setTimer(300);
    setIsRunning(true);
  };

  return (
    <div className="container">
      <h1 className="title">Touch Typing App</h1>
      <div className="typing-section">
        <p className="next-key">Next Key: {nextKeys}</p>
        <textarea
          className="typing-input"
          value={inputValue}
          onChange={handleInputChange}
          disabled={!isRunning}
          placeholder="Type here..."
        />
      </div>
      <div className="stats-section">
        <p className="timer">Time Remaining: {timer} seconds</p>
        <p className="key-count">Keys Pressed: {keysPressed}</p>
        <p className="accuracy">Accuracy: {accuracy}%</p>
      </div>
      {!isRunning && (
        <button className="start-button" onClick={handleStart}>
          Start Typing
        </button>
      )}
    </div>
  );
};

export default TouchTypingApp;
