import { useEffect } from "react";
import "./Reports.css";

function Reports({ products, orders }) {

  useEffect(() => {
    document.title = "Reports | Inventory Management System";
  }, []);


  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const totalOrders = orders.length;

  const totalSales = orders.reduce(
    (sum, order) => sum + order.price * order.qty,
    0
  );


  const reports = [
    {
      id: 1,
      icon: "📦",
      type: "Products Report",
      total: `${totalProducts} Products`,
    },
    {
      id: 2,
      icon: "📊",
      type: "Stock Report",
      total: `${totalStock} Items`,
    },
    {
      id: 3,
      icon: "🛒",
      type: "Orders Report",
      total: `${totalOrders} Orders`,
    },
    {
      id: 4,
      icon: "💰",
      type: "Sales Report",
      total: `₹${totalSales.toLocaleString()}`,
    },
  ];


  return (
    <div className="reports">

      <h2>📊 Reports</h2>


      <div className="report-cards">

        {reports.map((item) => (

          <div className="report-card" key={item.id}>

            <h3>
              {item.icon} {item.type}
            </h3>

            <p>
              {item.total}
            </p>

            <span>
              Generated ✅
            </span>

          </div>

        ))}

      </div>


      <table className="reports-table">

        <thead>
          <tr>
            <th>ID</th>
            <th>Report Type</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>


        <tbody>

          {
            reports.map((item)=>(
              <tr key={item.id}>

                <td>{item.id}</td>

                <td>
                  {item.icon} {item.type}
                </td>

                <td>
                  {item.total}
                </td>

                <td className="generated">
                  Generated
                </td>

              </tr>
            ))
          }

        </tbody>

      </table>

    </div>
  );
}

export default Reports;