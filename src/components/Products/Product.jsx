// // import { useEffect, useState } from "react";
// // import { Link } from "react-router-dom";
// // import "./Product.css";
// // import api from "../../api/api";

// // function Products({ products = [], setProducts, categories = [] }) {
// //   const [search, setSearch] = useState("");
// //   const [showForm, setShowForm] = useState(false);
// //   const [editMode, setEditMode] = useState(false);
// //   const [editId, setEditId] = useState(null);
// //   const [supplierQty, setSupplierQty] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(5);
// //   const [sort, setSort] = useState("createdAt");
// //   const [order, setOrder] = useState("desc");
// //   const [pagination, setPagination] = useState({});
// //   const [newProduct, setNewProduct] = useState({
// //     productname: "", category: "", price: "", quantity: "", supplier: ""
// //   });

// //   const getProductName = (product) =>
// //     product.productname || product.productName || product.name || "";

// //   const fetchProducts = async () => {
// //     try {
// //       setLoading(true);
// //       setError("");
// //       const response = await api.get("/products", {
// //         params: { search, page, limit, sort, order }
// //       });
// //       setProducts(response.data.products || []);
// //       setPagination(response.data.pagination || {});
// //     } catch (error) {
// //       console.log("Fetch Products Error:", error.response?.data || error.message);
// //       setError(error.response?.data?.message || "Failed to fetch products");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     document.title = "Products | Inventory";
// //     fetchProducts();
// //   }, [search, page, limit, sort, order]);

// //   const addProduct = async () => {
// //     if (
// //       !newProduct.productname.trim() ||
// //       !newProduct.category ||
// //       newProduct.price === "" ||
// //       newProduct.quantity === "" ||
// //       !newProduct.supplier.trim()
// //     ) {
// //       alert("Please fill all details");
// //       return;
// //     }

// //     if (Number(newProduct.price) < 0 || Number(newProduct.quantity) < 0) {
// //       alert("Negative values not allowed");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const productData = {
// //         productname: newProduct.productname.trim(),
// //         category: newProduct.category,
// //         price: Number(newProduct.price),
// //         quantity: Number(newProduct.quantity),
// //         supplier: newProduct.supplier.trim()
// //       };

// //       if (editMode) {
// //         await api.put(`/products/${editId}`, productData);
// //         alert("Product Updated Successfully");
// //       } else {
// //         await api.post("/products", productData);
// //         alert("Product Added Successfully");
// //       }

// //       resetForm();
// //       fetchProducts();
// //     } catch (error) {
// //       console.log("Product Add/Update Error:", error.response?.data || error.message);
// //       alert(error.response?.data?.message || "Something went wrong");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleEdit = (item) => {
// //     setEditMode(true);
// //     setEditId(item._id);
// //     setNewProduct({
// //       productname: getProductName(item),
// //       category: item.category || "",
// //       price: item.price ?? "",
// //       quantity: item.quantity ?? "",
// //       supplier: item.supplier || ""
// //     });
// //     setShowForm(true);
// //   };

// //   const deleteProduct = async (id) => {
// //     if (!window.confirm("Delete this product?")) return;

// //     try {
// //       setLoading(true);
// //       await api.delete(`/products/${id}`);
// //       alert("Product Deleted Successfully");
// //       fetchProducts();
// //     } catch (error) {
// //       console.log("Delete Error:", error.response?.data || error.message);
// //       alert("Failed to delete product");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleAddStock = async (product) => {
// //     const qty = Number(supplierQty[product._id]);

// //     if (!qty || qty <= 0) {
// //       alert("Enter valid quantity");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       await api.put(`/products/${product._id}`, {
// //         productname: getProductName(product),
// //         category: product.category,
// //         price: product.price,
// //         quantity: Number(product.quantity) + qty,
// //         supplier: product.supplier || ""
// //       });

// //       setSupplierQty({ ...supplierQty, [product._id]: "" });
// //       alert("Stock Added Successfully");
// //       fetchProducts();
// //     } catch (error) {
// //       console.log("Add Stock Error:", error.response?.data || error.message);
// //       alert("Failed to add stock");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getStatus = (qty) => {
// //     if (qty <= 0) return "❌ Out Of Stock";
// //     if (qty <= 5) return "⚠️ Low Stock";
// //     return "✅ In Stock";
// //   };

// //   const resetForm = () => {
// //     setNewProduct({
// //       productname: "", category: "", price: "", quantity: "", supplier: ""
// //     });
// //     setShowForm(false);
// //     setEditMode(false);
// //     setEditId(null);
// //   };

// //   const handleSearch = (e) => {
// //     setSearch(e.target.value);
// //     setPage(1);
// //   };

// //   const handleSort = (field) => {
// //     if (sort === field) setOrder(order === "asc" ? "desc" : "asc");
// //     else {
// //       setSort(field);
// //       setOrder("asc");
// //     }
// //     setPage(1);
// //   };

// //   return (
// //     <div className="products">
// //       <h2>📦 Inventory Management - Owner Panel</h2>

