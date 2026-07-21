import { useEffect, useState } from "react";
import api from "../../api/api";
import "./StockIn.css";

function StockIn({ products = [], setProducts }) {
  const [stockIn, setStockIn] = useState([]);

  const [formData, setFormData] = useState({
    productname: "",
    quantity: "",
    suppliername: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // GET STOCK IN RECORDS
  const fetchStockIn = async () => {
    try {
      const response = await api.get("/stockin");

      setStockIn(
        response.data.stockin ||
          response.data.stockIns ||
          []
      );
    } catch (error) {
      console.log(
        "Fetch Stock In Error:",
        error.response?.data ||
          error.message
      );
    }
  };

  useEffect(() => {
    fetchStockIn();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ADD STOCK
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.productname) {
      setError("Please select a product");
      return;
    }

    if (
      !formData.quantity ||
      Number(formData.quantity) <= 0
    ) {
      setError("Please enter a valid quantity");
      return;
    }

    if (!formData.suppliername.trim()) {
      setError("Please enter supplier name");
      return;
    }

    try {
      setLoading(true);

      const stockData = {
        productname: formData.productname,
        quantity: Number(formData.quantity),
        suppliername:
          formData.suppliername.trim(),
      };

      // SAVE STOCK IN RECORD
      const response = await api.post(
        "/stockin",
        stockData
      );

      const newStockIn =
        response.data.stockin ||
        response.data.stockIn;

      if (newStockIn) {
        setStockIn([
          ...stockIn,
          newStockIn,
        ]);
      }

      // UPDATE PRODUCT QUANTITY
      const selectedProduct =
        products.find(
          (item) =>
            (item.productname ||
              item.name) ===
            formData.productname
        );

      if (selectedProduct) {
        const updatedQuantity =
          Number(
            selectedProduct.quantity || 0
          ) +
          Number(formData.quantity);

        setProducts(
          products.map((item) =>
            item._id ===
              selectedProduct._id ||
            item.id ===
              selectedProduct.id
              ? {
                  ...item,
                  quantity:
                    updatedQuantity,
                }
              : item
          )
        );
      }

      alert("Stock Added Successfully");

      setFormData({
        productname: "",
        quantity: "",
        suppliername: "",
      });

      fetchStockIn();
    } catch (error) {
      console.log(
        "Add Stock Error:",
        error.response?.data ||
          error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to add stock"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stockin">
      <h2>📦 Stock In</h2>

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

      <div className="stockin-form">
        <h3>Add Stock</h3>

        <select
          name="productname"
          value={formData.productname}
          onChange={handleChange}
        >
          <option value="">
            Select Product
          </option>

          {products.map((item, index) => (
            <option
              key={
                item._id ||
                item.id ||
                index
              }
              value={
                item.productname ||
                item.name
              }
            >
              {item.productname ||
                item.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="quantity"
          min="1"
          placeholder="Enter Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <input
          type="text"
          name="suppliername"
          placeholder="Enter Supplier Name"
          value={formData.suppliername}
          onChange={handleChange}
        />

        <button
          className="save-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Adding..."
            : "📦 Add Stock"}
        </button>
      </div>

      <div className="table-box">
        <h3>Stock In History</h3>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Supplier Name</th>
              <th>Stock In Date</th>
            </tr>
          </thead>

          <tbody>
            {stockIn.length === 0 ? (
              <tr>
                <td colSpan="5">
                  No Stock In Records Found
                </td>
              </tr>
            ) : (
              stockIn.map(
                (item, index) => (
                  <tr
                    key={
                      item._id ||
                      item.id ||
                      index
                    }
                  >
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.productname ||
                        "-"}
                    </td>

                    <td>
                      {item.quantity ||
                        0}
                    </td>

                    <td>
                      {item.suppliername ||
                        "-"}
                    </td>

                    <td>
                      {item.stockindate
                        ? new Date(
                            item.stockindate
                          ).toLocaleDateString()
                        : "-"}
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

export default StockIn;
