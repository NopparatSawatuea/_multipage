import React, { useState, useEffect } from "react";
import "./animation.css";

const fieldwidth = 700;
const fieldheight = 400;
const ballSize = 90;
const maxX = fieldwidth - ballSize - 2;
const maxY = fieldheight - ballSize - 2;
const vx = 5;
const vy = 5;

const Animation = () => {
  const [running, setRunning] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [goRight, setGoRight] = useState(true);
  const [goDown, setGoDown] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [ballImage, setBallImage] = useState("");

  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        calculate();
      }, 25);
      return () => clearInterval(interval);
    }
  }, [running, x, y, goRight, goDown, rotation]);

  const calculate = () => {
    let newX = x;
    let newY = y;
    let newRotation = rotation;
    let right = goRight;
    let down = goDown;

    if (right) {
      newX = x + vx;
      newRotation += 10;
      if (newX >= maxX) right = false;
    } else {
      newX = x - vx;
      newRotation += 10;
      if (newX <= 0) right = true;
    }

    if (down) {
      newY = y + vy;
      newRotation += 10;
      if (newY >= maxY) down = false;
    } else {
      newY = y - vy;
      newRotation += 10;
      if (newY <= 0) down = true;
    }

    setX(newX);
    setY(newY);
    setGoRight(right);
    setGoDown(down);
    setRotation(newRotation);
  };

  const toggleRunning = () => {
    setRunning(!running);
  };

  const handleButtonClick = (image) => {
    setBallImage(image);
  };

  return (
    <div className="animation-container">
      <div id="field" className="field">
        <div
          id="ball"
          className="ball"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            backgroundImage: `url(${ballImage})`,
            transform: `rotate(${rotation}deg)`,
          }}
        ></div>
      </div>
      <div id="control" className="control">
        <button
          id="run"
          className={`btn ${running ? "btn-danger" : "btn-success"}`}
          onClick={toggleRunning}
        >
          <span className="bi bi-play">
            &nbsp; {running ? "Pause" : "Run"}
          </span>
        </button>&nbsp;&nbsp;
        <button
          id="none"
          className="btn btn-secondary"
          onClick={() => handleButtonClick("public/222.png")}
        >
          None
        </button>&nbsp;
        <button
          id="basketball"
          className="btn btn-outline-primary"
          onClick={() => handleButtonClick("public/bask.webp")}
        >
          Basketball
        </button>&nbsp;
        <button
          id="football"
          className="btn btn-outline-primary"
          onClick={() => handleButtonClick("public/football.png")}
        >
          Football
        </button>&nbsp;
        <button
          id="volleyball"
          className="btn btn-outline-primary"
          onClick={() => handleButtonClick("public/volley.webp")}
        >
          Volleyball
        </button>&nbsp;
        <button
          id="humanball"
          className="btn btn-outline-primary"
          onClick={() => handleButtonClick("public/handsomeboy.png")}
        >
          Humanball
        </button>&nbsp;
        <button
          id="cartoonball"
          className="btn btn-outline-primary"
          onClick={() => handleButtonClick("public/Cartoon.png")}
        >
          Cartoonball
        </button>
      </div>
    </div>
  );
};

export default Animation;
