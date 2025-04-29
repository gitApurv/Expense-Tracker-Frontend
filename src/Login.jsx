import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import "./Login.css";

export default function Login({ setIsLoggedIn, setUsername }) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Import useNavigate from react-router-dom

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }
    if (user.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    setError(""); // Clear previous error

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data); // Debugging line
      if (data.success) {
        setIsLoggedIn(true);
        setUsername(user.username);
        localStorage.setItem("isLoggedIn", true); // Store login state in local storage
        localStorage.setItem("username", user.username); // Store username in local storage
        navigate("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(err); // Debugging line
      setError("An error occurred. Please try again.");
    }
  };

  const handleSignUp = () => {
    window.location.href = "/signup";
  };

  return (
    <div className="login-container">
      <h1 className="login-header">Login</h1>

      {error && (
        <Alert
          className="error-alert"
          variant="outlined"
          severity="error"
          icon={false}
        >
          {error}
        </Alert>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <TextField
          className="login-input"
          label="Username"
          variant="outlined"
          name="username"
          value={user.username}
          onChange={handleChange}
        />
        <TextField
          className="login-input"
          label="Password"
          type="password"
          variant="outlined"
          name="password"
          value={user.password}
          onChange={handleChange}
        />
        <Button className="login-button" variant="contained" type="submit">
          Login
        </Button>
      </form>

      <div className="signup-container">
        <Button
          className="signup-button"
          variant="outlined"
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
