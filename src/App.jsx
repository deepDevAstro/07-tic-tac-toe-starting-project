import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { useState } from "react";
import Log from "./components/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurn) {
  let currentPlayer = "X";
  if (gameTurn.length > 0 && gameTurn[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function derivedGameBoard(gameTurn) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerData) => [...innerData])];
  for (let turn of gameTurn) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurn, setGameTurn] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurn);

  const gameBoard = derivedGameBoard(gameTurn);
  const winner = deriveWinner(gameBoard, players);

  const hasDraw = gameTurn.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurn((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updatedLog = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedLog;
    });
  }

  function handleRestart() {
    setGameTurn([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActivePlayer={activePlayer === "X"}
            initialName={PLAYERS.X}
            symbol="X"
            onChangeName={handlePlayerNameChange}
          ></Player>
          <Player
            isActivePlayer={activePlayer === "O"}
            initialName={PLAYERS.O}
            symbol="O"
            onChangeName={handlePlayerNameChange}
          ></Player>
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} restart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log logData={gameTurn} />
    </main>
  );
}

export default App;
