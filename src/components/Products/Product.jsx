// import { useState, useEffect } from "react";
// import {Link} from "react-router-dom";
// import "./Product.css";
// function Products({ products, setProducts, orders, setOrders }) {
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [orderQty, setOrderQty] = useState({});
//   const [newProduct, setNewProduct] = useState({

//     name:"",
//     category:"",
//     price:"",
//     quantity:""

//   });
// useEffect(()=>{

//     document.title =
//     "Products | Inventory Management System";

//   },[]);
//  // ADD PRODUCT
// const addProduct = ()=>{
// if(
//     !newProduct.name ||
//     !newProduct.category ||
//     !newProduct.price ||
//     !newProduct.quantity
// ){
//   alert("Please fill all details");
//   return;
// }
// const product={

//       id:Date.now(),
//       name:newProduct.name,
//       category:newProduct.category,
//       price:Number(newProduct.price),
//       quantity:Number(newProduct.quantity)

//     };
// setProducts([...products,product]);
// setNewProduct({
//       name:"",
//       category:"",
//       price:"",
//       quantity:""

//     });
// setShowForm(false);
//  alert("✅ Product Added Successfully");
// };
//   // DELETE PRODUCT

// const deleteProduct = (id) => {
// setProducts(products.filter(item => item.id !== id)

//   );

// };
//   // ORDER PRODUCT
// const orderProduct=(product)=>{
// const qty = Number(orderQty[product.id]);
// if(!qty || qty<=0){
//   alert("Enter Order Quantity");
// return;
// }
// if(product.quantity < qty){

//       alert("❌ Stock Not Available");
// return;
//     }
// const newOrder={
//       id:Date.now(),
//       name:product.name,
//       category:product.category,
//       price:product.price,
//       quantity:qty,
//       total:product.price * qty,
//       status:"Completed"
//     };
// setOrders([...orders,newOrder]);
// const updatedProducts = products.map(item=>{
// if(item.id === product.id){
// return{...item, 
//       quantity:item.quantity - qty };
//     }
// return item;
// });
// setProducts(updatedProducts);
// setOrderQty({ ...orderQty,[product.id]:""});
// alert("🛒 Order Placed Successfully");
//  };
// const getStatus=(qty)=>{
// if(qty===0)
// return "❌ Out Of Stock";
// if(qty<=5)
// return "⚠️ Low Stock";
// return "✅ In Stock";
// };
// const filteredProducts = products.filter(item=>

//     item.name
//     .toLowerCase()
//     .includes(search.toLowerCase()));

// return(

// <div className="products">


// <h2>
// 📦 Products Management
// </h2>
// <div className="top-bar">
// <button className="add-btn"
// onClick={()=>setShowForm(!showForm)}

// >

// ➕ Add Product

// </button>
// <input
// type="text"placeholder="🔍 Search Product"
// value={search}
// className="search"
// onChange={(e)=>setSearch(e.target.value)}
// />
// </div>
// {
// showForm &&

// <div className="product-form">


// <input
// placeholder="Product Name"
// value={newProduct.name}
// onChange={(e)=>
// setNewProduct({
// ...newProduct,
// name:e.target.value
// })
// }
// />



// <input
// placeholder="Category"
// value={newProduct.category}
// onChange={(e)=>
// setNewProduct({
// ...newProduct,
// category:e.target.value
// })
// }
// />




// <input
// placeholder="Price"
// value={newProduct.price}
// onChange={(e)=>
// setNewProduct({
// ...newProduct,
// price:e.target.value
// })
// }
// />




// <input
// placeholder="Quantity"
// value={newProduct.quantity}
// onChange={(e)=>
// setNewProduct({
// ...newProduct,
// quantity:e.target.value
// })
// }
// /><button
// className="save-btn"
// onClick={addProduct}
// >

// Save Product

// </button>
// </div>

// }
// <table>
// <thead>
//   <tr>

