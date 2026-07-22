
import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import HomePage from "./components/Pages/HomePage";
import NotFound from "./components/Pages/NotFound/NotFound";

import Login from "./components/Login/Login";
import Register from "./components/Registration/Register";

import Dashboard from "./components/Dashboard/Dashboard";

import Products from "./components/Products/Product";
import ProductDetails from "./components/Products/ProductDetails";
import EditProduct from "./components/Products/EditProduct";

import Category from "./components/Categories/Category";
import CategoryDetails from "./components/Categories/CategoryDetails";
import EditCategory from "./components/Categories/EditCategory";
import SupplierDetails from "./components/Pages/SupplierDetails";
import EditSupplier from "./components/Pages/EditSuppliers";

import StockIn from "./components/Pages/StockIn";
import StockOut from "./components/Pages/StockOut";
import Suppliers from "./components/Pages/Suppliers";
import Orders from "./components/Pages/Orders/Orders";
import Reports from "./components/Pages/Reports";
import AdminProfile from "./components/pages/AdminProfile/AdminProfile";

import api from "./api/api";

function App() {
  // Products State
  const [products, setProducts] = useState([]);

  // Categories State
  const [categories, setCategories] = useState([]);

  // Orders State
  const [orders, setOrders] = useState([]);

  // Login State
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("login") === "true"
  );

  // Get Categories from Backend
  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      console.log(
        "Categories from Backend:",
        response.data
      );

      setCategories(
        response.data.categories || []
      );
    } catch (error) {
      console.log(
        "Fetch Categories Error:",
        error.response?.data || error.message
      );
    }
  };

  // Get Products from Backend
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      console.log(
        "Products from Backend:",
        response.data
      );

      setProducts(
        response.data.products || []
      );
    } catch (error) {
      console.log(
        "Fetch Products Error:",
        error.response?.data || error.message
      );
    }
  };

  // Get Orders from Backend
  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");

      console.log(
        "Orders from Backend:",
        response.data
      );

      setOrders(
        response.data.orders || []
      );
    } catch (error) {
      console.log(
        "Fetch Orders Error:",
        error.response?.data || error.message
      );
    }
  };

  // Fetch Data when App Loads
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchOrders();
  }, []);

  return (
    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/home"
        element={<HomePage />}
      />

      {/* Login */}

      <Route
        path="/login"
        element={
          <Login
            setIsLoggedIn={setIsLoggedIn}
          />
        }
      />
      <Route
        path="/register"
        element={<Register />}
      />
      <Route
        element={
          isLoggedIn ? (
            <Layout
              setIsLoggedIn={setIsLoggedIn}
            />
          ) : (
            <Navigate
              to="/login"
              replace
            />
          )
        }
      >
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
              categories={categories}
            />
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProductDetails />
          }
        />
        <Route
          path="/products/edit/:id"
          element={
            <EditProduct />
          }
        />
        

<Route
  path="/admin-profile"
  element={<AdminProfile />}
/>

                <Route
            path="/categories"
            element={
              <Category
                categories={categories}
                setCategories={setCategories}
                products={products}
                setProducts={setProducts}
              />
            }
          />

        <Route
          path="/categories/:id"
          element={
            <CategoryDetails />
          }
        />

        <Route
          path="/categories/edit/:id"
          element={
            <EditCategory />
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
                />   <Route
          path="/suppliers"
          element={<Suppliers />}
        />

        <Route
          path="/suppliers/:id"
          element={<SupplierDetails />}
        />

        <Route
          path="/suppliers/edit/:id"
          element={<EditSupplier />}
        />
              <Route
          path="/orders"
          element={
            <Orders
              orders={orders}
              setOrders={setOrders}
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

      {/* 404 Page */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>
  );
}

export default App;

