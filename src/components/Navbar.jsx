import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import { canApproveResources } from "../api";
import { Home, Search, Upload, User, LogOut } from "lucide-react";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [canApprove, setCanApprove] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function checkPermission() {
      if (!isLoggedIn) {
        setCanApprove(false);
        return;
      }

      try {
        const allowed = await canApproveResources();
        setCanApprove(allowed);
      } catch (error) {
        console.error("Permission check failed:", error);
        setCanApprove(false);
      }
    }

    checkPermission();
  }, [isLoggedIn]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="navbar-top">
        <Link to="/resources" className="navbar-logo">
          Student Resource Hub
        </Link>

        <div className="navbar-top-links">
          {isLoggedIn ? (
            <>
              {canApprove && (
                <Link to="/submissions/pending" className="navbar-pending-link">
                  Pending Submissions
                </Link>
              )}
              <button className="navbar-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>

      <nav className="navbar-bottom">
        <Link to="/resources" className={`bottom-nav-item ${isActive("/resources") ? "active" : ""}`}>
          <Home size={22} />
          <span>Home</span>
        </Link>

        <Link to="/resources?focus=search" className="bottom-nav-item">
          <Search size={22} />
          <span>Search</span>
        </Link>

        {isLoggedIn && (
          <Link to="/upload" className={`bottom-nav-item ${isActive("/upload") ? "active" : ""}`}>
            <Upload size={22} />
            <span>Upload</span>
          </Link>
        )}

        {isLoggedIn ? (
          <Link to="/profile" className={`bottom-nav-item ${isActive("/profile") ? "active" : ""}`}>
            <User size={22} />
            <span>Profile</span>
          </Link>
        ) : (
          <Link to="/login" className="bottom-nav-item">
            <User size={22} />
            <span>Login</span>
          </Link>
        )}
      </nav>
    </>
  );
}

export default Navbar;