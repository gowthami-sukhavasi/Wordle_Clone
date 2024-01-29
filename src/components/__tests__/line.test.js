import React from "react";
import { render } from "@testing-library/react";
import Line from "../Line";
import { CORRECT, ALMOST, INCORRECT } from "../../utils/constants";
import "@testing-library/jest-dom";

describe("Line component", () => {
  it("renders correctly with correct styling based on score", () => {
    const guess = "hello";
    const checkScore = [2, 1, 0, 2, 0];
    const { container } = render(
      <Line
        guess={guess}
        isFinal={true}
        checkScore={checkScore}
        checkValidWord={true}
      />
    );

    // Check if the correct tiles are rendered with correct classes
    const tiles = container.querySelectorAll(".tile");
    expect(tiles).toHaveLength(5);
    expect(tiles[0]).toHaveTextContent("h");
    expect(tiles[0]).toHaveClass(CORRECT);
    expect(tiles[1]).toHaveTextContent("e");
    expect(tiles[1]).toHaveClass(ALMOST);
    expect(tiles[2]).toHaveTextContent("l");
    expect(tiles[2]).toHaveClass(INCORRECT);
    expect(tiles[3]).toHaveTextContent("l");
    expect(tiles[3]).toHaveClass(CORRECT);
    expect(tiles[4]).toHaveTextContent("o");
    expect(tiles[4]).toHaveClass(INCORRECT);
  });
});
