import React, { useState, useEffect } from "react";
import {
  ENTER,
  BACKSPACE,
  CONGRATS,
  INVALID,
  CORRECT,
  ALMOST,
  INCORRECT,
  ERROR,
} from "../utils/constants";
import Line from "./Line";
import Keyboard from "./Keyboard";
import { apiCheck } from "../utils/api";

const Wordle = () => {
  const [guesses, setGuesses] = useState(
    Array(6).fill({ word: "", score: [] })
  );
  const [currentGuess, setCurrentGuess] = useState("");
  const [checkValidWord, setCheckValidWord] = useState("");
  const [checkScore, setCheckScore] = useState(Array(5).fill(null));
  const [isGameOver, setIsGameOver] = useState(false);
  const [keyboardState, setKeyboardState] = useState({});
  const [congratulated, setCongratulated] = useState(false);

  useEffect(() => {
    const handleType = (event) => {
      if (isGameOver) return;

      if (event.key === ENTER) {
        if (currentGuess.length !== 5) return;
        checkWordValidity(currentGuess);
      }

      if (event.key === BACKSPACE) {
        setCurrentGuess(currentGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) return;

      setCurrentGuess((oldGuess) => oldGuess + event.key);
    };

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, isGameOver]);

  const areAllValuesEqual = (arr) => arr.every((val) => val === arr[0]);

  useEffect(() => {
    if (
      areAllValuesEqual(checkScore) &&
      checkScore[0] === 2 &&
      !congratulated
    ) {
      const timeoutId = setTimeout(() => {
        setIsGameOver(true);
        setCongratulated(true);
        displayMessage(CONGRATS);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [isGameOver, checkScore, congratulated]);

  const checkWordValidity = async (word) => {
    const { isValidWord, score, error } = await apiCheck(word);

    if (isValidWord) {
      setCheckValidWord(true);
      setCheckScore(score);

      const newGuesses = [...guesses];
      newGuesses[newGuesses.findIndex((val) => val.word === "")] = {
        word,
        score,
      };
      setGuesses(newGuesses);
      setCurrentGuess("");
      updateKeyboardState(word, score);
    } else {
      displayMessage(error ? ERROR : INVALID);
    }
  };

  const handleKeyClick = (key) => {
    if (isGameOver) return;

    if (key === ENTER) {
      if (currentGuess.length !== 5) return;
      checkWordValidity(currentGuess);
    } else if (key === BACKSPACE) {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else {
      if (currentGuess.length >= 5) return;
      setCurrentGuess((oldGuess) => oldGuess + key);
    }
  };

  const updateKeyboardState = (word, score) => {
    const newKeyboardState = { ...keyboardState };

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      newKeyboardState[char] = {
        state: score[i] === 2 ? CORRECT : score[i] === 1 ? ALMOST : INCORRECT,
      };
    }

    setKeyboardState(newKeyboardState);
  };

  const displayMessage = (message) => {
    alert(message);
  };

  return (
    <>
      <div data-testid="wordle" className="wordle">
        {guesses.map((guess, i) => (
          <Line
            key={i}
            guess={
              i === guesses.findIndex((val) => val.word === "")
                ? currentGuess
                : guess.word
            }
            isFinal={guess.word !== ""}
            checkScore={guess.score}
            checkValidWord={checkValidWord}
          />
        ))}
      </div>
      <Keyboard onKeyClick={handleKeyClick} keyboardState={keyboardState} />
    </>
  );
};

export default Wordle;
