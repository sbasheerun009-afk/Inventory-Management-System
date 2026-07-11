// import "./Product.css"; 
// function Suppliers() {
//   const suppliers = [
//     {
//       id: 1,
//       name: "Ramesh Electronics",
//       contact: "9876543210",
//       email: "ramesh@gmail.com",
//       address: "Vijayawada, AP",
//       products: "Laptop, Mouse, Keyboard"
//     },
//     {
//       id: 2,
//       name: "Bag World",
//       contact: "9123456780",
//       email: "bagworld@gmail.com",
//       address: "Hyderabad, TS",
//       products: "School Bag, Office Bag"
//     },
//     {
//       id: 3,
//       name: "Furniture Hub",
//       contact: "9988776655",
//       email: "furniture@gmail.com",
//       address: "Guntur, AP",
//       products: "Chair, Table"
//     },
//   ];

//   return (
//     <div className="products"> {/* same class use chesam */}
//       <h2>Suppliers</h2>

//       <div className="top-bar">
//         <button className="add-btn">+ Add Supplier</button>
//         <input
//           type="text"
//           placeholder="Search Supplier..."
//           className="search"
//         />
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Supplier Name</th>
//             <th>Contact</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Products</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {suppliers.map((item) => (
//             <tr key={item.id}>
//               <td>{item.id}</td>
//               <td>{item.name}</td>
//               <td>{item.contact}</td>
//               <td>{item.email}</td>
//               <td>{item.address}</td>
//               <td>{item.products}</td>
//               <td>
//                 <button>Edit</button>
//                 <button>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Suppliers;

function Products() {
  const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 50000, quantity: 20, status: "In Stock" },
    { id: 2, name: "Mouse", category: "Electronics", price: 1000, quantity: 5, status: "Low Stock" },
    { id: 3, name: "Keyboard", category: "Electronics", price: 2000, quantity: 0, status: "Out of Stock" },
    { id: 4, name: "School Bag", category: "Bags", price: 1000, quantity: 50, status: "In Stock" },
  ];

  return (
    <div className="products">
      <h2>Products</h2>
      <div className="top-bar">
        <button className="add-btn">+ Add Product</button>
        <input type="text" placeholder="Search Product..." className="search" />
      </div>
      <table>
        <thead>
          <tr><th>ID</th><th>Product Name</th><th>Category</th><th>Price</th><th>Quantity</th><th>Status</th><th>Action</th></tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>₹{item.price}</td>
              <td>{item.quantity}</td>
              <td style={{ color: item.status === "In Stock" ? "#22c55e" : item.status === "Low Stock" ? "#f97316" : "#ef4444" }}>
                {item.status}
              </td>
              <td><button>Edit</button><button>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Products;