import { useState, useEffect } from "react";
import "./Orders.css";

function Orders({
  orders,
  setOrders,
  products,
  setProducts,
}) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    document.title = "Orders | Inventory";
  }, []);

  const placeOrder = () => {
    if (!selectedProduct || !quantity) {
      alert("Please select product and quantity");
      return;
    }

    const qty = Number(quantity);

    if (qty <= 0) {
      alert("Enter valid quantity");
      return;
    }

    const product = products.find(
      (item) => item.id === Number(selectedProduct)
    );

    if (!product) {
      alert("Product not found");
      return;
    }

    if (product.quantity < qty) {
      alert("Not enough stock");
      return;
    }

    const newOrder = {
      id: Date.now(), // Internal only
      date: new Date().toLocaleString(),
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: qty,
      total: product.price * qty,
      status: "Completed",
    };

    setOrders([newOrder, ...orders]);

    setProducts(
      products.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity - qty,
            }
          : item
      )
    );

    setSelectedProduct("");
    setQuantity("");

    alert("Order Placed Successfully");
  };

  const deleteOrder = (id) => {
    if (window.confirm("Delete this order?")) {
      setOrders(
        orders.filter((item) => item.id !== id)
      );
    }
  };

  const totalRevenue = orders.reduce(
    (sum, item) => sum + item.total,
    0
  );

  const fetchOrders = async () => {
  try {

    const response = await api.get("/orders");
    console.log(response.data);
    setOrders(response.data.orders);

  } catch(error) {

    console.log(error);

  }
};


return (
  <div className="orders">
    <h2>🛒 Orders Management</h2>

    <div className="order-form">
      <h3>➕ Place New Order</h3>

      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        <option value="">Select Product</option>

        {products.map((item) => (
          <option
            key={item.id}
            value={item.id}
            disabled={item.quantity === 0}
          >
            {item.name} | Stock: {item.quantity} | ₹{item.price}
          </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        placeholder="Enter Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <button
        className="place-btn"
        onClick={placeOrder}
      >
        🛒 Place Order
      </button>
    </div>

    <div className="order-summary">
      <div className="card">
        <p>Total Orders</p>
        <h4>{orders.length}</h4>
      </div>

      <div className="card">
        <p>Total Revenue</p>
        <h4>₹{totalRevenue}</h4>
      </div>
    </div>

    <h3>📋 Order History</h3>

    {orders.length === 0 ? (
      <p className="empty">No Orders Available</p>
    ) : (
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr key={order.id}>
                <td>{index + 1}</td>
                <td>{order.name}</td>
                <td>{order.category}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price}</td>
                <td>₹{order.total}</td>
                <td>
                  <span className="status">
                    {order.status}
                  </span>
                </td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteOrder(order.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    )}
  </div>
);
}
export default Orders;