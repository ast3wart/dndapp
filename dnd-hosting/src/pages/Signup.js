import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, login, getLoggedInUser } from "../utils/auths.js";
import "../styles/Signup.css";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSwitchMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      // Log in user
      const success = login(formData.username, formData.password);
      if (success) {
        const user = getLoggedInUser();
        console.log("Logged in as:", user);
        navigate("/characters");
      } else {
        setError("Invalid username or password.");
      }
    } else {
      const success = signup(formData.username, formData.password);
      if (success) {
        setIsLogin(true);
        setError("");
      } else {
        setError("Username already exists.");
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="form-container">
        <h1>{isLogin ? "Login" : "Create an Account"}</h1>
        <p>
          {isLogin
            ? "Welcome back! Log in to access your account."
            : "Welcome to Adam's DnD Hosting! Fill out the information below to create your free account."}
        </p>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">
            {isLogin ? "Log In" : "Create an Account"}
          </button>
          {error && <p className="error">{error}</p>}
        </form>
        <p className="switch-mode">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={handleSwitchMode}>
            {isLogin ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
