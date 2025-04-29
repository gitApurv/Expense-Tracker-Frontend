import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import "./SignUp.css"; // Be sure this file exists

export default function SignUp() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (user.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();

      if (data.success) {
        alert("Sign up successful! You can now log in.");
        window.location.href = "/login";
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="auth-page-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>

        {error && (
          <Alert
            className="signup-error"
            variant="outlined"
            severity="error"
            icon={false}
          >
            {error}
          </Alert>
        )}

        <form className="signup-form" onSubmit={handleSubmit}>
          <TextField
            className="signup-input"
            label="Username"
            variant="outlined"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <TextField
            className="signup-input"
            label="Password"
            type="password"
            variant="outlined"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <TextField
            className="signup-input"
            label="Confirm Password"
            type="password"
            variant="outlined"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <Button className="signup-button" variant="contained" type="submit">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
}
