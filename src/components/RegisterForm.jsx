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
    "Bio Chemist"
  ],

  "Faculty of Computing": [
    "Computer Science",
    "Information Technology",
    "Cyber Security"
  ],

  "Faculty of Education": [
    "Edu Biology",
    "Edu Mathmatics",
    "Edu Chemistry",
    "Edu Hausa",
    "Edu Physics",
    "Edu History",
    "Edu English",
    "Edu Computer"
  ],

  
 "Faculty Of Agriculture": [
    "Animal Science",
    "Crops Science",
    "Farm Science"
  ]
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

    setForm({
      ...form,
      [name]: value,
    });

    if (name === "faculty") {

      setForm({
        ...form,
        faculty: value,
        department: "",
      });
    }
  }


  async function handleSubmit(e) {

    e.preventDefault();

    setError("");

    if (!form.faculty) {
      return setError("Please select your faculty");
    }

    if (!form.department) {
      return setError("Please select your department");
    }

    if (!form.fullName) {
      return setError("Full name is required");
    }

    if (!form.email) {
      return setError("Email is required");
    }

    if (!form.password) {
      return setError("Password is required");
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

      } else {

        setError(
          data.email?.[0] ||
          data.password?.[0] ||
          data.detail ||
          "Registration failed!"
        );

        setLoading(false);
      }

    } catch (error) {

      setError("Something went wrong. Please try again.");

      setLoading(false);
    }
  }


  const departments =
    form.faculty
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
                Select Department
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