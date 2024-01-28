// api.js
import { API_URL, ERROR } from "./constants";

export const apiCheck = async (word) => {
  try {
    const data = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        guess: `${word}`,
      }),
    });

    const json = await data.json();

    return {
      isValidWord: json.is_valid_word,
      score: json.is_valid_word ? json.score : null,
    };
  } catch (error) {
    console.error(ERROR, error);
    return { isValidWord: false, score: null, error: true };
  }
};
