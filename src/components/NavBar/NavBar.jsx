// import { Link } from "react-router-dom"; 
// import "./NavBar.css";

// function NavBar() {
//   return (
//     <nav className="navbar">
//       <h2>🏢Inventory Management System</h2>
      
//       <input type="text" placeholder="🔍 Search" />

//       <div className="nav-right">
//         <span>👤 Admin</span>
//         <button onClick={() => navigate("/login")}>
//   Login
// </button>
//       </div>
//     </nav>
//   );
// }

// export default NavBar;
import { useNavigate } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <h2>🏢 Inventory Management System</h2>

      <input type="text" placeholder="🔍 Search" />

      <div className="nav-right">
        <span>👤 Admin</span>

        <button onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </nav>
  );
}

export default NavBar;