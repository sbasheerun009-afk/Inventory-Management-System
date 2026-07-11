import "../Products/Product.css";

function StockIn() {
  const stockIn = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      supplier: "Dell India",
      quantity: 20,
      date: "2026-04-20",
      status: "Received",
    },
    {
      id: 2,
      name: "Mouse",
      category: "Electronics",
      supplier: "Logitech",
      quantity: 50,
      date: "2026-04-19",
      status: "Received",
    },
    {
      id: 3,
      name: "Keyboard",
      category: "Electronics",
      supplier: "Logitech",
      quantity: 10,
      date: "2026-04-18",
      status: "Pending",
    },
    {
      id: 4,
      name: "School Bag",
      category: "Bags",
      supplier: "Skybags",
      quantity: 100,
      date: "2026-04-17",
      status: "Received",
    },
  ];

  return (
    <div className="products">
      <h2>Stock In</h2>

      <div className="top-bar">
        <button className="add-btn">+ Add Stock</button>

        <input
          type="text"
          placeholder="Search Stock In..."
          className="search"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {stockIn.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.supplier}</td>
              <td>{item.quantity}</td>
              <td>{item.date}</td>
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

export default StockIn;