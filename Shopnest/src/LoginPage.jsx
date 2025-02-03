import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:9090/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === "CUSTOMER") {
          navigate("/customerhome");
        } else if (data.role === "ADMIN") {
          navigate("/admindashboard");
        } else {
          navigate("/"); // Redirect to a default page if role is unknown
        }
      } else {
        const errorMessage =
          data.error || "Something went wrong. Please try again.";
        window.alert("error");
        throw new Error(errorMessage);
      }
    } catch (err) {
    window.alert(err.message || "Unexpected error occurred");
       
    }
  };

  return (
    <div className="page-layout1">
      <div className="page-container1">
        <div className="form-container1">
          <h1 className="form-title1">Login</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSignIn} className="form-content">
            <div className="form-group">
              <label htmlFor="username" className="form-label1">
                Username
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
               <div className="form-group1">
            <a href="/update">Forgot Password?</a>
            </div>
            </div>
           <button type="submit" className="form-button1" href="./CustomerHomePage.jsx" >Sign In</button>
        </form>
        <div className="form-footer">
          New User? {' '}
          <a href="/register" className="form-link"> Sign up here</a>
        </div>
        </div>
      </div>
    </div>
  );
}
