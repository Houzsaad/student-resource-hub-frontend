import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import "./Navbar.css"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
function Navbar({loading, search, error}){
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));

    // if (loading) return <p className="status">Loading...</p>;
    // if (error) return <p className="error">Error: {error}</p>

    return (
        <nav>
            {isLoggedIn ? (
                <>
                    <Link to="/">Home</Link>
                    <Link to="resources">Browse</Link>
                    {/* //<Link to="/login">Login</Link> */}
                    <Link to="/upload">Posting</Link>
                    
                    <button onClick={() => {
                        localStorage.removeItem("access_token");
                        navigate("/resources");
                    }}>Logout</button>
                </>
                ):(
                    <>
                    <Link to="/">Home</Link>
                    <Link to="resources">Browse</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    </>
                )}
            
        </nav>
    );
}

export default Navbar;