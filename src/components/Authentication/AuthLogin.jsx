import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AuthLogin.css";

function AuthLogin({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        formData
      );

      console.log("Login Response:", response.data);

      if (response.data.success) {
        // Save login status
        localStorage.setItem("login", "true");

        // Save user details
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

        // Update login state
        setIsLoggedIn(true);

        setMessage("Login successful!");

        // Navigate to Dashboard
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(
        "Login Error:",
        error.response?.data || error.message
      );

      setMessage(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div className="auth-login-container">

      <div className="auth-login-card">

        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="login-form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="login-form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-button"
          >
            Login
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="login-message">
            {message}
          </p>
        )}

        {/* Register */}
        <div className="login-footer">
          Don't have an account?{" "}

          <button
            type="button"
            className="login-link-button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </div>

      </div>

    </div>
  );
}

export default AuthLogin;
