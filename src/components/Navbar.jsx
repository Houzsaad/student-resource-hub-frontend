import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { canApproveResources } from "../api";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  const [canApprove, setCanApprove] = useState(false);

  useEffect(() => {
    async function checkPermission() {
      if (!isLoggedIn) {
        setCanApprove(false);
        return;
      }

      try {
        const allowed = await canApproveResources();
        console.log("allowed:", allowed)
        setCanApprove(allowed);
      } catch (error) {
        console.error("Permission check failed:", error);
        setCanApprove(false);
      }
    }

    checkPermission();
  }, [isLoggedIn]);

  return (
    <nav className="navbar">
      <Link to="/resources" className="navbar-logo">
        Student Resource Hub
      </Link>

      <div className="navbar-links">
        <Link to="/resources">Home</Link>

        {isLoggedIn ? (
          <>
            <Link to="/upload">Upload</Link>

            {canApprove && (
              <Link to="/submissions/pending">
                Pending Submissions
              </Link>
            )}

            <Link to="/profile">Profile</Link>

            <button
              className="navbar-btn"
              onClick={logout}
            >
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
  );
}

export default Navbar;