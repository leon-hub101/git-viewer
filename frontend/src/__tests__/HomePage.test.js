import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import HomePage from "../pages/HomePage";

// Mock axios to control API responses in tests
jest.mock("axios");
process.env.REACT_APP_BACKEND_URL = "http://localhost:3001"; // Set the backend URL for testing

describe("HomePage", () => {
  // Test to verify that the search function is called and results are displayed
  test("calls searchUser on button click", async () => {
    // Mock the axios GET request to return specific data when called
    axios.get.mockResolvedValue({
      data: {
        login: "octocat",
        avatar_url: "https://avatars.githubusercontent.com/u/583231?v=4",
      },
    });

    // Render the HomePage component wrapped in BrowserRouter for routing
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Get the input field by placeholder text and the search button by role
    const input = screen.getByPlaceholderText("Enter GitHub username");
    const button = screen.getByRole("button", { name: /search/i });

    // Simulate user typing "octocat" in the input field and clicking the search button
    fireEvent.change(input, { target: { value: "octocat" } });
    fireEvent.click(button);

    // Wait for user data to be displayed after API response
    expect(await screen.findByText("octocat")).toBeInTheDocument();
  });

  // Test to verify that an error message is shown when the search fails
  test("shows error message when search fails", async () => {
    // Mock console.error to suppress error messages in test output
    const consoleErrorMock = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Mock the axios GET request to reject with an error
    axios.get.mockRejectedValue(new Error("Error fetching user data"));

    // Render the HomePage component wrapped in BrowserRouter for routing
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    // Get the input field by placeholder text and the search button by role
    const input = screen.getByPlaceholderText("Enter GitHub username");
    const button = screen.getByRole("button", { name: /search/i });

    // Simulate user typing an invalid username in the input field and clicking the search button
    fireEvent.change(input, { target: { value: "invaliduser12345" } });
    fireEvent.click(button);

    // Wait for the error message to be displayed
    expect(
      await screen.findByText("Error fetching user data")
    ).toBeInTheDocument();

    // Restore the original console.error after the test is complete
    consoleErrorMock.mockRestore();
  });
});
