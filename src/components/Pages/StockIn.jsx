// import "./StockIn.css";

// function StockIn({ products, setProducts }) {

//   const stockInProduct = (id) => {
//     const updatedProducts = products.map((product) => {
//       if (product.id === id) {
//         return {
//           ...product,
//           quantity: product.quantity + 1,
//         };
//       }
//       return product;
//     });

//     setProducts(updatedProducts);
//     alert("Stock added successfully!");
//   };

//   return (
//     <div className="products">
//       <h2>Stock In</h2>

//       <div className="top-bar">
//         <input
//           type="text"
//           placeholder="Search Product..."
//           className="search"
//         />
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Product Name</th>
//             <th>Category</th>
//             <th>Price</th>
//             <th>Current Stock</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {products.length > 0 ? (
//             products.map((item) => (
//               <tr key={item.id}>
//                 <td>{item.id}</td>
//                 <td>{item.name}</td>
//                 <td>{item.category}</td>
//                 <td>₹{item.price}</td>
//                 <td>{item.quantity}</td>
//                 <td>
//         <button
//             className="btn-add"
//             onClick={() => stockInProduct(item.id)}
//         >  + Add Stock
//         </button>
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
//                 }}
//               >
//                 No Products Available
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default StockIn;
import { useState } from "react";
import "./StockIn.css";

function StockIn({ products, setProducts }) {
  const [search, setSearch] = useState("");

  const stockInProduct = (id) => {
    const qty = Number(prompt("Enter Stock Quantity"));

    if (!qty || qty <= 0) {
      alert("Enter valid quantity");
      return;
    }

    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + qty,
            }
          : product
      )
    );

    alert("Stock Added Successfully");
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products">
      <h2>📥 Stock In</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="🔍 Search Product..."
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Current Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    className="btn-add"
                    onClick={() => stockInProduct(item.id)}
                  >
                     Add Stock
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                No Products Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockIn;