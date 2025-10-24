import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../constant/UserContext";
import "./Login.css";

const Login = () => {
  const { loginUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:7001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        loginUser(username);
        navigate("/home");
      } else {
        const err = await res.json();
        setError(err.message || "Login failed");
      }
    } catch (err) {
      setError("Server error — check if backend is running");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-card">
        <h2>Welcome Back 👋</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="msg error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
