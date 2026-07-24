import { useAuth } from "../context/AuthContext";

import { loginUser } from "../api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./LoginForm.css";

function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); 

    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const data = await loginUser(email, password);

        if (data.access) {
            login(data.access, data.refresh);
            navigate("/resources")
        } else {
            setError("Invalid email or password");
            setLoading(false);
        }
    }

    return(
        <div className="login-page">
            <div className="login-card">
                <h2>Welcome Back!</h2>
                <p className="login-subtitle">Login to access your resources</p>

                {error && <p className="form-error">{error}</p>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email</label>
                    <input 
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                    />
                </div>

            <div className="form-group">
            <label>Password</label>
            <input 
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
            </div>

            <button 
                type="submit" 
                className="login-btn"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>

        <div className="login-footer">
            Don't have an account? <Link to="/register">Register</Link>
        </div>
    </div>
    </div>
    );
}
export default LoginForm;