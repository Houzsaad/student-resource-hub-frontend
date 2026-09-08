import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { useAuth } from "../context/AuthContext";
import { loginUser } from "../api";
import { Link, useNavigate } from "react-router-dom";

import "./LoginForm.css";

function LoginForm(){
    const [showPassword, setShowPassword] = useState(false);
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
            <div className="password-input-wrapper">
                <input 
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                <button
                    type="button"
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
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