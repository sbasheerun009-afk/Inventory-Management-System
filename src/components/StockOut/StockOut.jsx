import { useEffect, useState } from "react";
import api from "../../api/api";
import "./StockOut.css";

function StockOut({ products = [], setProducts }) {
  const [stockOut, setStockOut] = useState([]);

  const [formData, setFormData] = useState({
    productname: "",
    quantity: "",
    customername: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // GET ALL STOCK OUT RECORDS
  const fetchStockOut = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/stockout");

      setStockOut(
        response.data.stockouts || []
      );
    } catch (error) {
      console.log(
        "Fetch Stock Out Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch stock out records"
      );
    } finally {
      setLoading(false);
    }
  };

  // LOAD STOCK OUT HISTORY
  useEffect(() => {
    fetchStockOut();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  // STOCK OUT PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // VALIDATION
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

    if (!formData.customername.trim()) {
      setError("Please enter customer name");
      return;
    }

    // FIND SELECTED PRODUCT
    const selectedProduct = products.find(
      (item) =>
        item.productname ===
        formData.productname
    );

    if (!selectedProduct) {
      setError("Product not found");
      return;
    }

    // CURRENT PRODUCT QUANTITY
    const currentQuantity = Number(
      selectedProduct.quantity || 0
    );

    // STOCK OUT QUANTITY
    const stockOutQuantity = Number(
      formData.quantity
    );

    // CHECK AVAILABLE STOCK
    if (
      stockOutQuantity > currentQuantity
    ) {
      setError(
        `Only ${currentQuantity} items available in stock`
      );
      return;
    }

    try {
      setLoading(true);

      // PREPARE STOCK OUT DATA
      const stockData = {
        productname:
          formData.productname.trim(),

        quantity: stockOutQuantity,

        customername:
          formData.customername.trim(),
      };

      // 1. SAVE STOCK OUT RECORD
      const stockOutResponse =
        await api.post(
          "/stockout",
          stockData
        );

      const newStockOut =
        stockOutResponse.data.stockout;

      // 2. CALCULATE NEW PRODUCT QUANTITY
      const updatedQuantity =
        currentQuantity -
        stockOutQuantity;

      // 3. UPDATE PRODUCT IN MONGODB
      const productResponse =
        await api.put(
          `/products/${selectedProduct._id}`,
          {
            productname:
              selectedProduct.productname,

            category:
              selectedProduct.category,

            price:
              selectedProduct.price,

            quantity:
              updatedQuantity,

            supplier:
              selectedProduct.supplier,
          }
        );

      const updatedProduct =
        productResponse.data.product;

      // 4. UPDATE PRODUCT STATE
      setProducts(
        products.map((item) =>
          item._id === selectedProduct._id
            ? updatedProduct
            : item
        )
      );

      // 5. UPDATE STOCK OUT HISTORY
      setStockOut([
        newStockOut,
        ...stockOut,
      ]);

      // 6. RESET FORM
      setFormData({
        productname: "",
        quantity: "",
        customername: "",
      });

      alert(
        "Stock Out Successfully"
      );
    } catch (error) {
      console.log(
        "Stock Out Error:",
        error.response?.data ||
          error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to process stock out"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stockout">
      <h2>📤 Stock Out</h2>

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

      {/* STOCK OUT FORM */}
      <div className="stockout-form">
        <h3>
          Stock Out Product
        </h3>

        <select
          name="productname"
          value={formData.productname}
          onChange={handleChange}
          disabled={loading}
        >
          <option value="">
            Select Product
          </option>

          {products.map((item) => (
            <option
              key={item._id}
              value={item.productname}
            >
              {item.productname} - Stock:{" "}
              {item.quantity}
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
          disabled={loading}
        />

        <input
          type="text"
          name="customername"
          placeholder="Enter Customer Name"
          value={
            formData.customername
          }
          onChange={handleChange}
          disabled={loading}
        />

        <button
          className="save-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading
            ? "Processing..."
            : "📤 Stock Out"}
        </button>
      </div>

      {/* STOCK OUT HISTORY */}
      <div className="table-box">
        <h3>
          Stock Out History
        </h3>

        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Customer Name</th>
              <th>Stock Out Date</th>
            </tr>
          </thead>

          <tbody>
            {stockOut.length === 0 ? (
              <tr>
                <td colSpan="5">
                  No Stock Out Records Found
                </td>
              </tr>
            ) : (
              stockOut.map(
                (item, index) => (
                  <tr
                    key={item._id}
                  >
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.productname}
                    </td>

                    <td>
                      {item.quantity}
                    </td>

                    <td>
                      {item.customername}
                    </td>

                    <td>
                      {item.stockoutdate
                        ? new Date(
                            item.stockoutdate
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

export default StockOut;
