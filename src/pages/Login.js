import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });
      // Store the token (for example, in localStorage or cookies)
      localStorage.setItem("token", response.data.token);
      alert("Login Successful!");
      navigate("/products"); // Redirect to the home page after successful login
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      {/* Link to Register page */}
      <div className="mt-3">
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="btn btn-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;



