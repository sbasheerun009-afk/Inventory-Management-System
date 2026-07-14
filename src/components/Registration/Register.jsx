import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem(
    "user",
    JSON.stringify(formData)
  );

  alert("Registration Successful!");

  navigate("/login");
};
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Inventory Management</h2>
        <h3>Create Account</h3>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="Enter Name" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="Enter Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              name="password"
              placeholder="Enter Password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              name="confirmPassword"
              placeholder="Re-enter Password" 
              value={formData.confirmPassword}
              onChange={handleChange}
              required 
            />
          </div>

          <div className="show-pass">
            <input 
              type="checkbox" 
              onChange={() => setShowPassword(!showPassword)} 
            /> 
            <label>Show Password</label>
          </div>

          <button type="submit" className="login-btn">Register</button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">LogIn</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;