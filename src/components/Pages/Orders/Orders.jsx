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

  // Always keep orders as an array
  const safeOrders = Array.isArray(orders) ? orders : [];
  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/orders");

      console.log("Orders API Response:", response.data);

      const data = response.data;

      let fetchedOrders = [];

      if (Array.isArray(data)) {
        fetchedOrders = data;
      } else if (Array.isArray(data?.orders)) {
        fetchedOrders = data.orders;
      } else if (Array.isArray(data?.data)) {
        fetchedOrders = data.data;
      } else if (Array.isArray(data?.order)) {
        fetchedOrders = data.order;
      }

      setOrders(fetchedOrders);

      console.log("Final Orders Array:", fetchedOrders);
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

  // Fetch orders when component loads
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

    const orderNumber = String(
      newOrder.ordernumber || ""
    ).trim();

    const customerName = String(
      newOrder.customername || ""
    ).trim();

    const productName = String(
      newOrder.productname || ""
    ).trim();

    const quantity = Number(newOrder.quantity);

    const totalAmount = Number(
      newOrder.totalamount
    );

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

    if (
      Number.isNaN(quantity) ||
      quantity <= 0
    ) {
      alert("Please enter a valid quantity");
      return;
    }

    if (
      Number.isNaN(totalAmount) ||
      totalAmount < 0
    ) {
      alert("Please enter a valid total amount");
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
        status: newOrder.status,
      };

      console.log(
        "Sending Order Data:",
        orderData
      );

      const response = await api.post(
        "/orders",
        orderData
      );

      console.log(
        "Add Order Response:",
        response.data
      );

      // After successful add,
      // fetch latest orders from backend.
      await fetchOrders();

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
    if (!id) {
      alert("Order ID not found");
      return;
    }

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

      // Remove deleted order from frontend state
      setOrders((prevOrders) => {
        const safePrevOrders = Array.isArray(
          prevOrders
        )
          ? prevOrders
          : [];

        return safePrevOrders.filter(
          (item) => item?._id !== id
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
  const updateStatus = async (
    id,
    status
  ) => {
    if (!id) {
      alert("Order ID not found");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await api.put(
        `/orders/${id}`,
        {
          status,
        }
      );

      console.log(
        "Update Order Response:",
        response.data
      );

      // Get updated order from backend
      if (response.data?.order) {
        const updatedOrder =
          response.data.order;

        setOrders((prevOrders) => {
          const safePrevOrders =
            Array.isArray(prevOrders)
              ? prevOrders
              : [];

          return safePrevOrders.map(
            (item) =>
              item?._id === id
                ? updatedOrder
                : item
          );
        });
      } else {
        // If backend doesn't return updated order,
        // fetch all orders again.
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

      {/* ERROR */}
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
            value={
              newOrder.ordernumber
            }
            onChange={handleChange}
          />

          <input
            type="text"
            name="customername"
            placeholder="Customer Name"
            value={
              newOrder.customername
            }
            onChange={handleChange}
          />

          <input
            type="text"
            name="productname"
            placeholder="Product Name"
            value={
              newOrder.productname
            }
            onChange={handleChange}
          />

          <input
            type="number"
            min="1"
            name="quantity"
            placeholder="Quantity"
            value={
              newOrder.quantity
            }
            onChange={handleChange}
          />

          <input
            type="number"
            min="0"
            name="totalamount"
            placeholder="Total Amount"
            value={
              newOrder.totalamount
            }
            onChange={handleChange}
          />

          <select
            name="status"
            value={newOrder.status}
            onChange={handleChange}
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
            className="save-btn"
            onClick={addOrder}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Save"}
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
            {loading &&
            safeOrders.length === 0 ? (
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
              safeOrders.map(
                (item, index) => {
                  const quantity = Number(
                    item?.quantity || 0
                  );

                  const totalAmount = Number(
                    item?.totalamount || 0
                  );

                  return (
                    <tr
                      key={
                        item?._id ||
                        index
                      }
                    >
                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {item?.ordernumber ||
                          "-"}
                      </td>

                      <td>
                        {item?.customername ||
                          "-"}
                      </td>

                      <td>
                        {item?.productname ||
                          "-"}
                      </td>

                      <td>
                        {quantity}
                      </td>

                      <td>
                        ₹{totalAmount}
                      </td>

                      <td>
                        <select
                          value={
                            item?.status ||
                            "Pending"
                          }
                          onChange={(e) =>
                            updateStatus(
                              item?._id,
                              e.target.value
                            )
                          }
                          disabled={
                            loading ||
                            !item?._id
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
                      </td>

                      <td>
                        {item?.orderdate
                          ? new Date(
                              item.orderdate
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteOrder(
                              item?._id
                            )
                          }
                          disabled={
                            loading ||
                            !item?._id
                          }
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  );
                }
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;

