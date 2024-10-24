import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function UserDetails() {
  // Extract username from the URL parameters
  const { username } = useParams();

  // State for storing repositories and loading status
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect to fetch repositories when the component mounts or when the username changes
  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true); // Set loading to true while data is being fetched
      try {
        // Make a GET request to fetch repositories for the provided username
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/repos`,
          {
            params: { username }, // Pass the username as a query parameter
          }
        );
        setRepos(response.data); // Update the repos state with the fetched data
      } catch (error) {
        // Log error if fetching fails
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetching is complete
      }
    };

    fetchRepos(); // Call the function to fetch repositories
  }, [username]); // Dependency array ensures this runs when the username changes

  return (
    <div className="container mt-5">
      {/* Display the username whose repositories are being fetched */}
      <h1 className="text-center mb-4">Repositories of {username}</h1>

      {/* Back Link to the HomePage */}
      <div className="mb-3">
        <Link to="/" className="btn btn-primary">
          Back to Search
        </Link>
      </div>

      {loading ? (
        // Display loading spinner while the repositories are being fetched
        <div className="text-center">
          <ClipLoader size={50} />
        </div>
      ) : repos.length > 0 ? (
        // Display the list of repositories if data is fetched successfully
        <div className="list-group">
          {repos.map((repo) => (
            <div key={repo.id} className="list-group-item">
              <h5>{repo.name}</h5>
              <p>{repo.description}</p>
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-link"
              >
                View Repository
              </a>
            </div>
          ))}
        </div>
      ) : (
        // If no repositories are found, display a message
        <p className="text-center">No repositories found for this user.</p>
      )}
    </div>
  );
}

export default UserDetails;
