// import { Routes, Route, Navigate } from "react-router-dom";


// import MainLayout from "./components/Layout/Layout";
// import Dashboard from "./components/Dashboard/Dashboard";
// import Products from "./components/Products/Product";
// import Categories from "./components/Pages/Categories";
// import StockIn from "./components/Pages/StockIn";
// import StockOut from "./components/Pages/StockOut";
// import Suppliers from "./components/Pages/Suppliers";
// import Orders from "./components/Pages/Orders/Orders";

// function App() {
//   return (
//     <Routes>
//       <Route element={<Layout />}>
//         <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/products" element={<Product />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/stockin" element={<StockIn />} />
//         <Route path="/stockout" element={<StockOut />} />
//         <Route path="/suppliers" element={<Suppliers />} />
//         <Route path="/orders" element={<Orders />} />
//         <li>
//   <NavLink
//     to="/dashboard"
//     className={({ isActive }) => (isActive ? "active" : "")}
//   >
//     🏠 Dashboard
//   </NavLink>
// </li>
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;

import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";

// Components
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Product";
import Categories from "./components/Pages/Categories";
import StockIn from "./components/Pages/StockIn";
import StockOut from "./components/Pages/StockOut";
import Suppliers from "./components/Pages/Suppliers";
import Orders from "./components/Pages/Orders/Orders";
import Reports from "./components/Pages/Reports";

// Initial Products
const initialProducts = [
  { id: 1, name: "Laptop", category: "Electronics", price: 50000, quantity: 20, buyQty: 0 },
  { id: 2, name: "Desktop", category: "Electronics", price: 45000, quantity: 10, buyQty: 0 },
  { id: 3, name: "Monitor", category: "Electronics", price: 12000, quantity: 15, buyQty: 0 },
  { id: 4, name: "Mouse", category: "Accessories", price: 800, quantity: 40, buyQty: 0 },
  { id: 5, name: "Keyboard", category: "Accessories", price: 1500, quantity: 35, buyQty: 0 },
  { id: 6, name: "Headphones", category: "Accessories", price: 2500, quantity: 25, buyQty: 0 },
  { id: 7, name: "USB Drive", category: "Accessories", price: 700, quantity: 60, buyQty: 0 },
  { id: 8, name: "Notebook", category: "Stationery", price: 80, quantity: 200, buyQty: 0 },
  { id: 9, name: "Pen", category: "Stationery", price: 20, quantity: 500, buyQty: 0 },
  { id: 10, name: "Pencil", category: "Stationery", price: 10, quantity: 400, buyQty: 0 },
  { id: 11, name: "School Bag", category: "Bags", price: 1200, quantity: 50, buyQty: 0 },
  { id: 12, name: "Travel Bag", category: "Bags", price: 2500, quantity: 20, buyQty: 0 },
  { id: 13, name: "Office Chair", category: "Furniture", price: 6500, quantity: 12, buyQty: 0 },
  { id: 14, name: "Study Table", category: "Furniture", price: 8000, quantity: 10, buyQty: 0 },
  { id: 15, name: "Refrigerator", category: "Appliances", price: 35000, quantity: 8, buyQty: 0 },
  { id: 16, name: "Washing Machine", category: "Appliances", price: 28000, quantity: 6, buyQty: 0 },
  { id: 17, name: "Cricket Bat", category: "Sports", price: 2000, quantity: 30, buyQty: 0 },
  { id: 18, name: "Football", category: "Sports", price: 900, quantity: 40, buyQty: 0 },
  { id: 19, name: "Python Book", category: "Books", price: 700, quantity: 30, buyQty: 0 },
  { id: 20, name: "Java Book", category: "Books", price: 650, quantity: 25, buyQty: 0 },
  { id: 21, name: "T-Shirt", category: "Clothing", price: 500, quantity: 80, buyQty: 0 },
  { id: 22, name: "Jeans", category: "Clothing", price: 1200, quantity: 45, buyQty: 0 },
  { id: 23, name: "Running Shoes", category: "Footwear", price: 2500, quantity: 20, buyQty: 0 },
  { id: 24, name: "Rice Bag", category: "Groceries", price: 1500, quantity: 50, buyQty: 0 },
  { id: 25, name: "Toy Car", category: "Toys", price: 450, quantity: 35, buyQty: 0 },
];
const initialCategories = [
  { id: 1, name: "Electronics", description: "Electronic Devices" },
  { id: 2, name: "Accessories", description: "Computer Accessories" },
  { id: 3, name: "Stationery", description: "Office & School Supplies" },
  { id: 4, name: "Bags", description: "School & Travel Bags" },
  { id: 5, name: "Furniture", description: "Office Furniture" },
  { id: 6, name: "Appliances", description: "Home Appliances" },
  { id: 7, name: "Sports", description: "Sports Equipment" },
  { id: 8, name: "Books", description: "Educational Books" },
  { id: 9, name: "Clothing", description: "Men & Women Clothing" },
  { id: 10, name: "Footwear", description: "Shoes & Sandals" },
  { id: 11, name: "Groceries", description: "Daily Essentials" },
  { id: 12, name: "Toys", description: "Kids Toys" },
];


function App() {

  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState(initialCategories);


  // Login Status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );


  return (
    <Routes>

      {/* Login Page */}
      <Route
        path="/login"
        element={
          <Login 
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      />


      {/* Protected Routes */}
      <Route
        element={
          isLoggedIn 
          ? <Layout /> 
          : <Navigate to="/login" replace />
        }
      >


        <Route
          path="/"
          element={
            <Navigate to="/dashboard" replace />
          }
        />


        <Route
          path="/dashboard"
          element={
            <Dashboard
              products={products}
              setProducts={setProducts}
              orders={orders}
              setOrders={setOrders}
            />
          }
        />


        <Route
          path="/products"
          element={
            <Products
              products={products}
              setProducts={setProducts}
            />
          }
        />


        <Route
          path="/categories"
          element={
            <Categories
              categories={categories}
              setCategories={setCategories}
            />
          }
        />


        <Route
          path="/stockin"
          element={
            <StockIn
              products={products}
              setProducts={setProducts}
            />
          }
        />


        <Route
          path="/stockout"
          element={
            <StockOut
              products={products}
              setProducts={setProducts}
            />
          }
        />


        <Route
          path="/suppliers"
          element={<Suppliers />}
        />


        <Route
          path="/orders"
          element={
            <Orders
              orders={orders}
              setOrders={setOrders}
              products={products}
              setProducts={setProducts}
            />
          }
        />


        <Route
          path="/reports"
          element={
            <Reports
              products={products}
              orders={orders}
            />
          }
        />

      </Route>


      {/* Wrong URL */}
      <Route
        path="*"
        element={
          <Navigate to="/login" replace />
        }
      />

    </Routes>
  );
}

export default App;