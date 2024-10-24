import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import CommitList from "./CommitList";

function HomePage() {
  // State to hold the GitHub username input from the user
  const [username, setUsername] = useState("");
  // State to hold the fetched user data from the GitHub API
  const [userData, setUserData] = useState(null);
  // State to manage the loading state during data fetching
  const [loading, setLoading] = useState(false);

  // Function to search for a GitHub user by username
  const searchUser = async () => {
    if (!username) return; // Prevent search if the input is empty
    setLoading(true); // Set loading state to true while fetching data
    try {
      // Send a GET request to the backend to search for the GitHub user
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/repos`,
        {
          params: { username }, // Pass the username as a query parameter
        }
      );
      setUserData(response.data); // Store the response data in userData state
    } catch (error) {
      // Handle errors during the API request
      console.error("Error fetching user data:", error);
      setUserData({ error: "Error fetching user data" }); // Set an error message in userData state
    } finally {
      setLoading(false); // Set loading state to false after the request completes
    }
  };

  // Function to handle key press events on the input field
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchUser();
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">GitHub User Search</h1>
          {/* Input field for entering GitHub username */}
          <input
            type="text"
            className="form-control mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state with user input
            onKeyPress={handleKeyPress} // Handle key press event
            placeholder="Enter GitHub username"
          />
          {/* Button to trigger the searchUser function */}
          <button className="btn btn-primary w-100" onClick={searchUser}>
            Search
          </button>
        </div>
      </div>

      {/* Show loading spinner while fetching data */}
      {loading ? (
        <div className="text-center mt-4">
          <ClipLoader size={50} />
        </div>
      ) : userData?.error ? (
        // If there's an error, display the error message
        <div className="text-center mt-4">
          <p className="text-center text-danger">{userData.error}</p>
        </div>
      ) : (
        // If userData is available and no error, display the user card
        userData && (
          <>
            <div className="card mt-4">
              {/* Display user's avatar image */}
              <img
                src={userData[0]?.owner?.avatar_url}
                className="card-img-top"
                alt={`${username}'s avatar`}
              />
              <div className="card-body">
                <h5 className="card-title">{username}</h5>
                {/* Link to the UserDetails page for the user's repositories */}
                <Link
                  to={`/user/${username}/repos`}
                  className="btn btn-secondary"
                >
                  View Repositories
                </Link>
              </div>
            </div>
            {/* CommitList component to display the commits */}
            <div className="mt-5">
              <CommitList commits={userData[0]?.commits} />
            </div>
          </>
        )
      )}
    </div>
  );
}

export default HomePage;
