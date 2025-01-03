import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../components/images/logo.png";

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
          <div
            className={`menu-icon ${isSidebarOpen ? "open" : ""}`}
            onClick={toggleSidebar}
          >
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          {!isSidebarOpen && (
            <Link to="/" className="header-logo">
              <img src={logo} alt="Adam's DnD Hosting Logo" />
            </Link>
          )}
        </div>

        {/* Right Section with Navigation */}
        <nav className="header-nav">
          <Link to="/about">About</Link>
          <Link to="/signup">Login</Link>
        </nav>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <button className="close-btn" onClick={toggleSidebar}>
            &times;
          </button>
          <img src={logo} alt="Sidebar Logo" className="sidebar-logo" />
        </div>
        <ul>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
