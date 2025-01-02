import React, { useState } from "react";
import "../styles/Signup.css";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(false); // Toggle between Sign Up and Login

  const handleSwitchMode = () => {
    setIsLogin(!isLogin); // Toggle the mode
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
        <form>
          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Your Name" required />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              required
            />
          </div>
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                required
              />
            </div>
          )}
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </div>
          <button type="submit">
            {isLogin ? "Log In" : "Create an Account"}
          </button>
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
