import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "./Product.css";

function EditProduct() {
const { id } = useParams();
const navigate = useNavigate();

const [product, setProduct] = useState({
productname: "",
category: "",
price: "",
quantity: "",
supplier: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

// GET PRODUCT BY ID
const fetchProduct = async () => {
try {
setLoading(true);
setError("");
  const response = await api.get(`/products/${id}`);

  console.log("Product Details:", response.data);

  const data = response.data.product || response.data;

  setProduct({
    productname: data.productname || "",
    category: data.category || "",
    price: data.price ?? "",
    quantity: data.quantity ?? "",
    supplier: data.supplier || "",
  });
} catch (error) {
  console.log(
    "Fetch Product Error:",
    error.response?.data || error.message
  );

  setError(
    error.response?.data?.message ||
      "Failed to fetch product"
  );
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchProduct();
}, [id]);

// UPDATE PRODUCT
const handleUpdate = async (e) => {
e.preventDefault();
if (
  !product.productname.trim() ||
  !product.category ||
  product.price === "" ||
  product.quantity === "" ||
  !product.supplier.trim()
) {
  alert("Please fill all details");
  return;
}

if (
  Number(product.price) < 0 ||
  Number(product.quantity) < 0
) {
  alert("Negative values not allowed");
  return;
}

try {
  setLoading(true);
  setError("");

  const productData = {
    productname: product.productname.trim(),
    category: product.category,
    price: Number(product.price),
    quantity: Number(product.quantity),
    supplier: product.supplier.trim(),
  };

  await api.put(
    `/products/${id}`,
    productData
  );

  alert("Product Updated Successfully");

  // Redirect to Products page
  navigate("/products");
} catch (error) {
  console.log(
    "Update Product Error:",
    error.response?.data || error.message
  );

  setError(
    error.response?.data?.message ||
      "Failed to update product"
  );
} finally {
  setLoading(false);
}

};

return ( <div className="products"> <h2>✏️ Edit Product</h2>

  {error && (
    <div
      style={{
        color: "red",
        padding: "10px",
        textAlign: "center",
      }}
    >
      ❌ {error}
    </div>
  )}

  {loading && !product.productname ? (
    <p style={{ textAlign: "center" }}>
      ⏳ Loading Product...
    </p>
  ) : (
    <div className="product-form">
      <input
        type="text"
        placeholder="Product Name"
        value={product.productname}
        onChange={(e) =>
          setProduct({
            ...product,
            productname: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Category"
        value={product.category}
        onChange={(e) =>
          setProduct({
            ...product,
            category: e.target.value,
          })
        }
      />

      <input
        type="number"
        min="0"
        placeholder="Price"
        value={product.price}
        onChange={(e) =>
          setProduct({
            ...product,
            price: e.target.value,
          })
        }
      />

      <input
        type="number"
        min="0"
        placeholder="Quantity"
        value={product.quantity}
        onChange={(e) =>
          setProduct({
            ...product,
            quantity: e.target.value,
          })
        }
      />

      <input
        type="text"
        placeholder="Supplier"
        value={product.supplier}
        onChange={(e) =>
          setProduct({
            ...product,
            supplier: e.target.value,
          })
        }
      />

      <div>
        <button
          className="save-btn"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Update Product"}
        </button>

        <button
          className="cancel-btn"
          onClick={() =>
            navigate("/products")
          }
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</div>

);
}

export default EditProduct;
