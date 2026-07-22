import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <nav className="navbar">
      {/* Left Side - Logo and Title */}
      <div className="navbar-left">
        <div className="logo">📦</div>

        <div className="brand-info">
          <h2>Inventory Management System</h2>
          <p>Manage Products Efficiently</p>
        </div>
      </div>

      {/* Right Side - Date and Admin Profile */}
      <div className="navbar-right">
        {/* Current Date */}
        <span className="date">📅 {today}</span>

        {/* Admin Profile */}
        <div
          className="admin-profile"
          onClick={() => navigate("/admin-profile")}
        >
          <div className="admin-avatar">👤</div>

          <div className="admin-details">
            <h4>Admin</h4>
            <span>Inventory Manager</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
