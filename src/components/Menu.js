import React, { useState } from "react";
import "./Menu.css";

export const Menu = ({
  isGameStarted, 
  isGameFinished,
  toggleGameButton, 
  player1Name, 
  player2Name, 
  onPlayer1NameChange, 
  onPlayer2NameChange, 
  player1Time, 
  player2Time, 
  xPlaying,
  gameDuration,
  SetGameDuration,
  buttonLabel,
  isMenuActive
}) => {

  const GameDurationHandler = (event) => {
      SetGameDuration(parseInt(event.target.value));
  };

  const formatTime = (time) => {
    const timeLeft = gameDuration-time;
    const minutes = Math.floor(timeLeft/60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <section id="panel-control">
        <div className="timeset">
        <button id="start" className="startGame" onClick={toggleGameButton}>
        {buttonLabel}
        </button>
        <div>
      <h2>Enter Player Names</h2>
      <div className="player1-container">
        <label>
          Player 1:
          <input
            type="text"
            value={player1Name}
            onChange={(e) => onPlayer1NameChange(e.target.value)}
            placeholder="Enter Player 1 Name"
            disabled={!isMenuActive}
            className={!isMenuActive ? 'disabledTextBox' : ''}
          />
        </label>
      </div>
      <div className="player2-container">
        <label>
          Player 2:
          <input
            type="text"
            value={player2Name}
            onChange={(e) => onPlayer2NameChange(e.target.value)}
            placeholder="Enter Player 2 Name"
            disabled={!isMenuActive}
            className={!isMenuActive ? 'disabledTextBox' : ''}
          />
        </label>
      </div>
    </div>
        </div>
      <div className="form-metadata">
        <dl>
          <dt>Tempo:</dt>
          <div>
            <p>Player 1 Time : {formatTime(player1Time)}</p>
            <p>Player 2 Time : {formatTime(player2Time)}</p>
            <p>Current Turn: {xPlaying ? player1Name : player2Name}</p>
          </div>
       </dl>
       Select Game Duration: 
       <select className="select-time-button" value={gameDuration} onChange={GameDurationHandler} disabled={!isMenuActive}>
          <option value={5}>5s </option>
          <option value={60}>1 minute</option>
          <option value={120}>2 minutes</option>
          <option value={180}>3 minutes</option>
          <option value={240}>4 minutes</option>
       </select>
      </div>
    </section>
  );
}


