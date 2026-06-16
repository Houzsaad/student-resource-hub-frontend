import { useAuth } from "../context/AuthContext";

import { loginUser } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await loginUser(email, password);

        if (data.access) {
            login(data.access, data.refresh);
            navigate("/resources")
        } else {
            setError("Invalid email or password");
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            {error && <p style={{ color: "red"}}>{error}</p>}
            <input 
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
            />

            <input 
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
            />
            <button type="submit">Login</button>
        </form>
    );
}
export default LoginForm;