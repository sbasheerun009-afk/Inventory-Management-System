// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Dashboard.css";

// function Dashboard({
//   products = [],
//   setProducts,
//   orders = [],
//   setOrders,
// }) {

//   const [stats, setStats] = useState({
//     totalProducts: 0,
//     totalStock: 0,
//     lowStock: 0,
//     outOfStock: 0,
//     totalOrders: 0,
//     stockValue: 0,
//   });

//   useEffect(() => {
//     const totalProducts = products.length;

//     const totalStock = products.reduce(
//       (sum, item) => sum + item.quantity,
//       0
//     );

//     const lowStock = products.filter(
//       (item) => item.quantity > 0 && item.quantity <= 5
//     ).length;

//     const outOfStock = products.filter(
//       (item) => item.quantity === 0
//     ).length;

//     const stockValue = products.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     setStats({
//       totalProducts,
//       totalStock,
//       lowStock,
//       outOfStock,
//       totalOrders: orders.length,
//       stockValue,
//     });

//   }, [products, orders]);

//   const addStock = (id) => {
//     setProducts(
//       products.map((item) =>
//         item.id === id
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       )
//     );
//   };

//   const removeStock = (id) => {
//     setProducts(
//       products.map((item) => {
//         if (item.id === id) {
//           if (item.quantity > 0) {
//             return {...item,
//               quantity: item.quantity - 1,
//             };
//           } else {
//             alert("Stock is already zero");
//           }}
//         return item;
//       })
//     );};

//   const orderProduct = (item) => {
//     if (item.quantity === 0) {
//       alert("❌ Product Out Of Stock");
//       return;
//     }
//     //const oreder = { id: date.now(),}

//     const newOrder = {
//       id: Date.now(),
//       name: item.name,
//       category: item.category,
//       price: item.price,
//       qty: 1,
//     };

//     setOrders([...orders, newOrder]);

//     removeStock(item.id);

//     alert("🛒 Order Placed Successfully");
//   };
// return (
//   <div className="dashboard">

//     <div className="dashboard-header">
//       <h1>📊 Inventory Management Dashboard</h1>
//       <p>Welcome Admin 👋 Manage your inventory efficiently.</p>
//     </div>

//     <div className="dashboard-cards">

// <div className="card blue">
//       <h3>📦 Total Products</h3>
//       <h1>{stats.totalProducts}</h1>
//   </div>

// <div className="card green">
//     <h3>📊 Total Stock</h3>
//     <h1>{stats.totalStock}</h1>
// </div>

// <div className="card orange">
//     <h3>⚠️ Low Stock</h3>
//     <h1>{stats.lowStock}</h1>
// </div>

// <div className="card red">
//     <h3>❌ Out Of Stock</h3>
//     <h1>{stats.outOfStock}</h1>
//   </div>

// <div className="card purple">
//   <h3>🛒 Orders</h3>
//   <h1>{stats.totalOrders}</h1>
// </div>
// <div className="card dark">
//     <h3>💰 Stock Value</h3>
//     <h1>₹{stats.stockValue}</h1>
// </div>
// </div>
// <div className="recent-products">
//      <h2>🛍️ Product Management</h2>

// <table>

//     <thead>
//         <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Status</th>
//             <th>Action</th>
//         </tr>
//     </thead>

//   <tbody>

//         {products.map((item) => (
//         <tr key={item.id}>

//         <td>{item.id}</td>
//         <td>{item.name}</td>
//         <td>{item.category}</td>
//         <td>₹{item.price}</td>
//         <td>{item.quantity}</td>
//         <td>{item.quantity === 0
//                   ? "❌ Out Stock"
//                   : item.quantity <= 5
//                   ? "⚠️ Low Stock"
//                   : "✅ In Stock"}
//         </td>

//         <td>
//           <button
//               className="add-btn"
//               onClick={() => addStock(item.id)}
//           >
//               ➕ Add
//           </button>

//           <button
//               className="remove-btn"
//               onClick={() => removeStock(item.id)}
//           >
//               ➖ Remove
//           </button>

//                 <Link to={`/products/${item.id}`}>
//                   <button className="view-btn">
//                     👁️ View
//                   </button>
//                 </Link>

//         <button
//             className="order-btn"
//             disabled={item.quantity === 0}
//             onClick={() => orderProduct(item)}
//             >🛒 Order
//         </button>
//         </td>
//         </tr>))}

//         </tbody>

//       </table>

//     </div>

//   </div>
// );

// }
// export default Dashboard;
import "./Dashboard.css";

function Dashboard({ products, orders }) {

  // calculations
  let totalValue = 0;
  let lowStock = 0;
  let outStock = 0;

  for(let i=0; i<products.length; i++){
    totalValue += products[i].price * products[i].quantity;
    if(products[i].quantity === 0) outStock++;
    else if(products[i].quantity <= 5) lowStock++;
  }

  let revenue = 0;
  for(let i=0; i<orders.length; i++){
    revenue += orders[i].total;
  }

  return (
    <div className="dash">
      <h1>📊 Dashboard</h1>
      <p>Inventory Overview</p>

      <div className="cards">
        <div className="box blue">
          <div className="icon">💰</div>
          <div>
            <h4>Total Stock Value</h4>
            <h2>₹{totalValue.toLocaleString()}</h2>
          </div>
        </div>

        <div className="box green">
          <div className="icon">📦</div>
          <div>
            <h4>Total Products</h4>
            <h2>{products.length}</h2>
          </div>
        </div>

        <div className="box orange">
          <div className="icon">⚠️</div>
          <div>
            <h4>Low Stock</h4>
            <h2>{lowStock}</h2>
          </div>
        </div>

        <div className="box red">
          <div className="icon">❌</div>
          <div>
            <h4>Out of Stock</h4>
            <h2>{outStock}</h2>
          </div>
        </div>

        <div className="box purple">
          <div className="icon">🛒</div>
          <div>
            <h4>Total Orders</h4>
            <h2>{orders.length}</h2>
          </div>
        </div>

        <div className="box teal">
          <div className="icon">💵</div>
          <div>
            <h4>Total Revenue</h4>
            <h2>₹{revenue.toLocaleString()}</h2>
          </div>
        </div>
      </div>

    </div>
  );
}
export default Dashboard;


































































































































































































































































































































































































































































































































    