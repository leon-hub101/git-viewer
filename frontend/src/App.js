import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserDetails from "./pages/UserDetails";

function App() {
  // Define the routing structure of the application
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/:username/repos" element={<UserDetails />} />
    </Routes>
  );
}

export default App;
