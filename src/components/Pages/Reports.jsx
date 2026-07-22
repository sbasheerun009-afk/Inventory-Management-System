// import { useEffect } from "react";
// import "./Reports.css";

// function Reports({ products, orders }) {

//   useEffect(() => {
//     document.title = "Reports | Inventory Management System";
//   }, []);

//   const totalProducts = products.length;

//   const totalStock = products.reduce(
//     (sum, product) => sum + product.quantity,
//     0
//   );

//   const totalOrders = orders.length;

//   const totalSales = orders.reduce(
//     (sum, order) => sum + order.price * order.qty,
//     0
//   );

//   const reports = [
//     {
//       id: 1,
//       icon: "📦",
//       type: "Products Report",
//       total: `${totalProducts} Products`,
//     },
//     {
//       id: 2,
//       icon: "📊",
//       type: "Stock Report",
//       total: `${totalStock} Items`,
//     },
//     {
//       id: 3,
//       icon: "🛒",
//       type: "Orders Report",
//       total: `${totalOrders} Orders`,
//     },
//     {
//       id: 4,
//       icon: "💰",
//       type: "Sales Report",
//       total: `₹${totalSales.toLocaleString()}`,
//     },
//   ];

//   return (
//     <div className="reports">

//       <h2>📊 Reports</h2>

//       <div className="report-cards">

//         {reports.map((item) => (

//           <div className="report-card" key={item.id}>

//             <h3>
//               {item.icon} {item.type}
//             </h3>

//             <p>{item.total}</p>

//             <span>Generated ✅</span>

//           </div>

//         ))}

//       </div>

//       <table className="reports-table">

//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Report Type</th>
//             <th>Total</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>

//           {reports.map((item) => (

//             <tr key={item.id}>

//               <td>{item.id}</td>

//               <td>
//                 {item.icon} {item.type}
//               </td>

//               <td>{item.total}</td>

//               <td className="generated">
//                 Generated
//               </td>

//             </tr>

//           ))}

//         </tbody>

//       </table>

//     </div>
//   );
// }

// export default Reports;
import { useEffect } from "react";
import "./Reports.css";

function Reports({ products = [], orders = [] }) {
  useEffect(() => {
    document.title = "Reports | Inventory Management System";
  }, []);

  // Make sure products and orders are always arrays
  const safeProducts = Array.isArray(products)
    ? products
    : [];

  const safeOrders = Array.isArray(orders)
    ? orders
    : [];

  // Total number of products
  const totalProducts = safeProducts.length;

  // Total available stock quantity
  const totalStock = safeProducts.reduce(
    (sum, product) => {
      const quantity = Number(
        product?.quantity || 0
      );

      return (
        sum +
        (Number.isNaN(quantity) ? 0 : quantity)
      );
    },
    0
  );

  // Total number of orders
  const totalOrders = safeOrders.length;

  // Total sales
  // Backend order field is totalamount
  const totalSales = safeOrders.reduce(
    (sum, order) => {
      const amount = Number(
        order?.totalamount || 0
      );

      return (
        sum +
        (Number.isNaN(amount) ? 0 : amount)
      );
    },
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
      total: `₹${totalSales.toLocaleString("en-IN")}`,
    },
  ];

  return (
    <div className="reports">
      <h2>📊 Reports</h2>

      <div className="report-cards">
        {reports.map((item) => (
          <div
            className="report-card"
            key={item.id}
          >
            <h3>
              {item.icon} {item.type}
            </h3>

            <p>{item.total}</p>

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
          {reports.map((item) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;