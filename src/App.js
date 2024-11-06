import React, { useState, useEffect } from "react";
import  Board  from "./components/Board";
import './App.css';
import { Header } from "./components/Header";
import { Menu } from "./components/Menu";
import { isDisabled } from "@testing-library/user-event/dist/utils";


const App = () => {
  //Variáveis de estado
  const [OXnumberOfClick, setOXnumberOfClick] = useState(1);
  const [disabledBoards, setDisabledBoards] = useState([]);
  const [OWinBoard,setOWinBoard] = useState([]);
  const [XWinBoard,setXWinBoard] = useState([]);
  const [FullBoard,setFullBoard] = useState([]);
  const [player1Time, setPlayer1Time] = useState(0);
  const [player2Time, setPlayer2Time] = useState(0);
  const [gameDuration, SetGameDuration] = useState(60)
  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [ultimateBoard,setUltimateBoard] = useState(Array(9).fill(Array(9).fill(null)));
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 })
  ///used to ster f.e. timers
  const [gameOver, setGameOver] = useState(false);
  /// used to controls game states ster by button up making games conditions
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name,setPlayer2Name] = useState('');
  const [buttonLabel, setButtonLabel] = useState('Start Game');
  const [isMenuActive, setIsMenuActive] = useState(true);
  const [isBoardActive, setIsBoardActive] = useState(false);
  ///game is not started and not finished --- enter time and data to menu //DISPLAY -- NEW GAME
  ///game is started and not finished ------- keep playing //DISPLAY -- STOP GAME
  ///game is started and finished ----------- keep having boards displayed, keep having menu frozen until press button reset //DISPLAY -- RESTART GAME
  ///game is not started and finshed -------- board is clean and frozen, menu options are avaible //DISPLAY -- NEW GAME

  //Functionality to add
  //1. When button has dispalay - restart game - make menu frozen
  //2. when button again has new game - menu open, board frozen

  //komponenty board and menu zależą od is game started
  // trzeba stworzyć zmienną która będzie s

  const toggleGameButton = () => {
    if (!isGameStarted && !isGameFinished){
      setIsGameStarted(prevState => !prevState);
      setIsGameFinished(prevState => !prevState);
      setIsMenuActive(prevState => !prevState);
      setIsBoardActive(prevState => !prevState);
      setButtonLabel('Stop Game');
    }
    // źle działa
     if (isGameStarted && !isGameFinished){
      setIsGameFinished(prevState => !prevState);
      setIsBoardActive(prevState => !prevState);
      setIsMenuActive(prevState => !prevState);
      setGameOver(false);
      setButtonLabel('Stop Game');
    }
    else if (isGameStarted && isGameFinished){
      setIsGameStarted(prevState => !prevState);
      setIsBoardActive(prevState => !prevState);
      setButtonLabel('Restart Game');
    }
    // Źle działa, zablokuj menu
    else if(!isGameStarted && isGameFinished){
      resetBoard();
      setGameOver(true);
      setIsMenuActive(prevState => !prevState);
      setIsGameFinished(prevState => !prevState);
      setIsGameStarted(prevState => !prevState); 
      setButtonLabel('New Game');
    }
    console.log("Is Game started "+isGameStarted);
    console.log("Is Game Finished "+isGameFinished);
    console.log("is menu active "+ isMenuActive);
    console.log("is board active "+isBoardActive);
  }

  const handlePlayer1NameChange = (name) => {
    setPlayer1Name(name);
  }

  const handlePlayer2NameChange = (name) => {
    setPlayer2Name(name);
  }

  function resetData (){
    setOWinBoard ([]);
    setXWinBoard ([]);
    setFullBoard ([]);
    setDisabledBoards ([]);
    setOXnumberOfClick(0);
    setXPlaying(true);
    setPlayer1Time(0);
    setPlayer2Time(0);
  }

  function addDisabledBoard(board){
    if (!disabledBoards.includes(board)){
      setDisabledBoards((prevBoards) => [...prevBoards, board]);
    }
  }

  function addOWinBoard(board){
    if(!OWinBoard.includes(board)){
      setOWinBoard((prevBoards) => [...prevBoards,board]);
    }
  }

  function addXWinBoard(board){
    if(!XWinBoard.includes(board)){
      setXWinBoard((prevBoards) => [...prevBoards,board]);
    }
  }

  function addFullBoard(board){
    if(!FullBoard.includes(board)){
      setFullBoard((prevBoards) => [...prevBoards,board]);
    }
  }

  const checkIfFinished = () => {
    let X=XWinBoard.length;
    let O=OWinBoard.length;
    let filled=FullBoard.length;

    if(X+O+filled===9){
      if(X>O){
        alert(player1Name + " won")
      }
      else if(O>X){
        alert(player2Name + " won")
      }
      else{
        alert("Gra skończona remisem!");
      }
      resetBoard();
      setGameOver(true);
    }

  }

  function checkWin(pickedCells){
    const winningCombinations = [
      // Rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // Columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // Diagonals
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    //console.log(pickedCells);

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (pickedCells.includes(a) && pickedCells.includes(b) && pickedCells.includes(c)) {
        //console.log("X win");
        return true; // Winning combination found
      }
    }
  }

  const analyzeGame = () => {
  for (let i=0;i<9;i++){
    let Xworkvector = [];
    let Oworkvector = [];
    let isFull = 0;
    for (let j=0;j<9;j++){
      let issfull=Xworkvector.length+Oworkvector.length;
      if (ultimateBoard[i][j]==="X"){
        Xworkvector.push(j);
        //console.log("number of clisk in this board "+ issfull)
          if(checkWin(Xworkvector)==true){
            addDisabledBoard(i);
            addXWinBoard(i);
            ++isFull;
          };
      }
      else if (ultimateBoard[i][j]==="O"){
        Oworkvector.push(j);
        //console.log("number of clisk in this board "+ issfull)
          if(checkWin(Oworkvector)==true){
            addDisabledBoard(i);
            addOWinBoard(i);
            ++isFull;
          };
      }
      if (issfull===8){
      addFullBoard(i);
      addDisabledBoard(i);
    }
    }

  }
  console.log("długość wekora Xwin " + XWinBoard.length);
  console.log("długość wekora Owin " + OWinBoard.length);
  //checkIfFinished();
  }

  useEffect(() => {analyzeGame();}, [ultimateBoard]);
  //useEffect(() => {checkIfFinished();}, [handleBoxClick]);

  useEffect(() => {
    if (player1Time >= gameDuration) {
      //alert("Przekroczono czas player1");
      console.log("Przekroczono czas dla gracza 1");
      assignBoardsToSecondPlayer("X");
      for (let x=0; x<9; x++){
        addDisabledBoard(x);
      }
      console.log("O WIN BOARD "+ OWinBoard);
      setGameOver(true);
    }
  
    if (player2Time >= gameDuration) {
      //alert("Przekroczono czas player2");
      console.log("Przekroczono czas dla gracza 2");
      assignBoardsToSecondPlayer("O");
      for (let x=0; x<9; x++){
        addDisabledBoard(x);
      }
      console.log("X WIN BOARD "+ XWinBoard);
       setGameOver(true);
    }
  }, [player1Time, player2Time, gameDuration]);

  useEffect(() => {
    let timer; 
    if (isGameStarted && !gameOver){
      if (gameOver === false){
        if (xPlaying){
          timer = setInterval(() => {
            setPlayer1Time((prevTime) => prevTime + 1);
          },1000);
        }
        else{
          timer = setInterval(() => {
            setPlayer2Time((prevTime) => prevTime + 1);
          },1000);
        } 
      }
    }
    return () => clearInterval(timer);
  }, [isBoardActive, xPlaying, gameOver]
);

