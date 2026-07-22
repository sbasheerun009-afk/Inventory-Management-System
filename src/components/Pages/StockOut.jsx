import { useState } from "react";
import api from "../../api/api";
import "./StockOut.css";

function StockOut({ products = [], setProducts }) {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStockOut = async (e) => {
    e.preventDefault();

    if (!productName || !quantity || !customerName) {
      alert("Please fill all details");
      return;
    }

    const stockQuantity = Number(quantity);

    if (stockQuantity <= 0) {
      alert("Quantity must be greater than 0");
      return;
    }

    // Find selected product
    const selectedProduct = products.find(
      (product) =>
        (product.productName ||
          product.productname) === productName
    );

    if (!selectedProduct) {
      alert("Product not found");
      return;
    }

    const productId =
      selectedProduct._id ||
      selectedProduct.id;

    const currentQuantity =
      Number(selectedProduct.quantity) || 0;

    // Check available stock
    if (stockQuantity > currentQuantity) {
      alert(
        `Only ${currentQuantity} items are available in stock`
      );
      return;
    }

    const updatedQuantity =
      currentQuantity - stockQuantity;

    try {
      setLoading(true);

      // 1. Save Stock Out record in MongoDB
      const stockData = {
        productname: productName,
        quantity: stockQuantity,
        customername: customerName,
      };

      await api.post(
        "/stockout",
        stockData
      );

      // 2. Update Product Quantity in MongoDB
      const productData = {
        productName:
          selectedProduct.productName ||
          selectedProduct.productname,

        category:
          selectedProduct.category,

        price:
          Number(selectedProduct.price) || 0,

        quantity:
          updatedQuantity,

        supplier:
          selectedProduct.supplier || "",
      };

      const response = await api.put(
        `/products/${productId}`,
        productData
      );

      // 3. Update Product in Frontend
      const updatedProduct =
        response.data.product ||
        productData;

      setProducts(
        (previousProducts) =>
          previousProducts.map(
            (product) => {
              const id =
                product._id ||
                product.id;

              if (id === productId) {
                return {
                  ...product,
                  ...updatedProduct,
                  quantity:
                    updatedQuantity,
                };
              }

              return product;
            }
          )
      );

      alert(
        "Stock Out Successfully ✅"
      );

      // Clear form
      setProductName("");
      setQuantity("");
      setCustomerName("");

    } catch (error) {
      console.log(
        "Stock Out Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to remove stock"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="stock-out">

      <h2>📤 Stock Out</h2>

      <div className="stock-out-form">

        <h3>Remove Stock</h3>

        <form
          onSubmit={handleStockOut}
        >

          <label>
            Product Name
          </label>

          <select
            value={productName}
            onChange={(e) =>
              setProductName(
                e.target.value
              )
            }
            disabled={loading}
          >

            <option value="">
              Select Product
            </option>

            {products.map(
              (product, index) => {

                const name =
                  product.productName ||
                  product.productname ||
                  "";

                return (
                  <option
                    key={
                      product._id ||
                      product.id ||
                      index
                    }
                    value={name}
                  >
                    {name ||
                      "Unnamed Product"}{" "}
                    - Stock:{" "}
                    {Number(
                      product.quantity || 0
                    )}
                  </option>
                );
              }
            )}

          </select>

          <label>
            Quantity
          </label>

          <input
            type="number"
            placeholder="Enter Quantity"
            value={quantity}
            min="1"
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
            disabled={loading}
          />

          <label>
            Customer Name
          </label>

          <input
            type="text"
            placeholder="Enter Customer Name"
            value={customerName}
            onChange={(e) =>
              setCustomerName(
                e.target.value
              )
            }
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Removing Stock..."
              : "📤 Remove Stock"}
          </button>

        </form>

      </div>

      <div className="stock-table">

        <h3>
          Current Stock
        </h3>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Supplier</th>
            </tr>

          </thead>

          <tbody>

            {products.length > 0 ? (

              products.map(
                (product, index) => {

                  const name =
                    product.productName ||
                    product.productname ||
                    "Unnamed Product";

                  return (

                    <tr
                      key={
                        product._id ||
                        product.id ||
                        index
                      }
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {name}
                      </td>

                      <td>
                        {product.category ||
                          "-"}
                      </td>

                      <td>
                        {product.quantity ||
                          0}
                      </td>

                      <td>
                        {product.supplier ||
                          "-"}
                      </td>

                    </tr>

                  );
                }
              )

            ) : (

              <tr>

                <td colSpan="5">
                  No Products Available
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default StockOut;
