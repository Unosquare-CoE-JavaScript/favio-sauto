import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

test("button has correct initial color", () => {
  render(<App />);

  // find an element with a role of button and text of 'Change to midnightblue'
  const colorButton = screen.getByRole("button", {
    name: "Change to midnightblue",
  });

  // expect the background color to be mediumvioletred
  expect(colorButton).toHaveStyle({ backgroundColor: "mediumvioletred" });

  // click button
  fireEvent.click(colorButton);

  // expect the background color to be midnightblue
  expect(colorButton).toHaveStyle({ backgroundColor: "midnightblue" });

  // expect the button text to be 'Change to mediumvioletred'
  expect(colorButton).toHaveTextContent("Change to mediumvioletred");
});

test("Initial Conditions", () => {
  render(<App />);

  // check that the button starts out enabled
  const colorButton = screen.getByRole("button", {
    name: "Change to midnightblue",
  });
  expect(colorButton).toBeEnabled();

  // check that the checkbox starts out unchecked
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});

test("Checkbox Functionality v1", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to midnightblue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // click checkbox
  fireEvent.click(checkbox);

  // expect the checkbox to be checked
  expect(checkbox).toBeChecked();
  expect(colorButton).toBeDisabled();
});

test("Checkbox Functionality v2", () => {
  render(<App />);

  const colorButton = screen.getByRole("button", {
    name: "Change to midnightblue",
  });
  const checkbox = screen.getByRole("checkbox", { name: "Disable button" });

  // Disable button -> Button is gray
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // enable button -> button is mediumvioletred
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "mediumvioletred" });

  // click button to change color
  fireEvent.click(colorButton);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "midnightblue" });

  // disable button -> button is gray
  fireEvent.click(checkbox);
  expect(colorButton).toBeDisabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });

  // enable button
  fireEvent.click(checkbox);
  expect(colorButton).toBeEnabled();
  expect(colorButton).toHaveStyle({ backgroundColor: "midnightblue" });
});

describe("Spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });

  test("Works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });

  test("Works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});
