import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navbar.css"
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function Navbar({loading, search, error}){
    // const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    const { isLoggedIn, logout} = useAuth();


    return (
        <nav>
            {isLoggedIn ? (
                <>
                    {/* <Link to="/">Home</Link> */}
                    <Link to="resources">Home</Link>
                    {/* //<Link to="/login">Login</Link> */}
                    <Link to="/upload">Posting</Link>
                    
                    <button onClick={logout}>Logout</button>
                </>
                ):(
                    <>
                    {/* <Link to="/">Home</Link> */}
                    <Link to="resources">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    </>
                )}
            
        </nav>
    );
}

export default Navbar;