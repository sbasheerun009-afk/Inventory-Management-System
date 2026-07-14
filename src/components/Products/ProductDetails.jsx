import { useParams, Link } from "react-router-dom";

function ProductDetails({ products }) {
  const { id } = useParams();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>❌ Product Not Found</h2>
        <Link to="/dashboard">
          <button>⬅ Back</button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>📦 Product Details</h1>

      <h3>ID : {product.id}</h3>
      <h3>Name : {product.name}</h3>
      <h3>Category : {product.category}</h3>
      <h3>Price : ₹{product.price}</h3>
      <h3>Quantity : {product.quantity}</h3>

      <Link to="/dashboard">
        <button>⬅ Back to Dashboard</button>
      </Link>
    </div>
  );
}

export default ProductDetails;