
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import HomePage from "./components/Pages/HomePage";

import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Products from "./components/Products/Product";
import Categories from "./components/Pages/Categories";
import StockIn from "./components/Pages/StockIn";
import StockOut from "./components/Pages/StockOut";
import Suppliers from "./components/Pages/Suppliers";
import Orders from "./components/Pages/Orders/Orders";
import Reports from "./components/Pages/Reports";
import Register from "./components/Registration/Register";


const initialProducts = [
  { id: 1, name: "Laptop", category: "Electronics", price: 50000, quantity: 20, buyQty: 0 },
  { id: 2, name: "Desktop", category: "Electronics", price: 45000, quantity: 10, buyQty: 0 },
  { id: 3, name: "Monitor", category: "Electronics", price: 12000, quantity: 15, buyQty: 0 },
  { id: 4, name: "Mouse", category: "Accessories", price: 800, quantity: 40, buyQty: 0 },
  { id: 5, name: "Keyboard", category: "Accessories", price: 1500, quantity: 35, buyQty: 0 },
  { id: 6, name: "Headphones", category: "Accessories", price: 2500, quantity: 25, buyQty: 0 },
  { id: 7, name: "Notebook", category: "Stationery", price: 80, quantity: 200, buyQty: 0 },
  { id: 8, name: "Pen", category: "Stationery", price: 20, quantity: 500, buyQty: 0 },
  { id: 9, name: "Office Chair", category: "Furniture", price: 6500, quantity: 12, buyQty: 0 },
  { id: 10, name: "Study Table", category: "Furniture", price: 8000, quantity: 10, buyQty: 0 }
];


const initialCategories = [
  { id: 1, name: "Electronics", description: "Electronic Devices and Gadgets" },
  { id: 2, name: "Accessories", description: "Computer and Mobile Accessories" },
  { id: 3, name: "Stationery", description: "Office and School Supplies" },
  { id: 4, name: "Furniture", description: "Office and Home Furniture" },
  { id: 5, name: "Appliances", description: "Home Electrical Appliances" },
  { id: 6, name: "Bags", description: "School and Travel Bags" },
  { id: 7, name: "Clothing", description: "Men and Women Clothing" },
  { id: 8, name: "Footwear", description: "Shoes and Sandals" },
  { id: 9, name: "Groceries", description: "Daily Essential Items" },
  { id: 10, name: "Sports", description: "Sports Equipment" },
  { id: 11, name: "Books", description: "Educational Books" },
  { id: 12, name: "Toys", description: "Kids Toys and Games" },
  { id: 13, name: "Beauty Products", description: "Cosmetics and Personal Care" },
  { id: 14, name: "Kitchen Items", description: "Kitchen Tools and Utensils" },
  { id: 15, name: "Medical", description: "Healthcare Products" },
  { id: 16, name: "Automobile", description: "Vehicle Accessories" },
  { id: 17, name: "Mobile Phones", description: "Smartphones and Devices" },
  { id: 18, name: "Cameras", description: "Photography Equipment" },
  { id: 19, name: "Software", description: "Software Products" },
  { id: 20, name: "Hardware", description: "Computer Components" },
  { id: 21, name: "Jewellery", description: "Gold and Fashion Jewellery" },
  { id: 22, name: "Watches", description: "Smart and Regular Watches" },
  { id: 23, name: "Cleaning Products", description: "Home Cleaning Supplies" },
  { id: 24, name: "Pet Supplies", description: "Pet Food and Accessories" },
  { id: 25, name: "Others", description: "Miscellaneous Products" }
];

function App() {

  const [products, setProducts] = useState(initialProducts);

  const [categories, setCategories] = useState(initialCategories);

  const [orders, setOrders] = useState([]);


  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );
return (

  <Routes>


    {/* HOME PAGE */}

    <Route
      path="/"
      element={<HomePage />}
    />


    <Route
      path="/home"
      element={<HomePage />}
    />




    {/* LOGIN */}

    <Route
      path="/login"
      element={
        <Login
          setIsLoggedIn={setIsLoggedIn}
        />
      }
    />




    {/* REGISTER */}

    <Route
      path="/register"
      element={<Register />}
    />






    {/* PROTECTED ROUTES */}

    <Route

      element={

        isLoggedIn

        ?

        <Layout setIsLoggedIn={setIsLoggedIn} />

        :

        <Navigate to="/login" replace />

      }

    >





      {/* DASHBOARD */}

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






      {/* PRODUCTS */}

      <Route

        path="/products"

        element={

          <Products

            products={products}

            setProducts={setProducts}

            orders={orders}

            setOrders={setOrders}

          />

        }

      />







      {/* CATEGORIES */}

      <Route

        path="/categories"

        element={

          <Categories

            categories={categories}

            setCategories={setCategories}

          />

        }

      />







      {/* STOCK IN */}

      <Route

        path="/stockin"

        element={

          <StockIn

            products={products}

            setProducts={setProducts}

          />

        }

      />







      {/* STOCK OUT */}

      <Route

        path="/stockout"

        element={

          <StockOut

            products={products}

            setProducts={setProducts}

          />

        }

      />







      {/* SUPPLIERS */}

      <Route

        path="/suppliers"

        element={<Suppliers />}

      />







      {/* ORDERS */}

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







      {/* REPORTS */}

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







    {/* WRONG URL */}

    <Route

      path="*"

      element={<Navigate to="/" replace />}

    />




  </Routes>

);
}
export default App;