// import "../Products/Product.css";

// function StockOut({ products, setProducts }) {

//   const stockOutProduct = (id) => {
//     const selectedProduct = products.find(
//       (product) => product.id === id
//     );

//     if (selectedProduct.quantity === 0) {
//       alert("❌ Stock is not available!");
//       return;
//     }

//     const updatedProducts = products.map((product) => {
//       if (product.id === id) {
//         return {
//           ...product,
//           quantity: product.quantity - 1,
//         };
//       }

//       return product;
//     });

//     setProducts(updatedProducts);

//     alert("✅ Stock issued successfully!");
//   };


//   return (
//     <div className="products">

//       <h2>📤 Stock Out</h2>

//       <div className="top-bar">
//         <input
//           type="text"
//           placeholder="🔍 Search Product..."
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
//             <th>Status</th>
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
//                   {
//                     item.quantity === 0 ? (
//                       <span className="out-stock">
//                         Out of Stock
//                       </span>
//                     ) : item.quantity < 5 ? (
//                       <span className="low-stock">
//                         Low Stock
//                       </span>
//                     ) : (
//                       <span className="in-stock">
//                         In Stock
//                       </span>
//                     )
//                   }
//                 </td>


//                 <td>

//                   <button
//                     className="btn-remove"
//                     disabled={item.quantity === 0}
//                     onClick={() => stockOutProduct(item.id)}
//                   >
//                     - Issue Stock
//                   </button>

//                 </td>

//               </tr>

//             ))

//           ) : (

//             <tr>
//               <td colSpan="7">
//                 No Products Available
//               </td>
//             </tr>

//           )}

//         </tbody>

//       </table>

//     </div>
//   );
// }

// export default StockOut;
import { useState } from "react";
import "../Products/Product.css";

function StockOut({ products, setProducts }) {
  const [search, setSearch] = useState("");

  const stockOutProduct = (id) => {
    const product = products.find((item) => item.id === id);

    if (product.quantity <= 0) {
      alert("Stock is not available");
      return;
    }

    setProducts(
      products.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
    );

    alert("Stock removed successfully");
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products">
      <h2>📤 Stock Out</h2>

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
            <th>Product Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Current Stock</th>
            <th>Status</th>
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
                  {item.quantity === 0 ? (
                    <span className="out-stock">❌ Out of Stock</span>
                  ) : item.quantity <= 5 ? (
                    <span className="low-stock">⚠️ Low Stock</span>
                  ) : (
                    <span className="in-stock">✅ In Stock</span>
                  )}
                </td>

                <td>
                  <button
                    className="btn-remove"
                    disabled={item.quantity === 0}
                    onClick={() => stockOutProduct(item.id)}
                  >
                    Remove stock
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                Stock removed succesfully
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StockOut;