// //       <div className="top-bar">
// //         <button
// //           className="add-btn"
// //           disabled={loading}
// //           onClick={() => {
// //             setShowForm(!showForm);
// //             setEditMode(false);
// //             setEditId(null);
// //             setNewProduct({
// //               productname: "", category: "", price: "", quantity: "", supplier: ""
// //             });
// //           }}
// //         >
// //           ➕ Add Product
// //         </button>

// //         <input
// //           type="text"
// //           className="search"
// //           placeholder="🔍 Search Product"
// //           value={search}
// //           onChange={handleSearch}
// //         />
// //       </div>

// //       {error && <div className="error">❌ {error}</div>}

// //       {showForm && (
// //         <div className="product-form">
// //           <h3>{editMode ? "Edit Product" : "Add New Product"}</h3>

// //           <input
// //             type="text"
// //             placeholder="Product Name"
// //             value={newProduct.productname}
// //             onChange={(e) => setNewProduct({
// //               ...newProduct, productname: e.target.value
// //             })}
// //           />

// //           <select
// //             value={newProduct.category}
// //             onChange={(e) => setNewProduct({
// //               ...newProduct, category: e.target.value
// //             })}
// //           >
// //             <option value="">Select Category</option>
// //             {categories.map((item, index) => (
// //               <option key={item._id || index} value={item.categoryName}>
// //                 {item.categoryName}
// //               </option>
// //             ))}
// //           </select>

// //           <input
// //             type="number"
// //             min="0"
// //             placeholder="Price"
// //             value={newProduct.price}
// //             onChange={(e) => setNewProduct({
// //               ...newProduct, price: e.target.value
// //             })}
// //           />

// //           <input
// //             type="number"
// //             min="0"
// //             placeholder="Quantity"
// //             value={newProduct.quantity}
// //             onChange={(e) => setNewProduct({
// //               ...newProduct, quantity: e.target.value
// //             })}
// //           />

// //           <input
// //             type="text"
// //             placeholder="Supplier"
// //             value={newProduct.supplier}
// //             onChange={(e) => setNewProduct({
// //               ...newProduct, supplier: e.target.value
// //             })}
// //           />

// //           <div>
// //             <button
// //               className="save-btn"
// //               onClick={addProduct}
// //               disabled={loading}
// //             >
// //               {loading ? "Saving..." : editMode ? "Update" : "Save"}
// //             </button>

// //             <button
// //               className="cancel-btn"
// //               onClick={resetForm}
// //               disabled={loading}
// //             >
// //               Cancel
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       <div className="table-box">
// //         <table>
// //           <thead>
// //             <tr>
// //               <th>S.No</th>
// //               {["productname", "category", "price", "quantity"].map((field) => (
// //                 <th key={field} onClick={() => handleSort(field)} style={{ cursor: "pointer" }}>
// //                   {field === "productname" ? "Product Name" :
// //                    field === "quantity" ? "Stock Qty" :
// //                    field.charAt(0).toUpperCase() + field.slice(1)}
// //                   {sort === field && (order === "asc" ? " ↑" : " ↓")}
// //                 </th>
// //               ))}
// //               <th>Status</th>
// //               <th>Add Stock</th>
// //               <th>Action</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {loading && products.length === 0 ? (
// //               <tr>
// //                 <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
// //                   ⏳ Loading Products...
// //                 </td>
// //               </tr>
// //             ) : products.length === 0 ? (
// //               <tr>
// //                 <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
// //                   📦 No Products Found
// //                 </td>
// //               </tr>
// //             ) : (
// //               products.map((item, index) => (
// //                 <tr key={item._id}>
// //                   <td>
// //                     {(pagination.currentPage - 1) * pagination.recordsPerPage + index + 1}
// //                   </td>
// //                   <td>{getProductName(item)}</td>
// //                   <td>{item.category}</td>
// //                   <td>₹{item.price}</td>
// //                   <td>{item.quantity}</td>
// //                   <td>{getStatus(item.quantity)}</td>

// //                   <td>
// //                     <input
// //                       type="number"
// //                       min="1"
// //                       className="qty-input"
// //                       placeholder="Qty"
// //                       value={supplierQty[item._id] || ""}
// //                       onChange={(e) => setSupplierQty({
// //                         ...supplierQty, [item._id]: e.target.value
// //                       })}
// //                       disabled={loading}
// //                     />
// //                     <button
// //                       className="supplier-btn"
// //                       onClick={() => handleAddStock(item)}
// //                       disabled={loading}
// //                     >
// //                       📦 Add
// //                     </button>
// //                   </td>

// //                   <td>
// //                     <Link to={`/products/${item._id}`}>
// //                       <button className="view-btn" disabled={loading}>👁️ View</button>
// //                     </Link>

// //                     <Link to={`/products/edit/${item._id}`}>
// //                       <button className="edit-btn" disabled={loading}>✏️ Edit</button>
// //                     </Link>

// //                     <button
// //                       className="delete-btn"
// //                       onClick={() => deleteProduct(item._id)}
// //                       disabled={loading}
// //                     >
// //                       🗑 Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))
// //             )}
// //           </tbody>
// //         </table>
// //       </div>

