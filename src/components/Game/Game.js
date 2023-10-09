import React, { useState } from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import GameBanner from "../GameBanner/GameBanner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [gameStatus, setGameStatus] = useState("running");
  const [guess, setGuess] = useState([]);

  const handleSubmitGuess = (tentativeGuess) => {
    const nextGuesses = [...guess, tentativeGuess];
    setGuess(nextGuesses);

    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus("won");
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  };

  return (
    <>
      <GuessResults guess={guess} answer={answer} />
      <GuessInput
        guess={guess}
        handleSubmitGuess={handleSubmitGuess}
        gameStatus={gameStatus}
      />
      <GameBanner
        numOfGuesses={guess.length}
        gameStatus={gameStatus}
        answer={answer}
      />
    </>
  );
}

export default Game;
