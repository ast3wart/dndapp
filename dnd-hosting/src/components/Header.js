import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../components/images/logo.png"; // Import the logo

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header>
      <div className="header-container">
        {/* Left Section with Menu and Logo */}
        <div className="header-left">
          <div className="menu-icon" onClick={toggleSidebar}>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <Link to="/" className="header-logo">
            <img src={logo} alt="Adam's DnD Hosting Logo" />
          </Link>
        </div>

        {/* Right Section with Navigation */}
        <nav>
          <Link to="/about">About</Link>
          <Link to="/signup">Login</Link>
        </nav>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Menu</h2>
          <button className="close-btn" onClick={toggleSidebar}>
            &times;
          </button>
        </div>
        <ul>
          <li>
            <a href="#">Characters</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
