import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  // Function to handle button click
  const handleShopNow = () => {
    const token = localStorage.getItem("token"); // Check if the user is logged in
    if (token) {
      navigate("/products"); // Redirect to the Products page if logged in
    } else {
      navigate("/login"); // Redirect to the Login page otherwise
    }
  };

  return (
    <div className="container mt-5">
      <h1>Welcome to the E-commerce Website</h1>
      <p>Browse our products and enjoy shopping!</p>
      <button className="btn btn-primary" onClick={handleShopNow}>
        Shop Now
      </button>
    </div>
  );
}

export default Home;

