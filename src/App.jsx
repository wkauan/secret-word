// CSS Import
import "./App.css"

// React Imports
import { useCallback, useState, useEffect } from "react"

// Data Import
import { wordsList } from "./data/Words"

// Componnets Imports
import StartScreen from "./components/startScreen/StartScreen"
import Game from "./components/game/Game"
import GameOver from "./components/gameOver/GameOver"

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" }
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  // Starts the secret word game
  const startGame = () => {
    setGameStage(stages[1].name);
  };

  // Process the letter input
  const verifyLetter = () => {
    setGameStage(stages[2].name);
  };

  // Restarts the game
  const retry = () => {
    setGameStage(stages[0].name);
  }

  return (
    <>
      <div className="App">
        {gameStage === "start" && <StartScreen startGame={startGame} />}
        {gameStage === "game" && <Game verifyLetter={verifyLetter} />}
        {gameStage === "end" && <GameOver retry={retry} />}
      </div>
    </>
  )
}

export default App