// <th>ID</th>
// <th>Name</th>
// <th>Category</th>
// <th>Price</th>
// <th>Quantity</th>
// <th>Status</th>
// <th>Order Qty</th>
// <th>Action</th>
// </tr>
// </thead>
// <tbody>
// {
// filteredProducts.map(item=>(
// <tr key={item.id}>
// <td>{item.id}</td>
// <td>{item.name}</td>
// <td>{item.category}</td>
// <td>₹{item.price}</td>
// <td>{item.quantity}</td>
// <td>{getStatus(item.quantity)}</td>
// <td>
// <input
// type="number"
// placeholder="Qty"
// value={orderQty[item.id] || ""}
// onChange={(e)=>
// setOrderQty({
// ...orderQty,
// [item.id]:e.target.value
// })
// }/>
// <br/>
// <button
// className="order-btn"
// onClick={()=>orderProduct(item)}
// >
// 🛒 Order
// </button>
// </td>
// <td>
// <button className="edit-btn">
// ✏️ Edit
// </button>
// <button
// className="delete-btn"
// onClick={()=>deleteProduct(item.id)}
// >
// 🗑 Delete
// </button>
// </td>
// </tr>
// ))
// }
// </tbody>
// </table>
// </div>
// );}
// export default Products;
// import { useState, useEffect } from "react";
// import "./Product.css";

// function Products({ products, setProducts, orders, setOrders }) {
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [orderQty, setOrderQty] = useState({});
//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [highlightId, setHighlightId] = useState(null);

//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     category: "Electronics",
//     price: "",
//     quantity: "",
//   });

//   useEffect(() => {
//     document.title = "Products | Inventory Management System";
//   }, []);

//   // ADD OR UPDATE PRODUCT
//   const addProduct = () => {
//     if (
//       !newProduct.name ||
//       !newProduct.category ||
//       !newProduct.price ||
//       !newProduct.quantity
//     ) {
//       alert("Please fill all details");
//       return;
//     }

//     if (editMode) {
//       // UPDATE
//       const updatedProducts = products
//         .map((item) =>
//           item.id === editId
//             ? {
//                 ...item,
//                 name: newProduct.name,
//                 category: newProduct.category,
//                 price: Number(newProduct.price),
//                 quantity: Number(newProduct.quantity),
//               }
//             : item
//         )
//         .sort((a, b) => (a.id === editId ? -1 : 1)); // updated item top ki

//       setProducts(updatedProducts);
//       setHighlightId(editId); // highlight
//       setTimeout(() => setHighlightId(null), 2000);
//       alert("✅ Product Updated Successfully");
//       setEditMode(false);
//       setEditId(null);
//     } else {
//       // ADD
//       const product = {
//         id: Date.now(),
//         name: newProduct.name,
//         category: newProduct.category,
//         price: Number(newProduct.price),
//         quantity: Number(newProduct.quantity),
//       };
//       setProducts([product, ...products]); // new item top lo
//       alert("✅ Product Added Successfully");
//     }

//     setNewProduct({ name: "", category: "Electronics", price: "", quantity: "" });
//     setShowForm(false);
//   };

//   // EDIT BUTTON CLICK
//   const handleEdit = (item) => {
//     setEditMode(true);
//     setEditId(item.id);
//     setNewProduct({
//       name: item.name,
//       category: item.category,
//       price: item.price,
//       quantity: item.quantity,
//     });
//     setShowForm(true);
//   };

//   // DELETE PRODUCT
//   const deleteProduct = (id) => {
//     if (window.confirm("Are you sure to delete?")) {
//       setProducts(products.filter((item) => item.id !== id));
//     }
//   };

