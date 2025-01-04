import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header.js";
import LandingPage from "./pages/LandingPage.js";
import Signup from "./pages/Signup.js";
import Characters from "./pages/Characters.js";
import "./styles/App.css";

const isAuthenticated = () => {
  return localStorage.getItem("isLoggedIn") === "true";
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signup" />;
};

function App() {
  return (
    <Router>
      <div className="App">
        {/* Header Component */}
        <Header />
        {/* Routes */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/characters"
            element={
              <ProtectedRoute>
                <Characters />
              </ProtectedRoute>
            }
          />
          {/* Placeholder About Page */}
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
