import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage">
      <h1>Welcome to Inventory Management System</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>250</p>
        </div>

        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>₹45,000</p>
        </div>

        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <p>12</p>
        </div>

        <div className="stat-card">
          <h3>Total Users</h3>
          <p>5</p>
        </div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Product</th>
              <th>Action</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>21 Apr 2026</td>
              <td>Laptop</td>
              <td>Sold</td>
              <td>2</td>
            </tr>
            <tr>
              <td>20 Apr 2026</td>
              <td>Mouse</td>
              <td>Stock In</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage; // idi chala important