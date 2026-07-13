import "../Products/Product.css";

function StockOut({ products, setProducts }) {

  const stockOutProduct = (id) => {
    const selectedProduct = products.find(
      (product) => product.id === id
    );

    if (selectedProduct.quantity === 0) {
      alert("❌ Stock is not available!");
      return;
    }

    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }

      return product;
    });

    setProducts(updatedProducts);

    alert("✅ Stock issued successfully!");
  };


  return (
    <div className="products">

      <h2>📤 Stock Out</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="🔍 Search Product..."
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
            <th>Status</th>
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
                  {
                    item.quantity === 0 ? (
                      <span className="out-stock">
                        Out of Stock
                      </span>
                    ) : item.quantity < 5 ? (
                      <span className="low-stock">
                        Low Stock
                      </span>
                    ) : (
                      <span className="in-stock">
                        In Stock
                      </span>
                    )
                  }
                </td>


                <td>

                  <button
                    className="btn-remove"
                    disabled={item.quantity === 0}
                    onClick={() => stockOutProduct(item.id)}
                  >
                    - Issue Stock
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="7">
                No Products Available
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default StockOut;