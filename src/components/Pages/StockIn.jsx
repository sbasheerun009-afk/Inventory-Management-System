import "./StockIn.css";

function StockIn({ products, setProducts }) {

  const stockInProduct = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });

    setProducts(updatedProducts);
    alert("Stock added successfully!");
  };

  return (
    <div className="products">
      <h2>Stock In</h2>

      <div className="top-bar">
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
            <th>Current Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    className="btn-add"
                    onClick={() => stockInProduct(item.id)}
                  >
                    + Add Stock
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  fontWeight: "bold",
                }}
              >
                No Products Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockIn;