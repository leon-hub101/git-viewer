import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

// Define a snapshot test for the HomePage component
test("renders HomePage correctly", () => {
  // Create a snapshot of the HomePage component wrapped in BrowserRouter to handle routing dependencies
  const tree = renderer
    .create(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    )
    .toJSON(); // Convert the rendered component tree to a JSON object

  // Check if the generated snapshot matches the saved snapshot
  expect(tree).toMatchSnapshot();
});
