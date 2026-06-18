import { useNavigate } from "react-router-dom";
import { registerUser } from "../api";

import { useState } from "react";

function RegisterForm(){
    const [form, setForm] = useState({ full_name: "", email: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
        

    async function handleSubmit(e){
        e.preventDefault();
        if (!form.email) return setError("Email is required");

        const data = await redisterUser({
            email: email,
            full_name: fullName,
            password: password
        });

        // const res = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json",},
        //     body: JSON.stringify(form),
        // const data = await res.json();
        // console.log(data)

        if (data.id) {
            navigate("/login");
        } else {
            setError("Registration falied!");
        }
        
    }
            

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className="error">{error}</p>}
            <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" />
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email"/>
            <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password"/>
            <button type="submit">Register</button>
        </form>                
    );
        
}
export default RegisterForm;