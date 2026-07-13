
import "./Dashboard.css";
import { useState } from "react";

function Dashboard({ products, setProducts, orders, setOrders }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const addProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity++;
    updatedProducts[index].buyQty++;
    setProducts(updatedProducts);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];

    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity--;

      if (updatedProducts[index].buyQty > 0) {
        updatedProducts[index].buyQty--;
      }
    } else {
      alert("Stock is not available");
    }

    setProducts(updatedProducts);
  };

  const orderProduct = (index) => {
    if (products[index].quantity > 0) {
      const newOrder = {
        id: Date.now(),
        name: products[index].name,
        category: products[index].category,
        price: products[index].price,
        qty: products[index].buyQty || 1,
      };

      setOrders([...orders, newOrder]);

      const updatedProducts = [...products];
      updatedProducts[index].quantity =
        updatedProducts[index].quantity -
        (updatedProducts[index].buyQty || 1);

      updatedProducts[index].buyQty = 0;

      setProducts(updatedProducts);

      alert(`${products[index].name} ordered successfully!`);
    } else {
      alert("Please add product. Stock is not available.");
    }
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id!== id));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || p.category === category)
  );

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalOrderValue = orders.reduce((sum, o) => sum + o.price * o.qty, 0);

  const getStatusClass = (qty) => {
    if (qty === 0) return "out-stock";
    if (qty < 5) return "low-stock";
    return "in-stock";
  };

  return (
    <div className="dashboard-container">
      <h2>Inventory Management Dashboard</h2>
{/* 
      <div className="cards">
        <div className="card">
          <h3>🗃️ Total Products</h3>
          <p>{totalProducts}</p>
        </div>

        <div className="card">
          <h3>📦 Total Stock</h3>
          <p>{totalStock}</p>
        </div>

        <div className="card">
          <h3>💵 Total Order Value</h3>
          <p>₹{totalOrderValue}</p>
        </div>
      </div> */}
      <div className="cards">

  <div className="card total-products">
    <h3>🗃️ Total Products</h3>
    <p>{totalProducts}</p>
  </div>


  <div className="card total-stock">
    <h3>📦 Total Stock</h3>
    <p>{totalStock}</p>
  </div>


  <div className="card order-value">
    <h3>💰 Order Value</h3>
    <p>₹{totalOrderValue}</p>
  </div>


  <div className="card low-stock-card">
    <h3>⚠️ Low Stock</h3>
    <p>
      {
        products.filter(
          (p)=>p.quantity < 5
        ).length
      }
    </p>
  </div>

</div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Bags">Bags</option>
          <option value="Stationery">Stationery</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th>Add</th>
              <th>Remove</th>
              <th>Buy Qty</th>
              <th>Order</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0? (
              filteredProducts.map((product) => {
                const index = products.findIndex((p) => p.id === product.id);

                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.category}</td>
                    <td className={getStatusClass(product.quantity)}>
                      {product.quantity}
                    </td>
                    <td>₹{product.price}</td>
                    <td>
                      <button
                        className="btn-add"
                        onClick={() => addProduct(index)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn-remove"
                        onClick={() => removeProduct(index)}
                      >
                        -
                      </button>
                    </td>
                    <td>{product.buyQty}</td>
                    <td>
                      <button
                        className="btn-order"
                        onClick={() => orderProduct(index)}
                        disabled={product.quantity === 0}
                      >
                        Order
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="9" style={{ textAlign: "center" }}>
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 className="orders-title">Orders</h2>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Total Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.name}</td>
                  <td>{order.category}</td>
                  <td>{order.qty}</td>
                  <td>₹{order.price * order.qty}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteOrder(order.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: "center" }}>
                  📦 No Orders Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;






















































































































































































































































































































































































































































































































































































































































































































    