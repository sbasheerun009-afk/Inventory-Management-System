// import './App.css'
// import NavBar from './components/NavBar/NavBar';
// import Sidebar from './components/Sidebar/Sidebar';
// import Dashboard from './components/Dashboard/Dashboard';
// import Product from './components/Products/Product';
// import Login from './components/Login/Login';
// function App() {
//   return(
//     <div>
//       <NavBar/>
//       <div className='container'> 
//         </Login>
//         <Sidebar/>
//         <Dashboard/>  
//       </div>
//     </div>
//   )
// };

// export default App;


import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";

function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        {/* <Sidebar /> */}
        <Login />
      </div>
    </div>
  );
}

export default App;