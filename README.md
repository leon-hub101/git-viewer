# Git Viewer

Git Viewer is a web application that allows users to search for GitHub users and display information about their profile, including their recent activity. The project is divided into a backend and frontend, with a React-based user interface for displaying user data fetched from GitHub's API.

## Features

* Search for GitHub users by username.
* Display user profile information, including avatar, username, and repositories.
* View the last 5 commits for a user's repository.
* Press "Enter" key to initiate the search.
* Bootstrap integration for styling.
* Comprehensive test coverage using Jest and React Testing Library, including snapshot tests.

## Prerequisites

* Node.js (v14 or higher)
* npm or yarn
* A GitHub Personal Access Token (for accessing GitHub API, if rate-limited)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/leon-hub101/git-viewer.git
   cd git-viewer
   ```
2. Install dependencies for both backend and frontend:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Set up environment variables:
   * Create a `.env` file in the `backend` directory and add:
     ```
     GITHUB_API_TOKEN=<YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>
     ```
   * Create a `.env` file in the `frontend` directory and add:
     ```
     REACT_APP_BACKEND_URL=http://localhost:3001
     ```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```
2. Start the frontend server:
   ```
   cd ../frontend
   npm start
   ```
3. Open your browser and navigate to `http://localhost:3000` to see the application.

## Testing

* The application includes tests for both the `App` and `HomePage` components.
* Snapshot tests are included to ensure component consistency.
* Run the tests using Jest:
  ```
  cd frontend
  npm test
  ```

## Folder Structure

* `backend/`: Contains the backend server for handling requests.
* `frontend/`: Contains the React application.
  * `src/`: Source code for the frontend.
    * `pages/HomePage.js`: Home page where user search happens.
    * `pages/CommitList.js`: Displays the last 5 commits for the user.
    * `_tests__/`: Contains Jest tests for the components, including snapshot tests.

## Technologies Used

* **React** for the frontend.
* **Node.js** and **Express** for the backend.
* **Bootstrap** for styling.
* **Jest** and **React Testing Library** for unit tests.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.
