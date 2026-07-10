import { useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import "./Login.css";
import Sidebar from "../Sidebar/Sidebar";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (
      email === "basheerun@gmail.com" &&
      password === "basheerun123"
    ) {
      setMessage("");
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        setIsLoggedIn(true);
      }, 2000);
    } else {
      setMessage("Invalid email or password");
    }
  };
  if (loading) {
    return (
      <div className="login-container">
        <h2>Loading...</h2>
        <p>Please wait while we log you in.</p>
      </div>
    );
  }
  if (isLoggedIn) {
    return (
      <>
        <Dashboard />
        <Sidebar/>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="login-container">
      <h2>Inventory Management Login Page</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setMessage("");
        }}
      />

      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setMessage("");
        }}
      />

      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? "Hide Password" : "Show Password"}
      </button>

      {message && (
        <p className="error-message">
          {message}
        </p>
      )}

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;