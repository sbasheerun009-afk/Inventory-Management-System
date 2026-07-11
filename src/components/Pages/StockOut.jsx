import "../Products/Product.css";

function StockOut() {
  const stockOut = [
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      customer: "Hotel Taj",
      quantity: 5,
      date: "2026-04-21",
      status: "Issued",
    },
    {
      id: 2,
      name: "Mouse",
      category: "Electronics",
      customer: "Office Supplies",
      quantity: 20,
      date: "2026-04-20",
      status: "Issued",
    },
    {
      id: 3,
      name: "Keyboard",
      category: "Electronics",
      customer: "College",
      quantity: 10,
      date: "2026-04-19",
      status: "Pending",
    },
    {
      id: 4,
      name: "School Bag",
      category: "Bags",
      customer: "School",
      quantity: 30,
      date: "2026-04-18",
      status: "Issued",
    },
  ];

  return (
    <div className="products">
      <h2>Stock Out</h2>

      <div className="top-bar">
        <button className="add-btn">+ Issue Stock</button>

        <input
          type="text"
          placeholder="Search Stock Out..."
          className="search"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Customer</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {stockOut.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.customer}</td>
              <td>{item.quantity}</td>
              <td>{item.date}</td>
              <td style={{ 
                color: item.status === "Issued" ? "#22c55e" : "#f97316",
                fontWeight: "500"
              }}>
                {item.status}
              </td>
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

export default StockOut;