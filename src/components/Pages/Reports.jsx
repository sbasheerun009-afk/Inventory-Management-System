import "./Reports.css";

function Reports() {
  const reports = [
    { id: 1, type: "Sales Report", date: "2026-04-01 to 2026-04-21", total: "₹1,15,000", status: "Generated" },
    { id: 2, type: "Stock Report", date: "2026-04-21", total: "450 Items", status: "Generated" },
    { id: 3, type: "Supplier Report", date: "2026-04-01 to 2026-04-21", total: "12 Suppliers", status: "Pending" },
    { id: 4, type: "Profit Report", date: "2026-03-01 to 2026-03-31", total: "₹35,000", status: "Generated" },
  ];

  return (
    <div className="products">
      <h2>Reports</h2>

      <div className="top-bar">
        <button className="add-btn">+ Generate Report</button>
        <input
          type="text"
          placeholder="Search Report..."
          className="search"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Report Type</th>
            <th>Date Range</th>
            <th>Total</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.type}</td>
              <td>{item.date}</td>
              <td>{item.total}</td>
              <td style={{ 
                color: item.status === "Generated" ? "#22c55e" : "#f97316" 
              }}>
                {item.status}
              </td>
              <td>
                <button>Download</button>
                <button>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;