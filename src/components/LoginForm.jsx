import { useState } from "react";

function LoginForm(){
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        console.log(email, username, password);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email" />

            <input type="username" value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username" />

            <input type="password" value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password" />

            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;