// //       {pagination.totalPages > 0 && (
// //         <div className="pagination">
// //           <button
// //             disabled={!pagination.hasPreviousPage || loading}
// //             onClick={() => setPage(page - 1)}
// //           >
// //             ⬅ Previous
// //           </button>

// //           <span>
// //             Page {pagination.currentPage} of {pagination.totalPages}
// //           </span>

// //           <button
// //             disabled={!pagination.hasNextPage || loading}
// //             onClick={() => setPage(page + 1)}
// //           >
// //             Next ➡
// //           </button>

// //           <select
// //             value={limit}
// //             onChange={(e) => {
// //               setLimit(Number(e.target.value));
// //               setPage(1);
// //             }}
// //           >
// //             <option value="5">5</option>
// //             <option value="10">10</option>
// //             <option value="20">20</option>
// //           </select>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default Products;
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Product.css";
// import api from "../../api/api";

// function Products({
//   products = [],
//   setProducts,
//   categories = [],
// }) {
//   const [search, setSearch] = useState("");
//   const [showForm, setShowForm] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [supplierQty, setSupplierQty] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(5);

//   const [sort, setSort] = useState("createdAt");
//   const [order, setOrder] = useState("desc");

//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     recordsPerPage: 5,
//     totalPages: 0,
//     hasPreviousPage: false,
//     hasNextPage: false,
//   });

//   const [newProduct, setNewProduct] = useState({
//     productname: "",
//     category: "",
//     price: "",
//     quantity: "",
//     supplier: "",
//   });
//   const getProductName = (product) => {
//     return (
//       product?.productname ||
//       product?.productName ||
//       product?.name ||
//       "Unnamed Product"
//     );
//   };
//   const getCategoryName = (category) => {
//     return (
//       category?.categoryName ||
//       category?.categoryname ||
//       category?.name ||
//       ""
//     );
//   };
//   const resetForm = () => {
//     setNewProduct({
//       productname: "",
//       category: "",
//       price: "",
//       quantity: "",
//       supplier: "",
//     });

