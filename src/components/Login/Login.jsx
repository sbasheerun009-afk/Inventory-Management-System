// import { useState } from "react";
// import Dashboard from "../Dashboard/Dashboard";
// import "./Login.css";
// import Sidebar from "../Sidebar/Sidebar";

// function Login() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [message, setMessage] = useState("");

//   const handleLogin = () => {
//     if (
//       email === "basheerun@gmail.com" &&
//       password === "basheerun123"
//     ) {
//       setMessage("");
//       setLoading(true);

//       setTimeout(() => {
//         setLoading(false);
//         setIsLoggedIn(true);
//       }, 2000);
//     } else {
//       setMessage("Invalid email or password");
//     }
//   };
//   if (loading) {
//     return (
//       <div className="login-container">
//         <h2>Loading...</h2>
//         <p>Please wait while we log you in.</p>
//       </div>
//     );
//   }
//   if (isLoggedIn) {
//     return (
//       <>
//         <Dashboard />
//         <Sidebar/>
//         <div style={{ textAlign: "center", marginTop: "20px" }}>
//           <button onClick={() => setIsLoggedIn(false)}>
//             Logout
//           </button>
//         </div>
//       </>
//     );
//   }
//   return (
//     <div className="login-container">
//       <h2>Inventory Management Login Page</h2>

//       <input
//         type="email"
//         placeholder="Enter Email"
//         value={email}
//         onChange={(e) => {
//           setEmail(e.target.value);
//           setMessage("");
//         }}
//       />

//       <input
//         type={showPassword ? "text" : "password"}
//         placeholder="Enter Password"
//         value={password}
//         onChange={(e) => {
//           setPassword(e.target.value);
//           setMessage("");
//         }}
//       />

//       <button
//         type="button"
//         onClick={() => setShowPassword(!showPassword)}
//       >
//         {showPassword ? "Hide Password" : "Show Password"}
//       </button>

//       {message && (
//         <p className="error-message">
//           {message}
//         </p>
//       )}

//       <button onClick={handleLogin}>
//         Login
//       </button>
//     </div>
//   );
// }

// // export default Login;
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Login.css";

// function Login() {
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = (e) => {
//     e.preventDefault();
//     // ippatiki direct ga home ki pampu
//     navigate("/home");
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <div className="logo">
//           <h1>📦 IMS</h1>
//           <p>Inventory Management System</p>
//         </div>

//         <form onSubmit={handleLogin}>
//           <div className="input-group">
//             <label>Email</label>
//             <input type="email" placeholder="admin@example.com" required />
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input 
//               type={showPassword ? "text" : "password"} 
//               placeholder="Enter Password" 
//               required 
//             />
//           </div>

//           <div className="options">
//             <label className="checkbox">
//               <input 
//                 type="checkbox" 
//                 onChange={() => setShowPassword(!showPassword)} 
//               /> 
//               Show Password
//             </label>
//             <Link to="#" className="forgot">Forgot?</Link>
//           </div>

//           <button type="submit" className="login-btn">Login</button>
//         </form>

//         <p className="register-link">
//           Don't have an account? <Link to="/register">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo">
          <h1>📦 IMS</h1>
          <p>Inventory Management System</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="admin@example.com" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter Password" 
              required 
            />
          </div>

          <div className="options">
            <label>
              <input type="checkbox" onChange={() => setShowPassword(!showPassword)} /> 
              Show Password
            </label>
          </div>

          <button type="submit" className="login-btn">Login</button>
        </form>

        <p className="register-link">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;