import React from "react";
import { CORRECT, ALMOST, INCORRECT } from "../utils/constants";

const Line = ({ guess, isFinal, checkScore, checkValidWord }) => {
  // Mapping each letter of the guess to a tile
  const tiles = Array.from({ length: 5 }).map((_elements, i) => {
    const char = guess && guess[i];
    let className = "";
    // Styling tiles based on correctness
    if (isFinal && checkScore && checkValidWord) {
      if (char !== undefined) {
        if (checkScore[i] === 2) {
          className = CORRECT;
        } else if (checkScore[i] === 1) {
          className = ALMOST;
        } else {
          className = INCORRECT;
        }
      }
    }

    // Rendering each tile
    return (
      <div key={i} className={`tile ${className}`}>
        {char !== undefined ? char : ""}
      </div>
    );
  });

  // Rendering the line of tiles
  return <div className="line">{tiles}</div>;
};

export default Line;
