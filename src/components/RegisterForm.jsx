import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";

import { useState } from "react";

import "./RegisterForm.css";

function RegisterForm(){
    const [form, setForm] = useState({ fullName: "", email: "", password: ""});
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
        

    async function handleSubmit(e){
        e.preventDefault();
        if (!form.email) return setError("Email is required");
        setLoading(true);

        const data = await registerUser({
            email: form.email,
            full_name: form.fullName,
            password: form.password
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
            setLoading(false);
        }
        
    }
            
    return (
        <div className="reg-page">
            <div className="reg-card">
            <h2>Create Account</h2>
            <p className="reg-subtitle">Join our community and start enjoying the scrolling experience!</p>
            {error && <p className="reg-error">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="reg-form">
            <p>Full Name</p>
            <input 
               name="fullName"
               value={form.fullName} 
               onChange={handleChange} 
               placeholder="Full Name" 
            />
        </div>

        <div className="reg-form">
            <p>Email</p>
               <input
                name="email" 
               value={form.email} 
               onChange={handleChange} 
               placeholder="Email"
            /> 
        </div>

        <div className="reg-form">
            <p>Password</p>
            <input 
               name="password" 
               type="password" 
               value={form.password} 
               onChange={handleChange} 
               placeholder="Password"
            />
        </div>

            <button 
                type="submit" 
                className="register-btn"
                disabled={loading}
            >
                {loading ? "Creating account..." : "Register"}
            </button>

            <div className="register-footer">
                Already have an account? <Link to="/login">Login</Link>
            </div>
        </form>   
        </div>             
    </div>

    );  
}
export default RegisterForm;