function assignBoardsToSecondPlayer(looser) {
  for (let i = 0; i < 9; i++) {
    if (!disabledBoards.includes(i)) {
      if (looser==="X") {
        OWinBoard[i] = i; 
      } else {
        XWinBoard[i] = i; 
      }
    }
  }
}

  const handleBoxClick = (tableIdx, boxIdx) => {
    // Step 1: Update the board
    
    const updatedBoard = ultimateBoard.map((table, tIdx) => {
      if (tIdx === tableIdx) {
        return table.map((value, bIdx) => {
          if (bIdx === boxIdx) {
            return xPlaying ? "X" : "O";
          } else {
            return value;
          }
        });
      } else {
        return table;
      }
    });
  
    setUltimateBoard(updatedBoard);
    setXPlaying(!xPlaying);
    setOXnumberOfClick(OXnumberOfClick+1);
    //console.log(OXnumberOfClick);
    //console.log("disable boards "+ disabledBoards);
    console.log("is X playing "+xPlaying);
  };

  useEffect(() => {checkIfFinished();}, [handleBoxClick]);

//Reset Board Function
  const resetBoard = () => {
    //setGameOver(false);
    setUltimateBoard(Array(9).fill(Array(9).fill(null)));
    resetData();
  }

  return (
    <div className="App">
      <div className="controlPanel">
      <Header/>
      <Menu 
      isMenuActive={isMenuActive}
      isGameStarted={isGameStarted}
      isGameFinished={isGameFinished}
      player1Name={player1Name}
      player2Name={player2Name}
      toggleGameButton={toggleGameButton}
      onPlayer1NameChange={handlePlayer1NameChange}
      onPlayer2NameChange={handlePlayer2NameChange}
      xPlaying={xPlaying}
      player1Time={player1Time}
      player2Time={player2Time}
      gameDuration={gameDuration}
      SetGameDuration={SetGameDuration}
      buttonLabel={buttonLabel}
      />
      </div>
      <div className="boardContainer">{
        ultimateBoard.map((uboard, idx) => (
          <Board
            key={idx}
            tableIdx={idx}
            board={ultimateBoard[idx]}
            onClick={gameOver ? resetBoard : handleBoxClick}
            numberOfClick={OXnumberOfClick}
            disabledBoards={disabledBoards}
            OWinBoard={OWinBoard}
            XWinBoard={XWinBoard}
            isGameStarted={isGameStarted}
            isGameFinished={isGameFinished}
            isBoardActive={isBoardActive}
          />
        ))
      }



      </div>
      
    </div>
  );
}

export default App;