//   // ORDER PRODUCT
//   const orderProduct = (product) => {
//     const qty = Number(orderQty[product.id]);
//     if (!qty || qty <= 0) {
//       alert("Enter Order Quantity");
//       return;
//     }
//     if (product.quantity < qty) {
//       alert("❌ Stock Not Available");
//       return;
//     }
//     const newOrder = {
//       id: Date.now(),
//       name: product.name,
//       category: product.category,
//       price: product.price,
//       quantity: qty,
//       total: product.price * qty,
//       status: "Completed",
//     };
//     setOrders([...orders, newOrder]);
//     const updatedProducts = products.map((item) => {
//       if (item.id === product.id) {
//         return { ...item, quantity: item.quantity - qty };
//       }
//       return item;
//     });
//     setProducts(updatedProducts);
//     setOrderQty({ ...orderQty, [product.id]: "" });
//     alert("🛒 Order Placed Successfully");
//   };

//   const getStatus = (qty) => {
//     if (qty === 0) return "❌ Out Of Stock";
//     if (qty <= 5) return "⚠️ Low Stock";
//     return "✅ In Stock";
//   };

//   const filteredProducts = products.filter((item) =>
//     item.name.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="products">
//       <h2>📦 Products Management</h2>
//       <div className="top-bar">
//         <button
//           className="add-btn"
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditMode(false);
//             setNewProduct({ name: "", category: "Electronics", price: "", quantity: "" });
//           }}
//         >
//           ➕ Add Product
//         </button>
//         <input
//           type="text"
//           placeholder="🔍 Search Product"
//           value={search}
//           className="search"
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {showForm && (
//         <div className="product-form">
//           <h3>{editMode ? "Edit Product" : "Add New Product"}</h3>
//           <input
//             placeholder="Product Name"
//             value={newProduct.name}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, name: e.target.value })
//             }
//           />
//           <select
//             value={newProduct.category}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, category: e.target.value })
//             }
//           >
//             <option>Electronics</option>
//             <option>Bags</option>
//             <option>Stationery</option>
//             <option>Accessories</option>
//           </select>
//           <input
//             type="number"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, price: e.target.value })
//             }
//           />
//           <input
//             type="number"
//             placeholder="Quantity"
//             value={newProduct.quantity}
//             onChange={(e) =>
//               setNewProduct({ ...newProduct, quantity: e.target.value })
//             }
//           />
//           <div className="form-buttons">
//             <button className="save-btn" onClick={addProduct}>
//               {editMode ? "Update Product" : "Save Product"}
//             </button>
//             <button
//               className="cancel-btn"
//               onClick={() => {
//                 setShowForm(false);
//                 setEditMode(false);
//               }}
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="table-wrapper">
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Category</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Status</th>
//               <th>Order Qty</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.length > 0 ? (
//               filteredProducts.map((item) => (
//                 <tr
//                   key={item.id}
//                   className={highlightId === item.id ? "highlight-row" : ""}
//                 >
//                   <td>{item.id}</td>
//                   <td>{item.name}</td>
//                   <td>{item.category}</td>
//                   <td>₹{item.price}</td>
//                   <td>{item.quantity}</td>
//                   <td>{getStatus(item.quantity)}</td>
//                   <td>
//                     <input
//                       type="number"
//                       placeholder="Qty"
//                       value={orderQty[item.id] || ""}
//                       onChange={(e) =>
//                         setOrderQty({ ...orderQty, [item.id]: e.target.value })
//                       }
//                     />
//                     <br />
//                     <button
//                       className="order-btn"
//                       onClick={() => orderProduct(item)}
//                     >
//                       🛒 Order
//                     </button>
//                   </td>
//                   <td>
//                     <button
//                       className="edit-btn"
//                       onClick={() => handleEdit(item)}
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       className="delete-btn"
//                       onClick={() => deleteProduct(item.id)}
//                     >
//                       🗑 Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center" }}>
//                   No Products Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// export default Products;
import { useState, useEffect } from "react";
import "./Product.css";

function Products({ products, setProducts, categories }) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [supplierQty, setSupplierQty] = useState({});

  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    document.title = "Products | Inventory";
  }, []);

  const addProduct = () => {
    if (
      !newProduct.name.trim() ||
      !newProduct.category ||
      newProduct.price === "" ||
      newProduct.quantity === ""
    ) {
      alert("Please fill all details");
      return;
    }

    if (
      Number(newProduct.price) < 0 ||
      Number(newProduct.quantity) < 0
    ) {
      alert("Negative values not allowed");
      return;
    }

    if (editMode) {
      setProducts(
        products.map((p) =>
          p.id === editId
            ? {
                ...p,
                name: newProduct.name,
                category: newProduct.category,
                price: Number(newProduct.price),
                quantity: Number(newProduct.quantity),
              }
            : p
        )
      );

      alert("Product Updated Successfully");
      setEditMode(false);
      setEditId(null);
    } else {
      const nextId =
        products.length > 0
          ? Math.max(...products.map((p) => p.id)) + 1
          : 1;

      const product = {
        id: nextId,
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity),
      };

      setProducts([product, ...products]);
      alert("Product Added Successfully");
    }

    setNewProduct({
      name: "",
      category: "",
      price: "",
      quantity: "",
    });

    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditId(item.id);

    setNewProduct({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      quantity: item.quantity.toString(),
    });

    setShowForm(true);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleAddStock = (product) => {
    const qty = Number(supplierQty[product.id]);

    if (!qty || qty <= 0) {
      alert("Enter valid quantity");
      return;
    }

    setProducts(
      products.map((p) =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + qty }
          : p
      )
    );

    setSupplierQty({
      ...supplierQty,
      [product.id]: "",
    });

    alert("Stock Added Successfully");
  };

  const getStatus = (qty) => {
    if (qty <= 0) return "❌ Out Of Stock";
    if (qty <= 5) return "⚠️ Low Stock";
    return "✅ In Stock";
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );
return (
  <div className="products">
    <h2>📦 Inventory Management - Owner Panel</h2>

    <div className="top-bar">
      <button
        className="add-btn"
        onClick={() => {
          setShowForm(!showForm);
          setEditMode(false);
          setEditId(null);
          setNewProduct({
            name: "",
            category: "",
            price: "",
            quantity: "",
          });
        }}
      >
        ➕ Add Product
      </button>

      <input
        type="text"
        className="search"
        placeholder="🔍 Search Product"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {showForm && (
      <div className="product-form">
        <h3>{editMode ? "Edit Product" : "Add New Product"}</h3>

        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              name: e.target.value,
            })
          }
        />

        <select
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              category: e.target.value,
            })
          }
        >
          <option value="">Select Category</option>

          {categories.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              price: e.target.value,
            })
          }
        />

        <input
          type="number"
          min="0"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              quantity: e.target.value,
            })
          }
        />

        <div>
          <button
            className="save-btn"
            onClick={addProduct}
          >
            {editMode ? "Update" : "Save"}
          </button>

          <button
            className="cancel-btn"
            onClick={() => {
              setShowForm(false);
              setEditMode(false);
              setEditId(null);
              setNewProduct({
                name: "",
                category: "",
                price: "",
                quantity: "",
              });
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    )}

    <div className="table-box">
      <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Qty</th>
            <th>Status</th>
            <th>Add Stock</th>
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
                <td>{getStatus(item.quantity)}</td>

                <td>
                  <input
                    type="number"
                    min="1"
                    className="qty-input"
                    placeholder="Qty"
                    value={supplierQty[item.id] || ""}
                    onChange={(e) =>
                      setSupplierQty({
                        ...supplierQty,
                        [item.id]: e.target.value,
                      })
                    }
                  />

                  <button
                    className="supplier-btn"
                    onClick={() => handleAddStock(item)}
                  >
                    📦 Add
                  </button>
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(item)}
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteProduct(item.id)}
                  >
                    🗑 Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="8"
                style={{
                  textAlign: "center",
                  padding: "15px",
                }}
              >
                No Products Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);
}

export default Products;