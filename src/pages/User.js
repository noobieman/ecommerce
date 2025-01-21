import React from "react";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const navigate = useNavigate();

  // Check if the user is logged in by checking for the token
  const isLoggedIn = !!localStorage.getItem("token");

  // Function to handle login
  const handleLogin = () => {
    navigate("/login"); // Redirect to the login page
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    alert("You have been logged out.");
    navigate("/"); // Redirect to the home page
  };

  return (
    <div className="container mt-5">
      <h1>User Page</h1>
      <p>
        {isLoggedIn
          ? "You are currently logged in. You can log out if you wish."
          : "You are not logged in. Please log in to access more features."}
      </p>
      <button
        className={`btn ${isLoggedIn ? "btn-danger" : "btn-primary"}`}
        onClick={isLoggedIn ? handleLogout : handleLogin}
      >
        {isLoggedIn ? "Log Out" : "Log In"}
      </button>
    </div>
  );
}

export default UserPage;
