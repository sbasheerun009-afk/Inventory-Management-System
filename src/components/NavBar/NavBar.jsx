import { Link } from "react-router-dom"; 
import "./NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <h2>🏢Inventory Management System</h2>
      
      <input type="text" placeholder="🔍 Search" />

      <div className="nav-right">
        <span>👤 Admin</span>
        <Link to="/Login" className="Login-btn">LogIn</Link>
      </div>
    </nav>
  );
}

export default NavBar;