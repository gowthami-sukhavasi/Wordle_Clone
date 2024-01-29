import Header from "../Header";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

test("Header should load on render", () => {
  const { getByText } = render(<Header />);

  const headingElement = getByText("Wordle");
  expect(headingElement).toBeInTheDocument();
});
