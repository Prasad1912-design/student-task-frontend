import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./css/Login.css";
import { useNavigate } from "react-router-dom";
import { encryptFrontend, decryptFrontend } from "../utils/crypto";

export default function Login({ logSuccess }) {
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // 👇 NEW STATES
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {

  e.preventDefault();

  const email = emailRef.current?.value;
  const password = passwordRef.current?.value;

  if (!email || !password) {
    setError("Both fields are mandatory");
    return;
  }

  try {

    setLoading(true);
    setError("");

    const response = await axios.post(
      "http://localhost:5000/login",
      {
        email: encryptFrontend(email),
        password: encryptFrontend(password)
      }
    );

    if (response.data.success) {

       logSuccess(response.data.userEmail, response.data.user);

      navigate("/dashboard");

    } else {

      setError(
        response.data.message ||
        "Invalid Email or Password"
      );

    }

  }
  catch (err) {

    const data = err.response?.data;

    setError(
      data?.message ||
      "Invalid credentials"
    );

  }
  finally {

    setLoading(false);

  }

};

  return (
    <div className="login-container">
      <div className="login-card">

        {/* LEFT SIDE */}
        <div className="login-left">
          <div>
            <p className="portal-text">STUDENT PORTAL</p>

            <h1>Student Management System</h1>

            <p className="description">
              Access the student management portal
              to securely login and manage student
              information efficiently.
            </p>
          </div>

          <div className="security-box">
            <p>Student Assignment Project</p>
            <h3>Student Management Portal</h3>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="login-right">
          <div className="form-container">

            <h2>Welcome Back</h2>

            <p className="sub-text">Please login to continue</p>

            {/* 🔴 ERROR MESSAGE */}
            {error && (
              <div style={{
                background: "#fee2e2",
                color: "#b91c1c",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "10px"
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              {/* EMAIL */}
              <div className="input-group">
                <label>Email Address</label>
                <input
                  ref={emailRef}
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              {/* PASSWORD */}
              <div className="input-group">
                <label>Password</label>
                <input
                  ref={passwordRef}
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              {/* LOGIN BUTTON */}
              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              {/* REGISTER */}
              <div className="register-section">
                <p>Don't have a registered account?</p>

                <div>
                  <Link to="/newRegistration" className="register-btn">
                    Register Student
                  </Link>
                </div>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}