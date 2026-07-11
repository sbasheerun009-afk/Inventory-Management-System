import "./Orders.css"; // same folder lo undi

function Orders() {
  const orders = [
    {
      id: 1,
      orderNo: "ORD001",
      customer: "Ravi Kumar",
      product: "Laptop",
      qty: 2,
      total: 100000,
      status: "Delivered",
      date: "2026-04-20"
    },
    {
      id: 2,
      orderNo: "ORD002",
      customer: "Priya Sharma",
      product: "School Bag",
      qty: 5,
      total: 5000,
      status: "Pending",
      date: "2026-04-21"
    },
    {
      id: 3,
      orderNo: "ORD003",
      customer: "Amit Singh",
      product: "Mouse",
      qty: 10,
      total: 10000,
      status: "Processing",
      date: "2026-04-22"
    },
  ];

  return (
    <div className="products">
      <h2>Orders</h2>

      <div className="top-bar">
        <button className="add-btn">+ New Order</button>
        <input
          type="text"
          placeholder="Search Order..."
          className="search"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order No</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.orderNo}</td>
              <td>{item.customer}</td>
              <td>{item.product}</td>
              <td>{item.qty}</td>
              <td>₹{item.total}</td>
              <td style={{ 
                color: item.status === "Delivered" ? "#22c55e" : 
                       item.status === "Pending" ? "#f97316" : "#3b82f6" 
              }}>
                {item.status}
              </td>
              <td>{item.date}</td>
              <td>
                <button>View</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;