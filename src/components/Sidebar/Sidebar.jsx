// import { NavLink } from "react-router-dom";
// import "./Sidebar.css";


// function Sidebar() {

//   return (

//     <div className="sidebar">

//       <h2>📦 IMS MENU</h2>


//       <ul>

//         <li>
//           <NavLink to="/dashboard">
//             🏠 Dashboard
//           </NavLink>
//         </li>


//         <li>
//           <NavLink to="/products">
//             📦 Products
//           </NavLink>
//         </li>


//         <li>
//           <NavLink to="/categories">
//             🗂️ Categories
//           </NavLink>
//         </li>


//         <li>
//           <NavLink to="/stockin">
//             📥 Stock In
//           </NavLink>
//         </li>


//         <li>
//           <NavLink to="/stockout">
//             📤 Stock Out
//           </NavLink>
//         </li>


//         <li>
//           <NavLink to="/suppliers">
//             🚚 Suppliers
//           </NavLink>
//         </li>


//         <li>
//           <NavLink to="/orders">
//             🛒 Orders
//           </NavLink>
//         </li>


//         <li>
//           <NavLink to="/reports">
//             📊 Reports
//           </NavLink>
//         </li>


//       </ul>


//     </div>

//   );

// }


// export default Sidebar;    
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";


function Sidebar({ setIsLoggedIn }) {


  const navigate = useNavigate();



  const handleLogout = () => {


    localStorage.removeItem("login");


    setIsLoggedIn(false);


    alert("✅ Logout Successfully");


    navigate("/login", { replace: true });


  };




  return (


    <div className="sidebar">


      <h2>
        📦 IMS MENU
      </h2>



      <ul>


        <li>
          <NavLink 
            to="/dashboard"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            🏠 Dashboard
          </NavLink>
        </li>



        <li>
          <NavLink 
            to="/products"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            📦 Products
          </NavLink>
        </li>



        <li>
          <NavLink 
            to="/categories"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            🗂️ Categories
          </NavLink>
        </li>



        <li>
          <NavLink 
            to="/stockin"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            📥 Stock In
          </NavLink>
        </li>



        <li>
          <NavLink 
            to="/stockout"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            📤 Stock Out
          </NavLink>
        </li>



        <li>
          <NavLink 
            to="/suppliers"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            🚚 Suppliers
          </NavLink>
        </li>



        <li>
          <NavLink 
            to="/orders"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            🛒 Orders
          </NavLink>
        </li>



        <li>
          <NavLink 
            to="/reports"
            className={({isActive}) =>
              isActive ? "active" : ""
            }
          >
            📊 Reports
          </NavLink>
        </li>





        <li>

          <button

            className="logout-btn"

            onClick={handleLogout}

          >

            🚪 Logout

          </button>


        </li>



      </ul>


    </div>


  );

}


export default Sidebar;