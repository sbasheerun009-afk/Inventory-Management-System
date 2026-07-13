 

// import "./HomePage.css";
// import { useNavigate } from "react-router-dom";
// import bgImage from "../../assets/ims.jpeg";

// function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div className="home">
//        style={{
//     backgroundImage: `url(${bgImage})`,
//   }}

//       <div className="hero">
//         <h1>📦 Inventory Management System</h1>

//         <p>
//           Manage your inventory efficiently with real-time stock tracking,
//           product management, supplier records, and sales monitoring.
//         </p>

//         <button onClick={() => navigate("/dashboard")}>
//           🚀 Go to Dashboard
//         </button>
//       </div>

//       <div className="features">

//         <div className="card">
//           <h2>📦 Products</h2>
//           <p>
//             Add, edit, delete and organize products easily.
//           </p>
//         </div>

//         <div className="card">
//           <h2>📊 Stock</h2>
//           <p>
//             Monitor stock availability and receive low stock alerts.
//           </p>
//         </div>

//         <div className="card">
//           <h2>🏢 Suppliers</h2>
//           <p>
//             Store supplier information and manage purchases.
//           </p>
//         </div>

//         <div className="card">
//           <h2>🛒 Orders</h2>
//           <p>
//             Track customer orders and purchase history.
//           </p>
//         </div>

//         <div className="card">
//           <h2>📈 Reports</h2>
//           <p>
//             Generate sales and inventory reports instantly.
//           </p>
//         </div>

//         <div className="card">
//           <h2>🔒 Secure</h2>
//           <p>
//             Safe login system with role-based access.
//           </p>
//         </div>

//       </div>

//     </div>
//   );
// }

// export default HomePage;
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/ims.jpeg";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="home"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <div className="hero">
        <h1>📦 Inventory Management System</h1>

        <p>
          Manage your inventory efficiently with real-time stock tracking,
          product management, supplier records, supplier management,
          and sales monitoring.
        </p>

        <button onClick={() => navigate("/login")}>
          🚀 login to dashboard  
        </button>
      </div>

      <div className="features">
        <div className="card">
          <h2>📦 Products</h2>
          <p>Add, edit, delete and organize products easily.</p>
        </div>

        <div className="card">
          <h2>📊 Stock</h2>
          <p>Monitor stock availability and receive low stock alerts.</p>
        </div>

        <div className="card">
          <h2>🏢 Suppliers</h2>
          <p>Store supplier information and manage purchases.</p>
        </div>

        <div className="card">
          <h2>🛒 Orders</h2>
          <p>Track customer orders and purchase history.</p>
        </div>

        <div className="card">
          <h2>📈 Reports</h2>
          <p>Generate sales and inventory reports instantly.</p>
        </div>

        <div className="card">
          <h2>🔒 Secure</h2>
          <p>Safe login system with role-based access.</p>
          <button onClick={() => navigate("/login")}>
   🔐 Login
</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;