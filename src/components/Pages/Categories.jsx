// import "./Categories.css";

// function Categories() {
//   return (
//     <div className="categories">
//       <h2>Categories</h2>

//       <button className="add-btn">+ Add Category</button>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Category Name</th>
//             <th>Description</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>Electronics</td>
//             <td>Electronic Devices</td>
//             <td>
//               <button>Edit</button>
//               <button>Delete</button>
//             </td>
//           </tr>

//           <tr>
//             <td>2</td>
//             <td>Stationery</td>
//             <td>Office Items</td>
//             <td>
//               <button>Edit</button>
//               <button>Delete</button>
//             </td>
//           </tr>

//           <tr>
//             <td>3</td>
//             <td>Bags</td>
//             <td>School Bags</td>
//             <td>
//               <button>Edit</button>
//               <button>Delete</button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Categories;
// import "./Orders/Orders.css";

// function Orders({ orders, setOrders }) {

//   const deleteOrder = (id) => {
//     const updatedOrders = orders.filter((order) => order.id !== id);
//     setOrders(updatedOrders);
//   };

//   return (
//     <div className="orders">
//       <h2>Orders</h2>

//       <div className="top-bar">
//         <input
//           type="text"
//           placeholder="Search Order..."
//           className="search"
//         />
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Product</th>
//             <th>Category</th>
//             <th>Quantity</th>
//             <th>Total Price</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {orders.length > 0 ? (
//             orders.map((order) => (
//               <tr key={order.id}>
//                 <td>{order.id}</td>
//                 <td>{order.name}</td>
//                 <td>{order.category}</td>
//                 <td>{order.qty}</td>
//                 <td>₹{order.price * order.qty}</td>
//                 <td>
//                   <button
//                     className="btn-delete"
//                     onClick={() => deleteOrder(order.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td
//                 colSpan="6"
//                 style={{
//                   textAlign: "center",
//                   padding: "20px",
//                   fontWeight: "bold",
//                   color: "#777",
//                 }}
//               >
//                 📦 No Orders Available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Orders;
import "./Orders/Orders.css";

function Orders({ orders, setOrders }) {

  const deleteOrder = (id) => {
    const updatedOrders = orders.filter((order) => order.id !== id);
    setOrders(updatedOrders);
  };

  return (
    <div className="orders">
      <h2>📦 Orders</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="🔍 Search Order..."
          className="search"
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.category}</td>
                <td>{order.qty}</td>
                <td>₹{order.price * order.qty}</td>
                <td>
                  <button
                    className="btn-delete"
                    onClick={() => deleteOrder(order.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  fontWeight: "bold",
                  color: "#777",
                }}
              >
                📦 No Orders Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;