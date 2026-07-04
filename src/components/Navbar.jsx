import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar">
      <span className="navbar-logo">Student Resource Hub</span>
      <div className="navbar-links">
        <Link to="/resources">Home</Link>
        {isLoggedIn ? (
          <>
            <Link to="/upload">Upload</Link>
            <Link to="/profile">Profile</Link>
            <button className="navbar-btn" onClick={logout}>Logout</button>
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