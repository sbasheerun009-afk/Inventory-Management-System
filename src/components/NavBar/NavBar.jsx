// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./NavBar.css";
// function NavBar() {
// const navigate = useNavigate();
// const [search, setSearch] = useState("");
// const handleSearch = (e) => {
//   e.preventDefault();
// const page = search.toLowerCase();
// if(page.includes("dashboard")){
//       navigate("/dashboard");
//     }
// else if(page.includes("product")){
//       navigate("/products");
//     }
// else if(page.includes("categorie")){
//       navigate("/categories");
//     }

// else if(page.includes("stock in")){
//       navigate("/stockin");
//     }

// else if(page.includes("stock out")){
//       navigate("/stockout");
//     }

// else if(page.includes("supplier")){
//       navigate("/suppliers");
//     }

// else if(page.includes("order")){
//       navigate("/orders");
//     }

// else if(page.includes("report")){
//       navigate("/reports");
//     }

// else{
//   alert("Page not found");
// }
// setSearch("");
//  };

// return (
//       <nav className="navbar">
// <h2>🏢 Inventory Management System</h2>
// <form onSubmit={handleSearch}>
//   <input
//   type="text"
//   placeholder="🔍 Search Page..." 
//   value={search}
//   onChange={(e)=>setSearch(e.target.value)}

// />
// </form>
//       <div className="nav-right">
//         <span>
//          👤 Admin
//         </span>
//       </div>
//     </nav>
//   );}
// export default NavBar;
import "./Navbar.css";

function Navbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">📦</div>

        <div>
          <h2>Inventory Management System</h2>
          <p>Manage Products Efficiently</p>
        </div>
      </div>

      <div className="navbar-right">
        <span className="date">📅 {today}</span>

        <div className="admin-profile">
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