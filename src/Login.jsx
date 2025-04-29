import { useState } from "react";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

export default function Login({ setIsLoggedIn }) {
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const jsonResponse = await response.json();
    if (jsonResponse.success) {
      setIsLoggedIn(true);
    } else {
      setError(jsonResponse.message);
    }
  }

  function handleSignUp() {
    window.location.href = "/signup";
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <form onSubmit={handleSubmit}>
          {error && (
            <Alert variant="outlined" severity="error" icon={false}>
              {error}
            </Alert>
          )}
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Button variant="contained" type="submit">
            Login
          </Button>
        </form>
      </div>
      <div>
        <Button variant="outlined" onClick={handleSignUp}>
          Sign Up
        </Button>
      </div>
    </div>
  );
}
