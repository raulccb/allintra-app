import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/css/Header.css";

interface HeaderProps {
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isAdmin, setIsAdmin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const toggleAdmin = () => {
    setIsLoading(true);
    // Simulate async operation (like authentication in a real app)
    setTimeout(() => {
      setIsAdmin(!isAdmin);
      setIsLoading(false);
    }, 500);
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <span className="logo-icon">📝</span>
          <span>Markdown Viewer</span>
        </Link>

        <nav className="nav-links">
          <button
            className={`admin-toggle ${isAdmin ? "active" : ""}`}
            onClick={toggleAdmin}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner"></span>
            ) : isAdmin ? (
              "Exit Admin"
            ) : (
              "Admin Mode"
            )}
          </button>

          {isAdmin && location.pathname !== "/admin" && (
            <Link to="/admin" className="nav-link">
              Admin Panel
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
