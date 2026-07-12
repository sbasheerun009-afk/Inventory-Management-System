import "./Reports.css";

function Reports({ products, orders }) {
  const reports = [
    {
      id: 1,
      type: "Products Report",
      total: `${products.length} Products`,
      status: "Generated",
    },
    {
      id: 2,
      type: "Stock Report",
      total: `${products.reduce((sum, p) => sum + p.quantity, 0)} Items`,
      status: "Generated",
    },
    {
      id: 3,
      type: "Orders Report",
      total: `${orders.length} Orders`,
      status: "Generated",
    },
    {
      id: 4,
      type: "Sales Report",
      total: `₹${orders.reduce(
        (sum, order) => sum + order.price * order.qty,
        0
      )}`,
      status: "Generated",
    },
  ];

  return (
    <div className="products">
      <h2>📊 Reports</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Report Type</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.total}</td>

              <td
                style={{
                  color: "green",
                  fontWeight: "bold",
                }}
              >
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;