import React from "react";

function CommitList({ commits }) {
  // If there's no commit data, display a message
  if (!commits || commits.length === 0) {
    return <p>No recent commits available.</p>;
  }

  return (
    <div className="commit-list">
      <h3>Last 5 Commits:</h3>
      <ul>
        {commits.slice(0, 5).map((commit, index) => (
          <li key={index}>{commit.commit.message}</li> // Render commit message
        ))}
      </ul>
    </div>
  );
}

export default CommitList;
