
// import "./Dashboard.css";
// import { useState } from "react"; // useEffect teesesaam

// function Dashboard() {
//   const [products, setProducts] = useState([
//     { id: 1, name: "Laptop", category: "Electronics", quantity: 0, price: 120000, buyQty: 0 },
//     { id: 2, name: "Mouse", category: "Electronics", quantity: 0, price: 1000, buyQty: 0 },
//     { id: 3, name: "Keyboard", category: "Electronics", quantity: 0, price: 1200, buyQty: 0 },
//     { id: 4, name: "Refrigerator", category: "Electronics", quantity: 0, price: 30000, buyQty: 0 },
//     { id: 5, name: "School Bag", category: "Bags", quantity: 0, price: 1000, buyQty: 0 },
//     { id: 6, name: "Notebook", category: "Stationery", quantity: 0, price: 50, buyQty: 0 },
//     { id: 7, name: "Pen", category: "Stationery", quantity: 0, price: 50, buyQty: 0 },
//     { id: 8, name: "USB Cable", category: "Accessories", quantity: 0, price: 200, buyQty: 0 },
//     { id: 9, name: "Water Bottle", category: "Accessories", quantity: 0, price: 150, buyQty: 0 },
//     { id: 10, name: "Monitor", category: "Electronics", quantity: 0, price: 10000, buyQty: 0 },
//   ]);

//   const [orders, setOrders] = useState([]); // localStorage load teesesaam

//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");


//   const addProduct = (index) => {
//     const product = [...products];
//     product[index].quantity++;
//     product[index].buyQty++;
//     setProducts(product);
//   };

//   const removeProduct = (index) => {
//     const product = [...products];
//     if (product[index].quantity > 0) {
//       product[index].quantity--;
//       if (product[index].buyQty > 0) {
//         product[index].buyQty--;
//       }
//     } else {
//       alert("Stock is not available");
//     }
//     setProducts(product);
//   };

//   const orderProduct = (index) => {
//     if (products[index].quantity > 0) {
//       const newOrder = {
//         id: Date.now(),
//         name: products[index].name,
//         category: products[index].category,
//         price: products[index].price,
//         qty: products[index].buyQty || 1,
//       };
//       setOrders([...orders, newOrder]);
//       const temp = [...products];
//       temp[index].quantity = temp[index].quantity - (temp[index].buyQty || 1);
//       temp[index].buyQty = 0;
//       setProducts(temp);

//       alert(`${products[index].name} ordered successfully!`);
//     } else {
//       alert("Please add product. Stock is not available.");
//     }
//   };

//   const deleteOrder = (id) => {
//     setOrders(orders.filter(order => order.id!== id));
//   }

//   const filteredProducts = products.filter(p =>
//     p.name.toLowerCase().includes(search.toLowerCase()) &&
//     (category === "All" || p.category === category)
//   );

//   const totalProducts = products.length;
//   const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
//   const totalOrderValue = orders.reduce((sum, o) => sum + o.price * o.qty, 0);

//   const getStatusClass = (qty) => {
//     if(qty === 0) return 'out-stock';
//     if(qty < 5) return 'low-stock';
//     return 'in-stock';
//   }

//   return (
//     <div className="dashboard-container">
//       <h2>Inventory Management Dashboard</h2>

//       <div className="cards">
//         <div className="card"><h3>🗃️Total Products</h3><p>{totalProducts}</p></div>
//         <div className="card"><h3>📦Total Stock</h3><p>{totalStock}</p></div>
//         <div className="card"><h3>💵Total Order Value</h3><p>₹{totalOrderValue}</p></div>
//       </div>

//       <div className="filters">
//         <input
//           type="text"
//           placeholder="Search Product..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <select value={category} onChange={(e) => setCategory(e.target.value)}>
//           <option value="All">All Categories</option>
//           <option value="Electronics">Electronics</option>
//           <option value="Bags">Bags</option>
//           <option value="Stationery">Stationery</option>
//           <option value="Accessories">Accessories</option>
//         </select>
//       </div>

