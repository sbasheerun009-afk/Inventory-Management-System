// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Product.css";
// import api from "../../api/api";

// function Products({ products = [], setProducts, categories = [] }) {
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
//   const [pagination, setPagination] = useState({});
//   const [newProduct, setNewProduct] = useState({
//     productname: "", category: "", price: "", quantity: "", supplier: ""
//   });

//   const getProductName = (product) =>
//     product.productname || product.productName || product.name || "";

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const response = await api.get("/products", {
//         params: { search, page, limit, sort, order }
//       });
//       setProducts(response.data.products || []);
//       setPagination(response.data.pagination || {});
//     } catch (error) {
//       console.log("Fetch Products Error:", error.response?.data || error.message);
//       setError(error.response?.data?.message || "Failed to fetch products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     document.title = "Products | Inventory";
//     fetchProducts();
//   }, [search, page, limit, sort, order]);

//   const addProduct = async () => {
//     if (
//       !newProduct.productname.trim() ||
//       !newProduct.category ||
//       newProduct.price === "" ||
//       newProduct.quantity === "" ||
//       !newProduct.supplier.trim()
//     ) {
//       alert("Please fill all details");
//       return;
//     }

//     if (Number(newProduct.price) < 0 || Number(newProduct.quantity) < 0) {
//       alert("Negative values not allowed");
//       return;
//     }

//     try {
//       setLoading(true);
//       const productData = {
//         productname: newProduct.productname.trim(),
//         category: newProduct.category,
//         price: Number(newProduct.price),
//         quantity: Number(newProduct.quantity),
//         supplier: newProduct.supplier.trim()
//       };

//       if (editMode) {
//         await api.put(`/products/${editId}`, productData);
//         alert("Product Updated Successfully");
//       } else {
//         await api.post("/products", productData);
//         alert("Product Added Successfully");
//       }

//       resetForm();
//       fetchProducts();
//     } catch (error) {
//       console.log("Product Add/Update Error:", error.response?.data || error.message);
//       alert(error.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEdit = (item) => {
//     setEditMode(true);
//     setEditId(item._id);
//     setNewProduct({
//       productname: getProductName(item),
//       category: item.category || "",
//       price: item.price ?? "",
//       quantity: item.quantity ?? "",
//       supplier: item.supplier || ""
//     });
//     setShowForm(true);
//   };

//   const deleteProduct = async (id) => {
//     if (!window.confirm("Delete this product?")) return;

//     try {
//       setLoading(true);
//       await api.delete(`/products/${id}`);
//       alert("Product Deleted Successfully");
//       fetchProducts();
//     } catch (error) {
//       console.log("Delete Error:", error.response?.data || error.message);
//       alert("Failed to delete product");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddStock = async (product) => {
//     const qty = Number(supplierQty[product._id]);

//     if (!qty || qty <= 0) {
//       alert("Enter valid quantity");
//       return;
//     }

//     try {
//       setLoading(true);
//       await api.put(`/products/${product._id}`, {
//         productname: getProductName(product),
//         category: product.category,
//         price: product.price,
//         quantity: Number(product.quantity) + qty,
//         supplier: product.supplier || ""
//       });

//       setSupplierQty({ ...supplierQty, [product._id]: "" });
//       alert("Stock Added Successfully");
//       fetchProducts();
//     } catch (error) {
//       console.log("Add Stock Error:", error.response?.data || error.message);
//       alert("Failed to add stock");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatus = (qty) => {
//     if (qty <= 0) return "❌ Out Of Stock";
//     if (qty <= 5) return "⚠️ Low Stock";
//     return "✅ In Stock";
//   };

//   const resetForm = () => {
//     setNewProduct({
//       productname: "", category: "", price: "", quantity: "", supplier: ""
//     });
//     setShowForm(false);
//     setEditMode(false);
//     setEditId(null);
//   };

//   const handleSearch = (e) => {
//     setSearch(e.target.value);
//     setPage(1);
//   };

//   const handleSort = (field) => {
//     if (sort === field) setOrder(order === "asc" ? "desc" : "asc");
//     else {
//       setSort(field);
//       setOrder("asc");
//     }
//     setPage(1);
//   };

//   return (
//     <div className="products">
//       <h2>📦 Inventory Management - Owner Panel</h2>

//       <div className="top-bar">
//         <button
//           className="add-btn"
//           disabled={loading}
//           onClick={() => {
//             setShowForm(!showForm);
//             setEditMode(false);
//             setEditId(null);
//             setNewProduct({
//               productname: "", category: "", price: "", quantity: "", supplier: ""
//             });
//           }}
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

//       {error && <div className="error">❌ {error}</div>}

//       {showForm && (
//         <div className="product-form">
//           <h3>{editMode ? "Edit Product" : "Add New Product"}</h3>

//           <input
//             type="text"
//             placeholder="Product Name"
//             value={newProduct.productname}
//             onChange={(e) => setNewProduct({
//               ...newProduct, productname: e.target.value
//             })}
//           />

//           <select
//             value={newProduct.category}
//             onChange={(e) => setNewProduct({
//               ...newProduct, category: e.target.value
//             })}
//           >
//             <option value="">Select Category</option>
//             {categories.map((item, index) => (
//               <option key={item._id || index} value={item.categoryName}>
//                 {item.categoryName}
//               </option>
//             ))}
//           </select>

//           <input
//             type="number"
//             min="0"
//             placeholder="Price"
//             value={newProduct.price}
//             onChange={(e) => setNewProduct({
//               ...newProduct, price: e.target.value
//             })}
//           />

//           <input
//             type="number"
//             min="0"
//             placeholder="Quantity"
//             value={newProduct.quantity}
//             onChange={(e) => setNewProduct({
//               ...newProduct, quantity: e.target.value
//             })}
//           />

//           <input
//             type="text"
//             placeholder="Supplier"
//             value={newProduct.supplier}
//             onChange={(e) => setNewProduct({
//               ...newProduct, supplier: e.target.value
//             })}
//           />

//           <div>
//             <button
//               className="save-btn"
//               onClick={addProduct}
//               disabled={loading}
//             >
//               {loading ? "Saving..." : editMode ? "Update" : "Save"}
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

//       <div className="table-box">
//         <table>
//           <thead>
//             <tr>
//               <th>S.No</th>
//               {["productname", "category", "price", "quantity"].map((field) => (
//                 <th key={field} onClick={() => handleSort(field)} style={{ cursor: "pointer" }}>
//                   {field === "productname" ? "Product Name" :
//                    field === "quantity" ? "Stock Qty" :
//                    field.charAt(0).toUpperCase() + field.slice(1)}
//                   {sort === field && (order === "asc" ? " ↑" : " ↓")}
//                 </th>
//               ))}
//               <th>Status</th>
//               <th>Add Stock</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {loading && products.length === 0 ? (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
//                   ⏳ Loading Products...
//                 </td>
//               </tr>
//             ) : products.length === 0 ? (
//               <tr>
//                 <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
//                   📦 No Products Found
//                 </td>
//               </tr>
//             ) : (
//               products.map((item, index) => (
//                 <tr key={item._id}>
//                   <td>
//                     {(pagination.currentPage - 1) * pagination.recordsPerPage + index + 1}
//                   </td>
//                   <td>{getProductName(item)}</td>
//                   <td>{item.category}</td>
//                   <td>₹{item.price}</td>
//                   <td>{item.quantity}</td>
//                   <td>{getStatus(item.quantity)}</td>

//                   <td>
//                     <input
//                       type="number"
//                       min="1"
//                       className="qty-input"
//                       placeholder="Qty"
//                       value={supplierQty[item._id] || ""}
//                       onChange={(e) => setSupplierQty({
//                         ...supplierQty, [item._id]: e.target.value
//                       })}
//                       disabled={loading}
//                     />
//                     <button
//                       className="supplier-btn"
//                       onClick={() => handleAddStock(item)}
//                       disabled={loading}
//                     >
//                       📦 Add
//                     </button>
//                   </td>

//                   <td>
//                     <Link to={`/products/${item._id}`}>
//                       <button className="view-btn" disabled={loading}>👁️ View</button>
//                     </Link>

//                     <Link to={`/products/edit/${item._id}`}>
//                       <button className="edit-btn" disabled={loading}>✏️ Edit</button>
//                     </Link>

//                     <button
//                       className="delete-btn"
//                       onClick={() => deleteProduct(item._id)}
//                       disabled={loading}
//                     >
//                       🗑 Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {pagination.totalPages > 0 && (
//         <div className="pagination">
//           <button
//             disabled={!pagination.hasPreviousPage || loading}
//             onClick={() => setPage(page - 1)}
//           >
//             ⬅ Previous
//           </button>

//           <span>
//             Page {pagination.currentPage} of {pagination.totalPages}
//           </span>

//           <button
//             disabled={!pagination.hasNextPage || loading}
//             onClick={() => setPage(page + 1)}
//           >
//             Next ➡
//           </button>

//           <select
//             value={limit}
//             onChange={(e) => {
//               setLimit(Number(e.target.value));
//               setPage(1);
//             }}
//           >
//             <option value="5">5</option>
//             <option value="10">10</option>
//             <option value="20">20</option>
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

function Products({ products = [], setProducts, categories = [] }) {
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
  const [newProduct, setNewProduct] = useState({
    productname: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
  });

  const getProductName = (product) =>
    product.productname || product.productName || product.name || "";

  const resetForm = () => {
    setNewProduct({
      productname: "",
      category: "",
      price: "",
      quantity: "",
      supplier: "",
    });
    setShowForm(false);
    setEditMode(false);
    setEditId(null);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/products", {
        params: { search, page, limit, sort, order },
      });

      setProducts(response.data.products || []);
      setPagination(response.data.pagination || {});
    } catch (error) {
      console.log(
        "Fetch Products Error:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Products | Inventory";
    fetchProducts();
  }, [search, page, limit, sort, order]);

  const addProduct = async () => {
    if (
      !newProduct.productname.trim() ||
      !newProduct.category ||
      newProduct.price === "" ||
      newProduct.quantity === "" ||
      !newProduct.supplier.trim()
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

    try {
      setLoading(true);

      const productData = {
        productname: newProduct.productname.trim(),
        category: newProduct.category,
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity),
        supplier: newProduct.supplier.trim(),
      };

      if (editMode) {
        await api.put(`/products/${editId}`, productData);
        alert("Product Updated Successfully");
      } else {
        await api.post("/products", productData);
        alert("Product Added Successfully");
      }

      resetForm();
      await fetchProducts();
    } catch (error) {
      console.log(
        "Product Add/Update Error:",
        error.response?.data || error.message
      );
      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditMode(true);
    setEditId(item._id);
    setNewProduct({
      productname: getProductName(item),
      category: item.category || "",
      price: item.price ?? "",
      quantity: item.quantity ?? "",
      supplier: item.supplier || "",
    });
    setShowForm(true);
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      setLoading(true);
      await api.delete(`/products/${id}`);
      alert("Product Deleted Successfully");
      await fetchProducts();
    } catch (error) {
      console.log(
        "Delete Error:",
        error.response?.data || error.message
      );
      alert("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddStock = async (product) => {
    const qty = Number(supplierQty[product._id]);

    if (!qty || qty <= 0) {
      alert("Enter valid quantity");
      return;
    }

    try {
      setLoading(true);

      await api.put(`/products/${product._id}`, {
        productname: getProductName(product),
        category: product.category,
        price: product.price,
        quantity: Number(product.quantity) + qty,
        supplier: product.supplier || "",
      });

      setSupplierQty({
        ...supplierQty,
        [product._id]: "",
      });

      alert("Stock Added Successfully");
      await fetchProducts();
    } catch (error) {
      console.log(
        "Add Stock Error:",
        error.response?.data || error.message
      );
      alert("Failed to add stock");
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (qty) => {
    if (qty <= 0) return "❌ Out Of Stock";
    if (qty <= 5) return "⚠️ Low Stock";
    return "✅ In Stock";
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleSort = (field) => {
    if (sort === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSort(field);
      setOrder("asc");
    }
    setPage(1);
  };

  const openAddForm = () => {
    setEditMode(false);
    setEditId(null);
    setNewProduct({
      productname: "",
      category: "",
      price: "",
      quantity: "",
      supplier: "",
    });
    setShowForm(!showForm);
  };

  return (
    <div className="products">
      <h2>📦 Inventory Management - Owner Panel</h2>

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

      {error && <div className="error">❌ {error}</div>}

      {showForm && (
        <div className="product-form">
          <h3>
            {editMode ? "Edit Product" : "Add New Product"}
          </h3>

          <input
            type="text"
            placeholder="Product Name"
            value={newProduct.productname}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                productname: e.target.value,
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

            {categories.map((item, index) => (
              <option
                key={item._id || index}
                value={item.categoryName}
              >
                {item.categoryName}
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

          <input
            type="text"
            placeholder="Supplier"
            value={newProduct.supplier}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                supplier: e.target.value,
              })
            }
          />

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

      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>S.No</th>

              {["productname", "category", "price", "quantity"].map(
                (field) => (
                  <th
                    key={field}
                    onClick={() => handleSort(field)}
                    style={{ cursor: "pointer" }}
                  >
                    {field === "productname"
                      ? "Product Name"
                      : field === "quantity"
                      ? "Stock Qty"
                      : field.charAt(0).toUpperCase() +
                        field.slice(1)}

                    {sort === field &&
                      (order === "asc" ? " ↑" : " ↓")}
                  </th>
                )
              )}

              <th>Status</th>
              <th>Add Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && products.length === 0 ? (
              <tr>
                <td
                  colSpan="8"
                  style={{
                    textAlign: "center",
                    padding: "20px",
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
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  📦 No Products Found
                </td>
              </tr>
            ) : (
              products.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    {(pagination.currentPage - 1) *
                      pagination.recordsPerPage +
                      index +
                      1}
                  </td>

                  <td>{getProductName(item)}</td>
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
                      value={supplierQty[item._id] || ""}
                      onChange={(e) =>
                        setSupplierQty({
                          ...supplierQty,
                          [item._id]: e.target.value,
                        })
                      }
                      disabled={loading}
                    />

                    <button
                      className="supplier-btn"
                      onClick={() => handleAddStock(item)}
                      disabled={loading}
                    >
                      📦 Add
                    </button>
                  </td>

                  <td>
                    <Link to={`/products/${item._id}`}>
                      <button
                        className="view-btn"
                        disabled={loading}
                      >
                        👁️ View
                      </button>
                    </Link>

                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                      disabled={loading}
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteProduct(item._id)}
                      disabled={loading}
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination.totalPages > 0 && (
        <div className="pagination">
          <button
            disabled={
              !pagination.hasPreviousPage || loading
            }
            onClick={() => setPage(page - 1)}
          >
            ⬅ Previous
          </button>

          <span>
            Page {pagination.currentPage} of{" "}
            {pagination.totalPages}
          </span>

          <button
            disabled={
              !pagination.hasNextPage || loading
            }
            onClick={() => setPage(page + 1)}
          >
            Next ➡
          </button>

          <select
            value={limit}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setPage(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default Products;

