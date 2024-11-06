import React from 'react'
import {Box} from "./Box"
import "./Board.css"

//const handleBoxClick = (tableIdx, boxIdx) => {



const Board = ({
tableIdx, 
board,
onClick, 
numberOfClick, 
disabledBoards, 
OWinBoard, 
XWinBoard, 
isGameStarted, 
isGameFinished,
isBoardActive
}) => {

  /// const isDisabled = disabledBoards.includes(tableIdx);
  const isOwin = OWinBoard.includes(tableIdx);
  const isXwin = XWinBoard.includes(tableIdx);

  let isDisabled = disabledBoards.includes(tableIdx) || !isBoardActive;



  const boardStyle = {
    //backgroundColor: numberOfClick >=5 ? "green" : "white"
    backgroundColor : isXwin === true ? "#5d31ff" :
    isOwin === true ? "#def241" :
    "grey"
  };

  return (
    <div className={`board ${isDisabled ? "disabled" : ""}`} style={boardStyle}>
        {board.map((value, idx) => (
            <Box 
              key={idx}
              value={value} 
              onClick={() => !isDisabled && value === null && onClick(tableIdx, idx)}/>
        ))}
    </div>
  )
}

export default Board;