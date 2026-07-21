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

      console.log("Orders API Response:", response.data);

      const data = response.data;

      if (Array.isArray(data)) {
        setOrders(data);
      } else if (Array.isArray(data?.orders)) {
        setOrders(data.orders);
      } else if (Array.isArray(data?.data)) {
        setOrders(data.data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.log(
        "Fetch Orders Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch orders"
      );

      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewOrder((prev) => ({
      ...prev,
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
  };

  const addOrder = async (e) => {
    e.preventDefault();

    if (
      !newOrder.ordernumber.trim() ||
      !newOrder.customername.trim() ||
      !newOrder.productname.trim() ||
      !newOrder.quantity ||
      !newOrder.totalamount
    ) {
      alert("Please fill all fields");
      return;
    }

    if (
      Number(newOrder.quantity) <= 0 ||
      Number(newOrder.totalamount) < 0
    ) {
      alert("Please enter valid quantity and amount");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const orderData = {
        ordernumber: newOrder.ordernumber.trim(),
        customername: newOrder.customername.trim(),
        productname: newOrder.productname.trim(),
        quantity: Number(newOrder.quantity),
        totalamount: Number(newOrder.totalamount),
        status: newOrder.status,
      };

      const response = await api.post(
        "/orders",
        orderData
      );

      console.log("Add Order Response:", response.data);

      if (response.data?.order) {
        setOrders((prevOrders) => {
          const currentOrders = Array.isArray(prevOrders)
            ? prevOrders
            : [];

          return [
            ...currentOrders,
            response.data.order,
          ];
        });
      } else {
        await fetchOrders();
      }

      resetForm();
      alert("Order added successfully");
    } catch (error) {
      console.log(
        "Add Order Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to add order"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.delete(`/orders/${id}`);

      setOrders((prevOrders) => {
        const currentOrders = Array.isArray(prevOrders)
          ? prevOrders
          : [];

        return currentOrders.filter(
          (item) => item._id !== id
        );
      });

      alert("Order deleted successfully");
    } catch (error) {
      console.log(
        "Delete Order Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete order"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      setLoading(true);
      setError("");

      const response = await api.put(
        `/orders/${id}`,
        { status }
      );

      console.log(
        "Update Order Response:",
        response.data
      );

      if (response.data?.order) {
        setOrders((prevOrders) => {
          const currentOrders = Array.isArray(prevOrders)
            ? prevOrders
            : [];

          return currentOrders.map((item) =>
            item._id === id
              ? response.data.order
              : item
          );
        });
      } else {
        await fetchOrders();
      }
    } catch (error) {
      console.log(
        "Update Order Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to update order"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="orders">
      <h2>📦 Orders</h2>

      <button
        className="add-btn"
        onClick={() => setShowForm(!showForm)}
        disabled={loading}
      >
        ➕ Add Order
      </button>

      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
          }}
        >
          ❌ {error}
        </p>
      )}

      {showForm && (
        <div className="order-form">
          <h3>Add New Order</h3>

          <input
            type="text"
            name="ordernumber"
            placeholder="Order Number"
            value={newOrder.ordernumber}
            onChange={handleChange}
          />

          <input
            type="text"
            name="customername"
            placeholder="Customer Name"
            value={newOrder.customername}
            onChange={handleChange}
          />

          <input
            type="text"
            name="productname"
            placeholder="Product Name"
            value={newOrder.productname}
            onChange={handleChange}
          />

          <input
            type="number"
            min="1"
            name="quantity"
            placeholder="Quantity"
            value={newOrder.quantity}
            onChange={handleChange}
          />

          <input
            type="number"
            min="0"
            name="totalamount"
            placeholder="Total Amount"
            value={newOrder.totalamount}
            onChange={handleChange}
          />

          <select
            name="status"
            value={newOrder.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <button
            className="save-btn"
            onClick={addOrder}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

          <button
            className="cancel-btn"
            onClick={resetForm}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      )}

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
            {loading && safeOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  ⏳ Loading Orders...
                </td>
              </tr>
            ) : safeOrders.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  📦 No Orders Found
                </td>
              </tr>
            ) : (
              safeOrders.map((item, index) => (
                <tr key={item._id || index}>
                  <td>{index + 1}</td>
                  <td>{item.ordernumber || "-"}</td>
                  <td>{item.customername || "-"}</td>
                  <td>{item.productname || "-"}</td>
                  <td>{item.quantity || 0}</td>
                  <td>₹{item.totalamount || 0}</td>

                  <td>
                    <select
                      value={item.status || "Pending"}
                      onChange={(e) =>
                        updateStatus(
                          item._id,
                          e.target.value
                        )
                      }
                      disabled={loading}
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
                  </td>

                  <td>
                    {item.orderdate
                      ? new Date(
                          item.orderdate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteOrder(item._id)
                      }
                      disabled={loading}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;