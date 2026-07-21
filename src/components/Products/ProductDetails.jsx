// import { useParams, Link } from "react-router-dom";

// function ProductDetails({ products }) {
//   const { id } = useParams();

//   const product = products.find(
//     (item) => item.id === Number(id)
//   );

//   if (!product) {
//     return (
//       <div style={{ padding: "20px" }}>
//         <h2>❌ Product Not Found</h2>
//         <Link to="/dashboard">
//           <button>⬅ Back</button>
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>📦 Product Details</h1>

//       <h3>ID : {product.id}</h3>
//       <h3>Name : {product.name}</h3>
//       <h3>Category : {product.category}</h3>
//       <h3>Price : ₹{product.price}</h3>
//       <h3>Quantity : {product.quantity}</h3>

//       <Link to="/dashboard">
//         <button>⬅ Back to Dashboard</button>
//       </Link>
//     </div>
//   );
// }

// export default ProductDetails;
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/products/${id}`);

      console.log("Product Details:", response.data);

      setProduct(response.data.product);
    } catch (error) {
      console.log(
        "Error fetching product:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch product details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>⏳ Loading Product Details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>❌ {error}</h2>

        <Link to="/products">
          <button>⬅ Back to Products</button>
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>❌ Product Not Found</h2>

        <Link to="/products">
          <button>⬅ Back to Products</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Product Details</h1>

      <div>
        <h3>Product ID: {product._id}</h3>
        <h3>Product Name: {product.productname}</h3>
        <h3>Category: {product.category}</h3>
        <h3>Price: ₹{product.price}</h3>
        <h3>Quantity: {product.quantity}</h3>
        <h3>Supplier: {product.supplier}</h3>
      </div>

      <Link to="/products">
        <button>⬅ Back to Products</button>
      </Link>
    </div>
  );
}

export default ProductDetails;