//       <div className="table-wrapper">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Product Name</th>
//               <th>Category</th>
//               <th>Status</th>
//               <th>Price</th>
//               <th>Add</th>
//               <th>Remove</th>
//               <th>Buy Qty</th>
//               <th>Order</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((product, index) => (
//               <tr key={product.id}>
//                 <td>{product.id}</td>
//                 <td>{product.name}</td>
//                 <td>{product.category}</td>
//                 <td className={getStatusClass(product.quantity)}>{product.quantity}</td>
//                 <td>₹{product.price}</td>
//                 <td><button className="btn-add" onClick={() => addProduct(index)}>+</button></td>
//                 <td><button className="btn-remove" onClick={() => removeProduct(index)}>-</button></td>
//                 <td>{product.buyQty}</td>
//                 <td>
//                   <button
//                     className="btn-order"
//                     onClick={() => orderProduct(index)}
//                     disabled={product.quantity === 0}
//                   >
//                     Order
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {orders.length > 0 && (
//         <>
//           <h2 className="orders-title">Orders</h2>
//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Category</th>
//                   <th>Qty</th>
//                   <th>Price</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orders.map((order) => (
//                   <tr key={order.id}>
//                     <td>{order.name}</td>
//                     <td>{order.category}</td>
//                     <td>{order.qty}</td>
//                     <td>₹{order.price * order.qty}</td>
//                     <td><button className="btn-delete" onClick={() => deleteOrder(order.id)}>Delete</button></td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
import "./Dashboard.css";
import { useState } from "react";

function Dashboard({ products, setProducts, orders, setOrders }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const addProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity++;
    updatedProducts[index].buyQty++;
    setProducts(updatedProducts);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...products];
    if (updatedProducts[index].quantity > 0) {
      updatedProducts[index].quantity--;
      if (updatedProducts[index].buyQty > 0) {
        updatedProducts[index].buyQty--;
      }
    } else {
      alert("Stock is not available");
    }
    setProducts(updatedProducts);
  };

  const orderProduct = (index) => {
    if (products[index].quantity > 0) {
      const newOrder = {
        id: Date.now(),
        name: products[index].name,
        category: products[index].category,
        price: products[index].price,
        qty: products[index].buyQty || 1,
      };
      setOrders([...orders, newOrder]);

      const updatedProducts = [...products];
      updatedProducts[index].quantity = updatedProducts[index].quantity - (updatedProducts[index].buyQty || 1);
      updatedProducts[index].buyQty = 0;
      setProducts(updatedProducts);

      alert(`${products[index].name} ordered successfully!`);
    } else {
      alert("Please add product. Stock is not available.");
    }
  };

  const deleteOrder = (id) => {
    setOrders(orders.filter(order => order.id!== id));
  }

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || p.category === category)
  );

  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.quantity, 0);
  const totalOrderValue = orders.reduce((sum, o) => sum + o.price * o.qty, 0);

  const getStatusClass = (qty) => {
    if(qty === 0) return 'out-stock';
    if(qty < 5) return 'low-stock';
    return 'in-stock';
  }

  return (
    <div className="dashboard-container">
      <h2>Inventory Management Dashboard</h2>

      <div className="cards">
        <div className="card"><h3>🗃️ Total Products</h3><p>{totalProducts}</p></div>
        <div className="card"><h3>📦 Total Stock</h3><p>{totalStock}</p></div>
        <div className="card"><h3>💵 Total Order Value</h3><p>₹{totalOrderValue}</p></div>
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Bags">Bags</option>
          <option value="Stationery">Stationery</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Status</th>
              <th>Price</th>
              <th>Add</th>
              <th>Remove</th>
              <th>Buy Qty</th>
              <th>Order</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0? filteredProducts.map((product) => {
              const index = products.findIndex(p => p.id === product.id); // index correct ga ravali
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td className={getStatusClass(product.quantity)}>{product.quantity}</td>
                  <td>₹{product.price}</td>
                  <td><button className="btn-add" onClick={() => addProduct(index)}>+</button></td>
                  <td><button className="btn-remove" onClick={() => removeProduct(index)}>-</button></td>
                  <td>{product.buyQty}</td>
                  <td>
                    <button
                      className="btn-order"
                      onClick={() => orderProduct(index)}
                      disabled={product.quantity === 0}
                    >
                      Order
                    </button>
                  </td>
                </tr>
              )
            }) : <tr><td colSpan="9" style={{textAlign: "center"}}>No Products Found</td></tr>}
          </tbody>
        </table>
      </div>

      {orders.length > 0 && (
        <>
          <h2 className="orders-title">Orders</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.name}</td>
                    <td>{order.category}</td>
                    <td>{order.qty}</td>
                    <td>₹{order.price * order.qty}</td>
                    <td><button className="btn-delete" onClick={() => deleteOrder(order.id)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;























































































































































































































































































































































































































































































































































































































































































































    