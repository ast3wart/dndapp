import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.js";
import LandingPage from "./pages/LandingPage.js";
import Signup from "./pages/Signup.js";
import "./styles/App.css";

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
          {/* Placeholder About Page */}
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
