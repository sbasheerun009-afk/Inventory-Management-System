import { useEffect, useState } from "react";
import api from "../../../api/api";
import "./Orders.css";

function Orders({ orders = [], setOrders }) {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newOrder, setNewOrder] = useState({
    ordernumber: "",
    customername: "",
    productname: "",
    quantity: "",
    totalamount: "",
    status: "Pending",
  });

  const safeOrders = Array.isArray(orders) ? orders : [];
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/orders");

      console.log("Orders Response:", response.data);

      const orderData = Array.isArray(response.data)
        ? response.data
        : response.data?.orders || [];

      setOrders(orderData);
    } catch (error) {
      console.log(
        "Fetch Orders Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when page loads
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewOrder((previousOrder) => ({
      ...previousOrder,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setNewOrder({
      ordernumber: "",
      customername: "",
      productname: "",
      quantity: "",
      totalamount: "",
      status: "Pending",
    });

    setShowForm(false);
    setError("");
  };

  const addOrder = async (e) => {
    e.preventDefault();

    const orderNumber =
      newOrder.ordernumber.trim();

    const customerName =
      newOrder.customername.trim();

    const productName =
      newOrder.productname.trim();

    const quantity =
      Number(newOrder.quantity);

    const totalAmount =
      Number(newOrder.totalamount);

    // Validation
    if (
      !orderNumber ||
      !customerName ||
      !productName ||
      !newOrder.quantity ||
      !newOrder.totalamount
    ) {
      alert("Please fill all fields");
      return;
    }

    if (quantity <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    if (totalAmount < 0) {
      alert("Total amount cannot be negative");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const orderData = {
        ordernumber: orderNumber,
        customername: customerName,
        productname: productName,
        quantity: quantity,
        totalamount: totalAmount,
        status: "Pending",
      };

      console.log(
        "Sending Order:",
        orderData
      );

      // Backend will:
      // 1. Create Order
      // 2. Decrease Product Quantity
      // 3. Create StockOut Record
      const response = await api.post(
        "/orders",
        orderData
      );

      console.log(
        "Order Created:",
        response.data
      );

      // Refresh orders
      await fetchOrders();

      resetForm();

      alert(
        "Order placed successfully ✅\nStock quantity decreased automatically 📦"
      );
    } catch (error) {
      console.log(
        "Add Order Error:",
        error.response?.data ||
          error.message
      );

      const message =
        error.response?.data?.message ||
        "Failed to place order";

      setError(message);

      alert(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };
  const deleteOrder = async (id) => {
    if (!id) {
      alert("Order ID not found");
      return;
    }

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this order?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      await api.delete(
        `/orders/${id}`
      );

      setOrders((previousOrders) =>
        previousOrders.filter(
          (order) =>
            order._id !== id
        )
      );

      alert(
        "Order deleted successfully"
      );
    } catch (error) {
      console.log(
        "Delete Order Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orders">

      <h2>📦 Orders</h2>

      {/* ADD ORDER BUTTON */}
      <button
        className="add-btn"
        onClick={() =>
          setShowForm(!showForm)
        }
        disabled={loading}
      >
        ➕ Add Order
      </button>

      {/* ERROR MESSAGE */}
      {error && (
        <p className="error-message">
          ❌ {error}
        </p>
      )}

      {/* ORDER FORM */}
      {showForm && (
        <div className="order-form">

          <h3>
            ➕ Add New Order
          </h3>

          <form onSubmit={addOrder}>

            <input
              type="text"
              name="ordernumber"
              placeholder="Order Number"
              value={
                newOrder.ordernumber
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="customername"
              placeholder="Customer Name"
              value={
                newOrder.customername
              }
              onChange={
                handleChange
              }
            />

            <input
              type="text"
              name="productname"
              placeholder="Product Name"
              value={
                newOrder.productname
              }
              onChange={
                handleChange
              }
            />

            <input
              type="number"
              name="quantity"
              min="1"
              placeholder="Quantity"
              value={
                newOrder.quantity
              }
              onChange={
                handleChange
              }
            />

            <input
              type="number"
              name="totalamount"
              min="0"
              placeholder="Total Amount"
              value={
                newOrder.totalamount
              }
              onChange={
                handleChange
              }
            />

            <select
              name="status"
              value={
                newOrder.status
              }
              onChange={
                handleChange
              }
            >
              <option value="Pending">
                Pending
              </option>

              <option value="Processing">
                Processing
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Placing Order..."
                : "📦 Place Order"}
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={resetForm}
              disabled={loading}
            >
              Cancel
            </button>

          </form>

        </div>
      )}

      {/* ORDERS TABLE */}
      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Order Number</th>
              <th>Customer Name</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Order Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {loading &&
            safeOrders.length === 0 ? (

              <tr>
                <td colSpan="9">
                  ⏳ Loading Orders...
                </td>
              </tr>

            ) : safeOrders.length === 0 ? (

              <tr>
                <td colSpan="9">
                  📦 No Orders Found
                </td>
              </tr>

            ) : (

              safeOrders.map(
                (order, index) => (

                  <tr
                    key={
                      order._id ||
                      index
                    }
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {
                        order.ordernumber ||
                        "-"
                      }
                    </td>

                    <td>
                      {
                        order.customername ||
                        "-"
                      }
                    </td>

                    <td>
                      {
                        order.productname ||
                        "-"
                      }
                    </td>

                    <td>
                      {
                        order.quantity ||
                        0
                      }
                    </td>

                    <td>
                      ₹
                      {
                        order.totalamount ||
                        0
                      }
                    </td>

                    <td>
                      {
                        order.status ||
                        "Pending"
                      }
                    </td>

                    <td>
                      {order.orderdate
                        ? new Date(
                            order.orderdate
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteOrder(
                            order._id
                          )
                        }
                        disabled={
                          loading
                        }
                      >
                        🗑 Delete
                      </button>

                    </td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Orders;
