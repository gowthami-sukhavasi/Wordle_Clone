import Keyboard from "../Keyboard";
import { render, fireEvent } from "@testing-library/react";

test("Keyboard should load on render", () => {
  const mockOnKeyClick = jest.fn();
  const { getByText } = render(
    <Keyboard onKeyClick={mockOnKeyClick} keyboardState={{}} />
  );

  const keyA = getByText("a");
  fireEvent.click(keyA);
  expect(mockOnKeyClick).toHaveBeenCalledWith("a");
});
