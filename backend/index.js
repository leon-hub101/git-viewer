const express = require("express");
const axios = require("axios");
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const GITHUB_API_BASE_URL =
  process.env.GITHUB_API_BASE_URL || "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_API_TOKEN;

// Middleware for security, CORS, and JSON parsing
app.use(helmet());
app.use(cors());
app.use(express.json());

// Function to get headers for GitHub API requests, including authentication token
const getGitHubHeaders = () => ({
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3+json",
});

// Route to search for a GitHub user by username
app.get("/api/search", async (req, res) => {
  try {
    const { username } = req.query;
    const response = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}`,
      { headers: getGitHubHeaders() }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res
      .status(error.response?.status || 500)
      .send({ error: "Unable to fetch user data" });
  }
});

// Route to get repositories of a GitHub user by username
app.get("/api/repos", async (req, res) => {
  try {
    const { username } = req.query;
    const reposResponse = await axios.get(
      `${GITHUB_API_BASE_URL}/users/${username}/repos`,
      { headers: getGitHubHeaders() }
    );
    const repos = reposResponse.data;

    // Fetch the last 5 commits for each repository
    const reposWithCommits = await Promise.all(
      repos.map(async (repo) => {
        const commitsResponse = await axios.get(
          `${GITHUB_API_BASE_URL}/repos/${username}/${repo.name}/commits?per_page=5`,
          { headers: getGitHubHeaders() }
        );
        return { ...repo, commits: commitsResponse.data };
      })
    );

    res.json(reposWithCommits);
  } catch (error) {
    console.error("Error fetching repository data:", error.message);
    res
      .status(error.response?.status || 500)
      .send({ error: "Unable to fetch repository data" });
  }
});

// Route to check GitHub API rate limit status
app.get("/api/rate_limit", async (req, res) => {
  try {
    const response = await axios.get(`${GITHUB_API_BASE_URL}/rate_limit`, {
      headers: getGitHubHeaders(),
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching rate limit data:", error.message);
    res
      .status(error.response?.status || 500)
      .send({ error: "Unable to fetch rate limit data" });
  }
});

// Export the app for testing
module.exports = app;

// Start the server only if the script is executed directly (not in tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
