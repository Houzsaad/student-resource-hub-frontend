import { useState } from "react";

function LoginForm(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // function handleChange(e) {
    //     e.preventDefault();
    // }

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        console.log("response:", data);

        if (data.access) {
            localStorage.setItem("access_token", data.access);
            localStorage.setItem("refresh_token", data.refresh);
            window.location.href = "/resources";
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