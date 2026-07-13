// import {useState} from "react";
// function Login(){
//   const [email,setEmail] = useState("")
//   const [Password, setPassword] = useState("")
//   const [showpassword, setShowpassword] = useState(false)
//   // const [login, setLogin] = useState("")
//   const handleemail = (event) => {
//     setEmail(event.target.value)
//   }
//   const handlepassword = (event) => {
//     setPassword(event.target.value)
//   }
//   const handlehowpassword = (event) => {
//     setShowpassword(event.target.value)
//   }
//     if(email === "basheerun@gmail.com"&& Password==="Basheerun@123")
//       alert("Login sucsessfully")
//     else{
//       alert("Email and Password Incorrect")
//     }
//   return (
//     <form>
//       <h1>IMS Login Page</h1>
//       <div>
//       <input type="email"
//       placeholder="Enter your email"
//       value={email}
//       />
      
//       <input type="Password"
//       placeholder="Enter your Password"
//       value={Password}
//       />
//       <button type="button"onClick={() =>setShowpassword(!Showpassword)}>
//         {Showpassword ? "Hiden Password" : "Show Password"}</button>
//         <br/>
//         <button type = "button">Login</button>
//       </div>


//     </form>
    
  import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login({ setIsLoggedIn }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = (event) => {

    event.preventDefault();


    if (
      email === "basheerun@gmail.com" &&
      password === "Basheerun@123"
    ) {

      alert("✅ Login Successfully");


      // Save login status
      localStorage.setItem("login", "true");


      // Update login state
      setIsLoggedIn(true);


      // Open Dashboard after login
      navigate("/dashboard");


    } else {

      alert("❌ Email or Password is Incorrect");

    }

  };


  return (

    <form 
      onSubmit={handleLogin} 
      className="login-form"
    >

      <h1>🔐 IMS Login Page</h1>


      <input
        type="email"
        placeholder="Enter your Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
      />


      <br />
      <br />


      <input
        type={showPassword ? "text" : "password"}
        placeholder="Enter your Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />


      <br />
      <br />


      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
      >

        {showPassword 
          ? "🙈 Hide Password" 
          : "👁️ Show Password"}

      </button>


      <br />
      <br />


      <button type="submit">
        🔑 Login
      </button>


      <p>
        Don't have an account?{" "}
        <Link to="/register">
          Register
        </Link>
      </p>


    </form>

  );

}

export default Login;