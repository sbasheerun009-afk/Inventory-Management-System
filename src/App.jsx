// import { Routes, Route, Navigate } from "react-router-dom";
// import Layout from "./components/Layout/Layout.jsx";
// import Login from "./components/Login/Login.jsx";
// import Products from "./components/Products/Product"; 
// import Categories from "./components/Pages/Categories";
// import StockIn from "./components/Pages/StockIn";
// import StockOut from "./components/Pages/StockOut";
// import Suppliers from "./components/Pages/Suppliers";
// import Orders from "./components/Pages/Orders/Orders.jsx";
// import Reports from "./components/Pages/Reports.jsx";
// import "./App.css";

// function App() {
//   return (
//     <Routes>
//       {/* Default ga login ki vellali */}
//       <Route path="/" element={<Navigate to="/login" replace />} />
//       <Route path="/login" element={<Login />} />

//       {/* Layout lo Sidebar + NavBar + Outlet untai */}
//       <Route element={<Layout />}> 
//         <Route path="/products" element={<Products />} /> 
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/stockin" element={<StockIn />} />
//         <Route path="/stockout" element={<StockOut />} />
//         <Route path="/suppliers" element={<Suppliers />} />
//         <Route path="/orders" element={<Orders />} />
//         <Route path="/reports" element={<Reports />} />
//       </Route>

      
//       <Route path="*" element={<Navigate to="/login" replace />} />
//     </Routes>
//   );
// }

// export default App;
// import { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import MainLayout from "./components/Layout/Layout.jsx";
// import Dashboard from "./components/Dashboard/Dashboard.jsx"
// import Products from "./components/Products/Product.jsx";

// function App() {
//   // Anni products data ikkada undali
//   const [products, setProducts] = useState([
//     { id: 1, name: "Laptop", category: "Electronics", quantity: 0, price: 120000, buyQty: 0 },
//     { id: 2, name: "Mouse", category: "Electronics", quantity: 0, price: 1000, buyQty: 0 },
//     { id: 3, name: "Keyboard", category: "Electronics", quantity: 0, price: 1200, buyQty: 0 },
//     { id: 4, name: "Refrigerator", category: "Electronics", quantity: 0, price: 30000, buyQty: 0 },
//     { id: 5, name: "School Bag", category: "Bags", quantity: 0, price: 1000, buyQty: 0 },
//     { id: 6, name: "Notebook", category: "Stationery", quantity: 0, price: 50, buyQty: 0 },
//     { id: 7, name: "Pen", category: "Stationery", quantity: 0, price: 50, buyQty: 0 },
//     { id: 8, name: "USB Cable", category: "Accessories", quantity: 0, price: 200, buyQty: 0 },
//     { id: 9, name: "Water Bottle", category: "Accessories", quantity: 0, price: 150, buyQty: 0 },
//     { id: 10, name: "Monitor", category: "Electronics", quantity: 0, price: 10000, buyQty: 0 },
//   ]);

//   const [orders, setOrders] = useState([]);

//   return (
//     <Routes>
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         <Route path="/dashboard" element={<Dashboard products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />} />
//         <Route path="/products" element={<Products products={products} setProducts={setProducts} />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/Layout/Layout.jsx"; 

import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Products from "./components/Products/Product.jsx";

import Categories from "./components/Pages/Categories.jsx";
import StockIn from "./components/Pages/StockIn.jsx";
import StockOut from "./components/Pages/StockOut.jsx";
import Suppliers from "./components/Pages/Suppliers.jsx";
import Orders from "./components/Pages/Orders/Orders.jsx";

function App() {
  const [products, setProducts] = useState(initialProducts); // 1 line matrame
  const [orders, setOrders] = useState([]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route 
          path="/dashboard" 
          element={<Dashboard products={products} setProducts={setProducts} orders={orders} setOrders={setOrders} />} 
        />
        <Route 
          path="/products" 
          element={<Products products={products} setProducts={setProducts} />} 
        />

        <Route path="/categories" element={<Categories />} />
        <Route path="/stockin" element={<StockIn />} />
        <Route path="/stockout" element={<StockOut />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/orders" element={<Orders />} />
      </Route>
    </Routes>
  );
}

export default App;