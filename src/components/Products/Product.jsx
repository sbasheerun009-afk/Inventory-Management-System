import "./Product.css";

function Products() {
  const products = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 50000,
      quantity: 20,
      status: "In Stock",
    },
    {
      id: 2,
      name: "Mouse",
      category: "Electronics",
      price: 1000,
      quantity: 5,
      status: "Low Stock",
    },
    {
      id: 3,
      name: "Keyboard",
      category: "Electronics",
      price: 2000,
      quantity: 0,
      status: "Out of Stock",
    },
    {
      id: 4,
      name: "School Bag",
      category: "Bags",
      price: 1000,
      quantity: 50,
      status: "In Stock",
    },
  ];

  return (
    <div className="products">
      <h2>Products</h2>

      <div className="top-bar">
        <button className="add-btn">+ Add Product</button>

        <input
          type="text"
          placeholder="Search Product..."
          className="search"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.status}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;