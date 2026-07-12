import NavBar from "../NavBar/NavBar";
import Sidebar from "../Sidebar/Sidebar";
// import Login from "../Login/Login";
import { Outlet } from "react-router-dom";
import "./Layout.css";

function Layout() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Sidebar />
        {/* <Login/> */}
        <div className="main-content">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
}

export default Layout;