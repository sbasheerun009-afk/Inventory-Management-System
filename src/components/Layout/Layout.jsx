import NavBar from "../NavBar/NavBar";
import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import "./Layout.css";


function Layout({ setIsLoggedIn }) {

  return (
    <div className="layout">

      <NavBar />


      <div className="layout-body">

        <Sidebar 
          setIsLoggedIn={setIsLoggedIn}
        />


        <main className="main-content">

          <Outlet />

        </main>

      </div>
      


      <Footer />

    </div>
  );
}


export default Layout;