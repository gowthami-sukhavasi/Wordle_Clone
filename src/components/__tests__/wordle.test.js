import React from "react";
import { render, waitFor } from "@testing-library/react";
import Wordle from "../Wordle";
import mockFetch from "../__mocks__/mockFetch";
import "@testing-library/jest-dom";

beforeEach(() => {
  if (!window.fetch) {
    Object.defineProperty(global, "fetch", {
      value: jest.fn(),
    });
  }

  jest.spyOn(window, "fetch").mockImplementation(mockFetch);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("Wordle should load on render", async () => {
  const { container, getByTestId } = render(<Wordle />);

  // Wait for any asynchronous tasks to complete
  await waitFor(() => {});

  expect(container.querySelector(".line")).toBeInTheDocument();
  expect(container.querySelector(".keyboardSection")).toBeInTheDocument();
});
