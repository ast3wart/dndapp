import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout, getLoggedInUser } from "../utils/auths.js";
import "./Header.css";
import logo from "../components/images/logo.png";

const Header = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const user = getLoggedInUser();
  const dropdownRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/signup");
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          {user ? (
            <div className="account-dropdown" ref={dropdownRef}>
              <span onClick={toggleDropdown} className="account-name">
                {user.username}
              </span>
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <button
                    onClick={() => alert("Account Settings not implemented yet")}
                  >
                    Account Settings
                  </button>
                  <button onClick={handleLogout}>Log Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signup">Login</Link>
          )}
        </nav>
      </div>

      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

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
            <Link to="/characters" onClick={toggleSidebar}>
              Characters
            </Link>
          </li>
          <li>
            <Link to="/about" onClick={toggleSidebar}>
              About
            </Link>
          </li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
