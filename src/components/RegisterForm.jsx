import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api";
import { useState } from "react";

import "./RegisterForm.css";


const academicData = {
  "Faculty of Science": [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "Bio Chemistry",
  ],

  "Faculty of Computing": [
    "Computer Science",
    "Information Technology",
    "Cyber Security",
  ],

  "Faculty of Education": [
    "Education Biology",
    "Education Mathematics",
    "Education Chemistry",
    "Education Hausa",
    "Education Physics",
    "Education History",
    "Education English",
    "Education Computer",
  ],

  "Faculty of Agriculture": [
    "Animal Science",
    "Crop Science",
    "Farm Science",
  ],
};


function RegisterForm() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    faculty: "",
    department: "",
    fullName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  function handleChange(e) {

    const { name, value } = e.target;

    if (name === "faculty") {

      setForm((previousForm) => ({
        ...previousForm,
        faculty: value,
        department: "",
      }));

      setError("");

      return;
    }

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    setError("");
  }


  async function handleSubmit(e) {

    e.preventDefault();

    setError("");


    if (!form.faculty) {
      setError("Please select your faculty");
      return;
    }

    if (!form.department) {
      setError("Please select your department");
      return;
    }

    if (!form.fullName.trim()) {
      setError("Full name is required");
      return;
    }

    if (!form.email.trim()) {
      setError("Email is required");
      return;
    }

    if (!form.password) {
      setError("Password is required");
      return;
    }


    setLoading(true);


    try {

      const data = await registerUser({

        faculty: form.faculty,

        department: form.department,

        full_name: form.fullName,

        email: form.email,

        password: form.password,

      });


      if (data.id) {

        navigate("/login");

        return;
      }


      setError(
        data.email?.[0] ||
        data.password?.[0] ||
        data.full_name?.[0] ||
        data.faculty?.[0] ||
        data.department?.[0] ||
        data.detail ||
        "Registration failed!"
      );

      setLoading(false);

    } catch (error) {

      setError(
        "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  }


  const departments = form.faculty
    ? academicData[form.faculty] || []
    : [];


  return (

    <div className="reg-page">

      <div className="reg-card">

        <h2>Create Account</h2>

        <p className="reg-subtitle">
          Join our community and start enjoying the scrolling experience!
        </p>


        {error && (
          <p className="reg-error">
            {error}
          </p>
        )}


        <form onSubmit={handleSubmit}>

          {/* Faculty */}

          <div className="reg-form">

            <p>Faculty</p>

            <select
              name="faculty"
              value={form.faculty}
              onChange={handleChange}
            >

              <option value="">
                Select Faculty
              </option>

              {Object.keys(academicData).map(
                (faculty) => (
                  <option
                    key={faculty}
                    value={faculty}
                  >
                    {faculty}
                  </option>
                )
              )}

            </select>

          </div>


          {/* Department */}

          <div className="reg-form">

            <p>Department</p>

            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              disabled={!form.faculty}
            >

              <option value="">
                {form.faculty
                  ? "Select Department"
                  : "Select Faculty First"}
              </option>

              {departments.map(
                (department) => (
                  <option
                    key={department}
                    value={department}
                  >
                    {department}
                  </option>
                )
              )}

            </select>

          </div>


          {/* Full Name */}

          <div className="reg-form">

            <p>Full Name</p>

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Full Name"
            />

          </div>


          {/* Email */}

          <div className="reg-form">

            <p>Email</p>

            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
            />

          </div>


          {/* Password */}

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


          {/* Register */}

          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >

            {loading
              ? "Creating account..."
              : "Register"
            }

          </button>


          <div className="register-footer">

            Already have an account?{" "}

            <Link to="/login">
              Login
            </Link>

          </div>

        </form>

      </div>

    </div>

  );
}


export default RegisterForm;