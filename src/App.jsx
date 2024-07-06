// CSS Import
import "./App.css";

// React Imports
import { useCallback, useState, useEffect } from "react";

// Data Import
import { wordsList } from "./data/Words";

// Componnets Imports
import StartScreen from "./components/startScreen/StartScreen";
import Game from "./components/game/Game";
import GameOver from "./components/gameOver/GameOver";

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessedQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessedQty);
  const [score, setScore] = useState(0);

  const [words] = useState(wordsList);

  const pickWordAndCategory = useCallback(() => {
    // Pik a random category
    const categories = Object.keys(words);
    const category =
      categories[Math.floor(Math.random() * Object.keys(categories).length)];

    // Pick a random word
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];

    return { category, word };
  }, [words]);

  // Starts the secret word game
  const startGame = useCallback(() => {
    // Clear all letters
    clearLetterStates();

    // Pick word and pick category
    const { category, word } = pickWordAndCategory();

    // Create an array of letters
    let wordLetters = word.split("");

    wordLetters = wordLetters.map((i) => i.toLowerCase());

    // Fill states
    setPickedCategory(category);
    setPickedWord(word);
    setLetters(wordLetters);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Process the letter input
  const verifyLetter = (letter) => {
    const normalizedLetter = letter.toLowerCase();

    // Check if letter has already been utilized
    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);

      setGuesses((actualGuessedLetters) => actualGuessedLetters - 1);
    }
  };

  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  // Check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      // Reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // Check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    // Win condition
    if (guessedLetters.length === uniqueLetters.length) {
      // Add score
      setScore((actualScore) => (actualScore += 100));

      // Restart game with new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);

  // Restarts the game
  const retry = () => {
    setScore(0);
    setGuesses(guessedQty);

    setGameStage(stages[0].name);
  };

  return (
    <>
      <div className="App">
        {gameStage === "start" && <StartScreen startGame={startGame} />}
        {gameStage === "game" && (
          <Game
            verifyLetter={verifyLetter}
            pickedWord={pickedWord}
            pickedCategory={pickedCategory}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
          />
        )}
        {gameStage === "end" && (
          <GameOver retry={retry} score={score} pickedWord={pickedWord} />
        )}
      </div>
    </>
  );
}

export default App;