//     setShowForm(false);
//     setEditMode(false);
//     setEditId(null);
//   };
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await api.get("/products", {
//         params: {
//           search,
//           page,
//           limit,
//           sort,
//           order,
//         },
//       });

//       console.log("Products API Response:", response.data);

//       const data = response.data;

//       // Handle different backend response formats
//       if (Array.isArray(data)) {
//         setProducts(data);
//         setPagination({
//           currentPage: page,
//           recordsPerPage: limit,
//           totalPages: 1,
//           hasPreviousPage: page > 1,
//           hasNextPage: false,
//         });
//       } else {
//         setProducts(
//           Array.isArray(data?.products)
//             ? data.products
//             : Array.isArray(data?.data)
//             ? data.data
//             : []
//         );

//         const backendPagination = data?.pagination || {};

//         setPagination({
//           currentPage:
//             Number(backendPagination.currentPage) || page,

//           recordsPerPage:
//             Number(backendPagination.recordsPerPage) || limit,

//           totalPages:
//             Number(backendPagination.totalPages) || 0,

//           hasPreviousPage:
//             Boolean(backendPagination.hasPreviousPage),

//           hasNextPage:
//             Boolean(backendPagination.hasNextPage),
//         });
//       }
//     } catch (error) {
//       console.log(
//         "Fetch Products Error:",
//         error.response?.data || error.message
//       );

//       setError(
//         error.response?.data?.message ||
//           "Failed to fetch products"
//       );

//       setProducts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===============================
//   // FETCH PRODUCTS WHEN FILTER CHANGES
//   // ===============================
//   useEffect(() => {
//     document.title = "Products | Inventory Management System";

//     fetchProducts();
//   }, [search, page, limit, sort, order]);

//   // ===============================
//   // ADD / UPDATE PRODUCT
//   // ===============================
//   const addProduct = async () => {
//     // Validation
//     if (!newProduct.productname.trim()) {
//       alert("Please enter product name");
//       return;
//     }

//     if (!newProduct.category) {
//       alert("Please select a category");
//       return;
//     }

//     if (
//       newProduct.price === "" ||
//       newProduct.price === null
//     ) {
//       alert("Please enter price");
//       return;
//     }

//     if (
//       newProduct.quantity === "" ||
//       newProduct.quantity === null
//     ) {
//       alert("Please enter quantity");
//       return;
//     }

//     if (!newProduct.supplier.trim()) {
//       alert("Please enter supplier");
//       return;
//     }

//     const price = Number(newProduct.price);
//     const quantity = Number(newProduct.quantity);

//     if (Number.isNaN(price) || price < 0) {
//       alert("Please enter a valid price");
//       return;
//     }

//     if (Number.isNaN(quantity) || quantity < 0) {
//       alert("Please enter a valid quantity");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError("");

//       const productData = {
//         productName: newProduct.productName.trim(),
//         category: newProduct.category.trim(),
//         price,
//         quantity,
//         supplier: newProduct.supplier.trim(),
//       };

//       console.log(
//         "Product Data Sending To Backend:",
//         productData
//       );

//       if (editMode && editId) {
//         // UPDATE
//         const response = await api.put(
//           `/products/${editId}`,
//           productData
//         );

//         console.log(
//           "Product Updated:",
//           response.data
//         );

//         alert("Product Updated Successfully");
//       } else {
//         // ADD
//         const response = await api.post(
//           "/products",
//           productData
//         );

//         console.log(
//           "Product Added:",
//           response.data
//         );

//         alert("Product Added Successfully");
//       }

//       resetForm();

//       // Go to first page after adding
//       if (!editMode) {
//         setPage(1);
//       }

//       await fetchProducts();
//     } catch (error) {
//       console.log(
//         "Product Add/Update Error:",
//         error.response?.data || error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           "Failed to save product"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===============================
//   // EDIT PRODUCT
//   // ===============================
//   const handleEdit = (item) => {
//     const productId = item._id || item.id;

//     if (!productId) {
//       alert("Product ID not found");
//       return;
//     }

//     setEditMode(true);
//     setEditId(productId);

//     setNewProduct({
//       productname: getProductName(item),

//       category:
//         item.category ||
//         item.categoryName ||
//         item.categoryname ||
//         "",

//       price:
//         item.price !== undefined
//           ? item.price
//           : "",

//       quantity:
//         item.quantity !== undefined
//           ? item.quantity
//           : "",

//       supplier:
//         item.supplier ||
//         "",
//     });

//     setShowForm(true);
//   };

//   // ===============================
//   // DELETE PRODUCT
//   // ===============================
//   const deleteProduct = async (id) => {
//     if (!id) {
//       alert("Product ID not found");
//       return;
//     }

//     if (!window.confirm("Delete this product?")) {
//       return;
//     }

//     try {
//       setLoading(true);

//       await api.delete(`/products/${id}`);

//       alert("Product Deleted Successfully");

//       await fetchProducts();
//     } catch (error) {
//       console.log(
//         "Delete Product Error:",
//         error.response?.data || error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           "Failed to delete product"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===============================
//   // ADD STOCK
//   // ===============================
//   const handleAddStock = async (product) => {
//     const productId = product._id || product.id;

//     const qty = Number(
//       supplierQty[productId]
//     );

//     if (!qty || qty <= 0) {
//       alert("Enter valid quantity");
//       return;
//     }

//     try {
//       setLoading(true);

//       const productData = {
//         productname: getProductName(product),

//         category:
//           product.category ||
//           product.categoryName ||
//           product.categoryname ||
//           "",

//         price: Number(product.price) || 0,

//         quantity:
//           Number(product.quantity) + qty,

//         supplier:
//           product.supplier || "",
//       };

//       await api.put(
//         `/products/${productId}`,
//         productData
//       );

//       setSupplierQty((prev) => ({
//         ...prev,
//         [productId]: "",
//       }));

//       alert("Stock Added Successfully");

//       await fetchProducts();
//     } catch (error) {
//       console.log(
//         "Add Stock Error:",
//         error.response?.data || error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           "Failed to add stock"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ===============================
//   // PRODUCT STATUS
//   // ===============================
//   const getStatus = (qty) => {
//     const quantity = Number(qty) || 0;

//     if (quantity <= 0) {
//       return "❌ Out Of Stock";
//     }

//     if (quantity <= 5) {
//       return "⚠️ Low Stock";
//     }

//     return "✅ In Stock";
//   };

//   // ===============================
//   // SEARCH
//   // ===============================
//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   // ===============================
//   // SORT
//   // ===============================
//   const handleSort = (field) => {
//     if (sort === field) {
//       setOrder(
//         order === "asc"
//           ? "desc"
//           : "asc"
//       );
//     } else {
//       setSort(field);
//       setOrder("asc");
//     }

//     setPage(1);
//   };

//   // ===============================
//   // OPEN ADD FORM
//   // ===============================
//   const openAddForm = () => {
//     setEditMode(false);
//     setEditId(null);

//     setNewProduct({
//       productname: "",
//       category: "",
//       price: "",
//       quantity: "",
//       supplier: "",
//     });

//     setShowForm(true);
//   };

//   // ===============================
//   // RENDER
//   // ===============================
//   return (
//     <div className="products">

//       <h2>
//         📦 Inventory Management - Owner Panel
//       </h2>

//       {/* TOP BAR */}
//       <div className="top-bar">

//         <button
//           className="add-btn"
//           disabled={loading}
//           onClick={openAddForm}
//         >
//           ➕ Add Product
//         </button>

//         <input
//           type="text"
//           className="search"
//           placeholder="🔍 Search Product"
//           value={search}
//           onChange={handleSearch}
//         />

//       </div>

//       {/* ERROR */}
//       {error && (
//         <div className="error">
//           ❌ {error}
//         </div>
//       )}

//       {/* ADD / EDIT FORM */}
//       {showForm && (
//         <div className="product-form">

//           <h3>
//             {editMode
//               ? "Edit Product"
//               : "Add New Product"}
//           </h3>

//           {/* PRODUCT NAME */}
//           <input
//             type="text"
//             placeholder="Product Name"
//             value={newProduct.productname}
//             onChange={(e) =>
//               setNewProduct((prev) => ({
//                 ...prev,
//                 productname:
//                   e.target.value,
//               }))
//             }
//           />

//           {/* CATEGORY */}
//           <select
//             value={newProduct.category}
//             onChange={(e) =>
//               setNewProduct((prev) => ({
//                 ...prev,
//                 category:
//                   e.target.value,
//               }))
//             }
//           >

//             <option value="">
//               Select Category
//             </option>

//             {Array.isArray(categories) &&
//               categories.map(
//                 (item, index) => {

//                   const categoryName =
//                     getCategoryName(item);

//                   if (!categoryName) {
//                     return null;
//                   }

//                   return (
//                     <option
//                       key={
//                         item._id ||
//                         item.id ||
//                         index
//                       }
//                       value={
//                         categoryName
//                       }
//                     >
//                       {categoryName}
//                     </option>
//                   );
//                 }
//               )}

//           </select>

//           {/* PRICE */}
//           <input
//             type="number"
//             min="0"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) =>
//               setNewProduct((prev) => ({
//                 ...prev,
//                 price:
//                   e.target.value,
//               }))
//             }
//           />

//           {/* QUANTITY */}
//           <input
//             type="number"
//             min="0"
//             placeholder="Quantity"
//             value={newProduct.quantity}
//             onChange={(e) =>
//               setNewProduct((prev) => ({
//                 ...prev,
//                 quantity:
//                   e.target.value,
//               }))
//             }
//           />

//           {/* SUPPLIER */}
//           <input
//             type="text"
//             placeholder="Supplier"
//             value={newProduct.supplier}
//             onChange={(e) =>
//               setNewProduct((prev) => ({
//                 ...prev,
//                 supplier:
//                   e.target.value,
//               }))
//             }
//           />

//           <div>

//             <button
//               className="save-btn"
//               onClick={addProduct}
//               disabled={loading}
//             >
//               {loading
//                 ? "Saving..."
//                 : editMode
//                 ? "Update"
//                 : "Save"}
//             </button>

//             <button
//               className="cancel-btn"
//               onClick={resetForm}
//               disabled={loading}
//             >
//               Cancel
//             </button>

//           </div>

//         </div>
//       )}

//       {/* PRODUCTS TABLE */}
//       <div className="table-box">

//         <table>

//           <thead>

//             <tr>

//               <th>S.No</th>

//               <th
//                 onClick={() =>
//                   handleSort("productname")
//                 }
//               >
//                 Product Name
//               </th>

//               <th
//                 onClick={() =>
//                   handleSort("category")
//                 }
//               >
//                 Category
//               </th>

//               <th
//                 onClick={() =>
//                   handleSort("price")
//                 }
//               >
//                 Price
//               </th>

//               <th
//                 onClick={() =>
//                   handleSort("quantity")
//                 }
//               >
//                 Stock Qty
//               </th>

//               <th>Status</th>

//               <th>Add Stock</th>

//               <th>Action</th>

//             </tr>

//           </thead>

//           <tbody>

//             {loading &&
//             products.length === 0 ? (

//               <tr>

//                 <td
//                   colSpan="8"
//                   style={{
//                     textAlign:
//                       "center",
//                     padding:
//                       "20px",
//                   }}
//                 >
//                   ⏳ Loading Products...
//                 </td>

//               </tr>

//             ) : products.length === 0 ? (

//               <tr>

//                 <td
//                   colSpan="8"
//                   style={{
//                     textAlign:
//                       "center",
//                     padding:
//                       "20px",
//                   }}
//                 >
//                   📦 No Products Found
//                 </td>

//               </tr>

//             ) : (

//               products.map(
//                 (item, index) => {

//                   const productId =
//                     item._id ||
//                     item.id;

//                   const productName =
//                     getProductName(item);

//                   const category =
//                     item.category ||
//                     item.categoryName ||
//                     item.categoryname ||
//                     "-";

//                   const price =
//                     Number(
//                       item.price
//                     ) || 0;

//                   const quantity =
//                     Number(
//                       item.quantity
//                     ) || 0;

//                   const currentPage =
//                     Number(
//                       pagination.currentPage
//                     ) || 1;

//                   const recordsPerPage =
//                     Number(
//                       pagination.recordsPerPage
//                     ) || limit;

//                   const serialNumber =
//                     (currentPage - 1) *
//                       recordsPerPage +
//                     index +
//                     1;

//                   return (

//                     <tr
//                       key={
//                         productId ||
//                         index
//                       }
//                     >

//                       <td>
//                         {serialNumber}
//                       </td>

//                       <td>
//                         {productName}
//                       </td>

//                       <td>
//                         {category}
//                       </td>

//                       <td>
//                         ₹
//                         {price.toLocaleString(
//                           "en-IN"
//                         )}
//                       </td>

//                       <td>
//                         {quantity}
//                       </td>

//                       <td>
//                         {getStatus(
//                           quantity
//                         )}
//                       </td>

//                       {/* ADD STOCK */}
//                       <td>

//                         <input
//                           type="number"
//                           min="1"
//                           className="qty-input"
//                           placeholder="Qty"
//                           value={
//                             supplierQty[
//                               productId
//                             ] || ""
//                           }
//                           onChange={(e) =>
//                             setSupplierQty(
//                               (prev) => ({
//                                 ...prev,
//                                 [productId]:
//                                   e.target
//                                     .value,
//                               })
//                             )
//                           }
//                           disabled={
//                             loading
//                           }
//                         />

//                         <button
//                           className="supplier-btn"
//                           onClick={() =>
//                             handleAddStock(
//                               item
//                             )
//                           }
//                           disabled={
//                             loading
//                           }
//                         >
//                           📦 Add
//                         </button>

//                       </td>

//                       {/* ACTIONS */}
//                       <td>

//                         <Link
//                           to={`/products/${productId}`}
//                         >
//                           <button
//                             className="view-btn"
//                             disabled={
//                               loading
//                             }
//                           >
//                             👁️ View
//                           </button>
//                         </Link>

//                         <button
//                           className="edit-btn"
//                           onClick={() =>
//                             handleEdit(
//                               item
//                             )
//                           }
//                           disabled={
//                             loading
//                           }
//                         >
//                           ✏️ Edit
//                         </button>

//                         <button
//                           className="delete-btn"
//                           onClick={() =>
//                             deleteProduct(
//                               productId
//                             )
//                           }
//                           disabled={
//                             loading
//                           }
//                         >
//                           🗑 Delete
//                         </button>

//                       </td>

//                     </tr>

//                   );
//                 }
//               )

//             )}

//           </tbody>

//         </table>

//       </div>

//       {/* PAGINATION */}
//       {pagination.totalPages > 0 && (

//         <div className="pagination">

//           <button
//             disabled={
//               !pagination.hasPreviousPage ||
//               loading
//             }
//             onClick={() =>
//               setPage(
//                 Math.max(
//                   1,
//                   page - 1
//                 )
//               )
//             }
//           >
//             ⬅ Previous
//           </button>

//           <span>
//             Page{" "}
//             {pagination.currentPage}{" "}
//             of{" "}
//             {pagination.totalPages}
//           </span>

//           <button
//             disabled={
//               !pagination.hasNextPage ||
//               loading
//             }
//             onClick={() =>
//               setPage(
//                 page + 1
//               )
//             }
//           >
//             Next ➡
//           </button>

//           <select
//             value={limit}
//             onChange={(e) => {
//               setLimit(
//                 Number(
//                   e.target.value
//                 )
//               );
//               setPage(1);
//             }}
//           >

//             <option value="5">
//               5
//             </option>

//             <option value="10">
//               10
//             </option>

//             <option value="20">
//               20
//             </option>

//           </select>

//         </div>

//       )}

//     </div>
//   );
// }

// export default Products;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import api from "../../api/api";

function Products({
  products = [],
  setProducts,
  categories = [],
}) {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  const [supplierQty, setSupplierQty] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [sort, setSort] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const [pagination, setPagination] = useState({});

  // Product form
  // IMPORTANT:
  // Backend Product schema expects productName
  const [newProduct, setNewProduct] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
  });

  // ==============================
  // FETCH PRODUCTS
  // ==============================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products", {
        params: {
          search,
          page,
          limit,
          sort,
          order,
        },
      });

      setProducts(response.data.products || []);
      setPagination(response.data.pagination || {});
    } catch (error) {
      console.log(
        "Fetch Products Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // FETCH WHEN PAGE / SEARCH CHANGES
  // ==============================
  useEffect(() => {
    document.title =
      "Products | Inventory Management System";

    fetchProducts();
  }, [search, page, limit, sort, order]);

  // ==============================
  // RESET FORM
  // ==============================
  const resetForm = () => {
    setNewProduct({
      productName: "",
      category: "",
      price: "",
      quantity: "",
      supplier: "",
    });

    setShowForm(false);
    setEditMode(false);
    setEditId(null);
  };

  // ==============================
  // OPEN ADD PRODUCT FORM
  // ==============================
  const openAddForm = () => {
    setEditMode(false);
    setEditId(null);

    setNewProduct({
      productName: "",
      category: "",
      price: "",
      quantity: "",
      supplier: "",
    });

    setShowForm(true);
  };

  // ==============================
  // ADD / UPDATE PRODUCT
  // ==============================
  const addProduct = async () => {
    // Validation
    if (!newProduct.productName.trim()) {
      alert("Please enter Product Name");
      return;
    }

    if (!newProduct.category) {
      alert("Please select Category");
      return;
    }

    if (
      newProduct.price === "" ||
      newProduct.price === null
    ) {
      alert("Please enter Price");
      return;
    }

    if (
      newProduct.quantity === "" ||
      newProduct.quantity === null
    ) {
      alert("Please enter Quantity");
      return;
    }

    if (!newProduct.supplier.trim()) {
      alert("Please enter Supplier");
      return;
    }

    if (
      Number(newProduct.price) < 0 ||
      Number(newProduct.quantity) < 0
    ) {
      alert("Negative values are not allowed");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // IMPORTANT:
      // This field name MUST be productName
      // because backend Product schema uses productName
      const productData = {
        productName: newProduct.productName.trim(),
        category: newProduct.category.trim(),
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity),
        supplier: newProduct.supplier.trim(),
      };

      console.log(
        "Sending Product Data:",
        productData
      );

      if (editMode) {
        // UPDATE PRODUCT
        await api.put(
          `/products/${editId}`,
          productData
        );

        alert(
          "Product Updated Successfully ✅"
        );
      } else {
        // ADD PRODUCT
        await api.post(
          "/products",
          productData
        );

        alert(
          "Product Added Successfully ✅"
        );
      }

      resetForm();

      // Refresh product table
      await fetchProducts();
    } catch (error) {
      console.log(
        "Product Add/Update Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Product validation failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // EDIT PRODUCT
  // ==============================
  const handleEdit = (item) => {
    setEditMode(true);
    setEditId(item._id);

    setNewProduct({
      productName:
        item.productName ||
        item.productname ||
        "",

      category:
        item.category || "",

      price:
        item.price ?? "",

      quantity:
        item.quantity ?? "",

      supplier:
        item.supplier || "",
    });

    setShowForm(true);
  };

  // ==============================
  // DELETE PRODUCT
  // ==============================
  const deleteProduct = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this product?"
      )
    ) {
      return;
    }

    try {
      setLoading(true);

      await api.delete(
        `/products/${id}`
      );

      alert(
        "Product Deleted Successfully ✅"
      );

      await fetchProducts();
    } catch (error) {
      console.log(
        "Delete Product Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // ADD STOCK
  // ==============================
  const handleAddStock = async (product) => {
    const qty = Number(
      supplierQty[product._id]
    );

    if (!qty || qty <= 0) {
      alert("Enter valid quantity");
      return;
    }

    try {
      setLoading(true);

      const productData = {
        productName:
          product.productName ||
          product.productname ||
          "",

        category:
          product.category || "",

        price:
          Number(product.price) || 0,

        quantity:
          Number(product.quantity || 0) +
          qty,

        supplier:
          product.supplier || "",
      };

      await api.put(
        `/products/${product._id}`,
        productData
      );

      setSupplierQty({
        ...supplierQty,
        [product._id]: "",
      });

      alert(
        "Stock Added Successfully ✅"
      );

      await fetchProducts();
    } catch (error) {
      console.log(
        "Add Stock Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add stock"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // PRODUCT STATUS
  // ==============================
  const getStatus = (quantity) => {
    const qty = Number(quantity) || 0;

    if (qty <= 0) {
      return "❌ Out Of Stock";
    }

    if (qty <= 5) {
      return "⚠️ Low Stock";
    }

    return "✅ In Stock";
  };

  // ==============================
  // SEARCH
  // ==============================
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  // ==============================
  // SORT
  // ==============================
  const handleSort = (field) => {
    if (sort === field) {
      setOrder(
        order === "asc"
          ? "desc"
          : "asc"
      );
    } else {
      setSort(field);
      setOrder("asc");
    }

    setPage(1);
  };

  return (
    <div className="products">

      <h2>
        📦 Inventory Management - Owner Panel
      </h2>

      {/* ==============================
          TOP BAR
      ============================== */}
      <div className="top-bar">

        <button
          className="add-btn"
          disabled={loading}
          onClick={openAddForm}
        >
          ➕ Add Product
        </button>

        <input
          type="text"
          className="search"
          placeholder="🔍 Search Product"
          value={search}
          onChange={handleSearch}
        />

      </div>

      {/* ERROR */}
      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}

      {/* ==============================
          ADD / EDIT PRODUCT FORM
      ============================== */}
      {showForm && (
        <div className="product-form">

          <h3>
            {editMode
              ? "Edit Product"
              : "Add New Product"}
          </h3>

          {/* PRODUCT NAME */}
          <input
            type="text"
            placeholder="Product Name"
            value={
              newProduct.productName
            }
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                productName:
                  e.target.value,
              })
            }
          />

          {/* CATEGORY */}
          <select
            value={
              newProduct.category
            }
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                category:
                  e.target.value,
              })
            }
          >
            <option value="">
              Select Category
            </option>

            {Array.isArray(
              categories
            ) &&
              categories.map(
                (item, index) => {

                  // Backend category field
                  // supports categoryName
                  // or older name fields
                  const categoryName =
                    item.categoryName ||
                    item.categoryname ||
                    item.name ||
                    "";

                  return (
                    <option
                      key={
                        item._id ||
                        item.id ||
                        index
                      }
                      value={
                        categoryName
                      }
                    >
                      {categoryName}
                    </option>
                  );
                }
              )}
          </select>

          {/* PRICE */}
          <input
            type="number"
            min="0"
            placeholder="Price"
            value={
              newProduct.price
            }
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                price:
                  e.target.value,
              })
            }
          />

          {/* QUANTITY */}
          <input
            type="number"
            min="0"
            placeholder="Quantity"
            value={
              newProduct.quantity
            }
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                quantity:
                  e.target.value,
              })
            }
          />

          {/* SUPPLIER */}
          <input
            type="text"
            placeholder="Supplier"
            value={
              newProduct.supplier
            }
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                supplier:
                  e.target.value,
              })
            }
          />

          {/* BUTTONS */}
          <div>

            <button
              className="save-btn"
              onClick={addProduct}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editMode
                ? "Update"
                : "Save"}
            </button>

            <button
              className="cancel-btn"
              onClick={resetForm}
              disabled={loading}
            >
              Cancel
            </button>

          </div>

        </div>
      )}

      {/* ==============================
          PRODUCTS TABLE
      ============================== */}
      <div className="table-box">

        <table>

          <thead>

            <tr>

              <th>S.No</th>

              <th
                onClick={() =>
                  handleSort(
                    "productName"
                  )
                }
                style={{
                  cursor: "pointer",
                }}
              >
                Product Name
              </th>

              <th
                onClick={() =>
                  handleSort(
                    "category"
                  )
                }
                style={{
                  cursor: "pointer",
                }}
              >
                Category
              </th>

              <th
                onClick={() =>
                  handleSort(
                    "price"
                  )
                }
                style={{
                  cursor: "pointer",
                }}
              >
                Price
              </th>

              <th
                onClick={() =>
                  handleSort(
                    "quantity"
                  )
                }
                style={{
                  cursor: "pointer",
                }}
              >
                Stock Qty
              </th>

              <th>Status</th>

              <th>Add Stock</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {loading &&
            products.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "20px",
                  }}
                >
                  ⏳ Loading Products...
                </td>

              </tr>

            ) : products.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  style={{
                    textAlign:
                      "center",
                    padding:
                      "20px",
                  }}
                >
                  📦 No Products Found
                </td>

              </tr>

            ) : (

              products.map(
                (item, index) => {

                  const productId =
                    item._id ||
                    item.id;

                  const productName =
                    item.productName ||
                    item.productname ||
                    "Unnamed Product";

                  const category =
                    item.category ||
                    "-";

                  const price =
                    Number(
                      item.price
                    ) || 0;

                  const quantity =
                    Number(
                      item.quantity
                    ) || 0;

                  const currentPage =
                    Number(
                      pagination.currentPage
                    ) || page;

                  const recordsPerPage =
                    Number(
                      pagination.recordsPerPage
                    ) || limit;

                  const serialNumber =
                    (currentPage - 1) *
                      recordsPerPage +
                    index +
                    1;

                  return (

                    <tr
                      key={
                        productId ||
                        index
                      }
                    >

                      {/* S.NO */}
                      <td>
                        {serialNumber}
                      </td>

                      {/* PRODUCT NAME */}
                      <td>
                        {productName}
                      </td>

                      {/* CATEGORY */}
                      <td>
                        {category}
                      </td>

                      {/* PRICE */}
                      <td>
                        ₹
                        {price.toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      {/* QUANTITY */}
                      <td>
                        {quantity}
                      </td>

                      {/* STATUS */}
                      <td>
                        {getStatus(
                          quantity
                        )}
                      </td>

                      {/* ADD STOCK */}
                      <td>

                        <input
                          type="number"
                          min="1"
                          className="qty-input"
                          placeholder="Qty"
                          value={
                            supplierQty[
                              productId
                            ] || ""
                          }
                          onChange={(e) =>
                            setSupplierQty({
                              ...supplierQty,
                              [productId]:
                                e.target.value,
                            })
                          }
                          disabled={
                            loading
                          }
                        />

                        <button
                          className="supplier-btn"
                          onClick={() =>
                            handleAddStock(
                              item
                            )
                          }
                          disabled={
                            loading
                          }
                        >
                          📦 Add
                        </button>

                      </td>

                      {/* ACTIONS */}
                      <td>

                        <Link
                          to={`/products/${productId}`}
                        >
                          <button
                            className="view-btn"
                            disabled={
                              loading
                            }
                          >
                            👁️ View
                          </button>
                        </Link>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            handleEdit(
                              item
                            )
                          }
                          disabled={
                            loading
                          }
                        >
                          ✏️ Edit
                        </button>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            deleteProduct(
                              productId
                            )
                          }
                          disabled={
                            loading
                          }
                        >
                          🗑 Delete
                        </button>

                      </td>

                    </tr>

                  );
                }
              )

            )}

          </tbody>

        </table>

      </div>

      {/* ==============================
          PAGINATION
      ============================== */}
      {Number(
        pagination.totalPages
      ) > 0 && (

        <div className="pagination">

          <button
            disabled={
              !pagination.hasPreviousPage ||
              loading
            }
            onClick={() =>
              setPage(
                Math.max(
                  1,
                  page - 1
                )
              )
            }
          >
            ⬅ Previous
          </button>

          <span>
            Page{" "}
            {pagination.currentPage ||
              page}{" "}
            of{" "}
            {pagination.totalPages}
          </span>

          <button
            disabled={
              !pagination.hasNextPage ||
              loading
            }
            onClick={() =>
              setPage(
                page + 1
              )
            }
          >
            Next ➡
          </button>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(
                Number(
                  e.target.value
                )
              );
              setPage(1);
            }}
          >
            <option value="5">
              5
            </option>

            <option value="10">
              10
            </option>

            <option value="20">
              20
            </option>

          </select>

        </div>

      )}

    </div>
  );
}

export default Products;
