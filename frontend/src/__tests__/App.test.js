import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

// Set the backend URL environment variable for testing
process.env.REACT_APP_BACKEND_URL = "http://localhost:3001";

// Define a test to check if the home page renders without crashing
test("renders home page without crashing", () => {
  // Render the App component wrapped with BrowserRouter to simulate routing in the application
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check that the text "GitHub User Search" is present in the document, indicating the home page rendered successfully
  expect(screen.getByText(/GitHub User Search/i)).toBeInTheDocument();
});
