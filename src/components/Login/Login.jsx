import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";


function Login({ setIsLoggedIn }) {

  const navigate = useNavigate();


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);



  const handleLogin = (e) => {

    e.preventDefault();


    if(email === "admin@gmail.com" && password === "12345"){

      localStorage.setItem("login","true");

      setIsLoggedIn(true);

      alert("✅ Login Successful");

      navigate("/dashboard");

    }
    else{

      alert("❌ Invalid Email or Password");

    }

  };



  return (

    <div className="login-page">


      <div className="login-card">


        <div className="login-header">

          <div className="logo">
            📦
          </div>

          <h1>
            Inventory Management System
          </h1>

          <p>
            Login to manage your inventory
          </p>

        </div>



        <form onSubmit={handleLogin}>


          <label>
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />



          <label>
            Password
          </label>


          <div className="password-box">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />


            <span
              onClick={()=>setShowPassword(!showPassword)}
            >

              {showPassword ? "🙈" : "👁️"}

            </span>


          </div>



          <button className="login-btn">
            🔐 Login
          </button>


        </form>



        <p className="register-text">

          Don't have an account?

          <Link to="/register">
            Register Here
          </Link>

        </p>



        <div className="demo-login">

          <p>
            Demo Login
          </p>

          <span>
            Email: admin@gmail.com
          </span>

          <span>
            Password: 12345
          </span>

        </div>



      </div>


    </div>

  );

}


export default Login;