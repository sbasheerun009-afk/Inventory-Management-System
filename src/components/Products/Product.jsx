
// import { useEffect,useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/api";
// import "./Product.css";

// function Products({
// products=[],
// setProducts,
// categories=[]
// }) {
// const [search,setSearch]=useState("");
// const [categoryFilter,setCategoryFilter]=useState("All");
// const [loading,setLoading]=useState(false);

// const navigate=useNavigate();

// const safeProducts=
// Array.isArray(products)
// ?products
// :[];

// const safeCategories=
// Array.isArray(categories)
// ?categories
// :[];

// useEffect(()=>{
// document.title=
// "Products | Inventory Management System";
// },[]);

// const normalizeValue=(value)=>{
// return String(value||"")
// .trim()
// .toLowerCase()
// .replace(/\s+/g," ");
// };

// const getProductName=(product)=>{
// return String(
// product?.productName||
// product?.productname||
// product?.name||
// ""
// ).trim();
// };

// const getProductCategory=(product)=>{
// return String(
// product?.category||
// product?.categoryName||
// ""
// ).trim();
// };

// const getCategoryName=(category)=>{
// return String(
// category?.categoryName||
// category?.name||
// ""
// ).trim();
// };

// const fetchProducts=async()=>{
// try{
// setLoading(true);
//   const response=
//     await api.get("/products");

//   console.log(
//     "Products from Backend:",
//     response.data
//   );

//   const productData=
//     Array.isArray(response.data)
//       ?response.data
//       :Array.isArray(
//           response.data?.products
//         )
//         ?response.data.products
//         :[];

//   setProducts(productData);

// }catch(error){
//   console.log(
//     "Fetch Products Error:",
//     error.response?.data||
//     error.message
//   );

//   alert(
//     error.response?.data?.message||
//     "Failed to fetch products"
//   );

// }finally{
//   setLoading(false);
// }

// };

// const deleteProduct=async(id)=>{
// if(!id){
// alert(
// "Product ID not found"
// );
// return;
// }
// const confirmDelete=
//   window.confirm(
//     "Are you sure you want to delete this product?"
//   );

// if(!confirmDelete){
//   return;
// }

// try{
//   setLoading(true);

//   await api.delete(
//     `/products/${id}`
//   );

//   alert(
//     "Product deleted successfully"
//   );

//   await fetchProducts();

// }catch(error){
//   console.log(
//     "Delete Product Error:",
//     error.response?.data||
//     error.message
//   );

//   alert(
//     error.response?.data?.message||
//     "Failed to delete product"
//   );

// }finally{
//   setLoading(false);
// }


// };

// const filteredProducts=
// safeProducts.filter(
// (product)=>{
// const productName=
// normalizeValue(
// getProductName(product)
// );
//     const productCategory=
//       normalizeValue(
//         getProductCategory(product)
//       );

//     const searchText=
//       normalizeValue(search);

//     const selectedCategory=
//       normalizeValue(
//         categoryFilter
//       );

//     const matchesSearch=
//       productName.includes(
//         searchText
//       );

//     const matchesCategory=
//       selectedCategory==="all"||
//       productCategory===
//       selectedCategory;

//     return(
//       matchesSearch&&
//       matchesCategory
//     );
//   }
// );

// return( <div className="products">
//   <h2>📦 Products</h2>

//   <div className="top-bar">

//     <button
//       className="add-btn"
//       onClick={()=>
//         navigate(
//           "/products/add"
//         )
//       }
//       disabled={loading}
//     >
//       ➕ Add Product
//     </button>

//     <input
//       type="text"
//       className="search"
//       placeholder="🔍 Search Product..."
//       value={search}
//       onChange={(e)=>
//         setSearch(
//           e.target.value
//         )
//       }
//     />

//     <select
//       className="filter"
//       value={categoryFilter}
//       onChange={(e)=>
//         setCategoryFilter(
//           e.target.value
//         )
//       }
//     >

//       <option value="All">
//         All Categories
//       </option>

//       {safeCategories.map(
//         (category,index)=>{
//           const categoryName=
//             getCategoryName(
//               category
//             );

//           if(
//             !categoryName
//           ){
//             return null;
//           }

//           return(
//             <option
//               key={
//                 category?._id||
//                 category?.id||
//                 index
//               }
//               value={
//                 categoryName
//               }
//             >
//               {categoryName}
//             </option>
//           );
//         }
//       )}

//     </select>

//     {(search||
//       categoryFilter!=="All")&&(

//       <button
//         className="clear-btn"
//         onClick={()=>{
//           setSearch("");
//           setCategoryFilter(
//             "All"
//           );
//         }}
//       >
//         Clear
//       </button>

//     )}

//   </div>

//   <div className="table-box">

//     <table>

//       <thead>

//         <tr>
//           <th>S.No</th>
//           <th>Product Name</th>
//           <th>Category</th>
//           <th>Price</th>
//           <th>Quantity</th>
//           <th>Supplier</th>
//           <th>Action</th>
//         </tr>

//       </thead>

//       <tbody>

//         {loading&&
//         safeProducts.length===0?(
//           <tr>
//             <td colSpan="7">
//               ⏳ Loading Products...
//             </td>
//           </tr>

//         ):filteredProducts.length>0?(
//           filteredProducts.map(
//             (product,index)=>{

//               const productId=
//                 product?._id||
//                 product?.id;

//               const productName=
//                 getProductName(
//                   product
//                 )||
//                 "Unnamed Product";

//               const productCategory=
//                 getProductCategory(
//                   product
//                 )||
//                 "-";

//               return(

//                 <tr
//                   key={
//                     productId||
//                     index
//                   }
//                 >

//                   <td>
//                     {index+1}
//                   </td>

//                   <td>
//                     {productName}
//                   </td>

//                   <td>
//                     {productCategory}
//                   </td>

//                   <td>
//                     ₹
//                     {Number(
//                       product?.price||0
//                     )}
//                   </td>

//                   <td>
//                     {Number(
//                       product?.quantity||0
//                     )}
//                   </td>

//                   <td>
//                     {product?.supplier||
//                       "-"}
//                   </td>

//                   <td>

//                     <button
//                       className="view-btn"
//                       onClick={()=>
//                         navigate(
//                           `/products/${productId}`
//                         )
//                       }
//                       disabled={
//                         !productId
//                       }
//                     >
//                       👁 View
//                     </button>

//                     <button
//                       className="edit-btn"
//                       onClick={()=>
//                         navigate(
//                           `/products/edit/${productId}`
//                         )
//                       }
//                       disabled={
//                         !productId
//                       }
//                     >
//                       ✏️ Edit
//                     </button>

//                     <button
//                       className="delete-btn"
//                       onClick={()=>
//                         deleteProduct(
//                           productId
//                         )
//                       }
//                       disabled={
//                         loading||
//                         !productId
//                       }
//                     >
//                       🗑 Delete
//                     </button>

//                   </td>

//                 </tr>

//               );
//             }
//           )

//         ):(
//           <tr>
//             <td colSpan="7">
//               📦 No Products Found
//             </td>
//           </tr>
//         )}

//       </tbody>

//     </table>

//   </div>

// </div>

// );
// }

// export default Products;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./Product.css";

function Products({
  products = [],
  setProducts,
  categories = [],
}) {
  const navigate = useNavigate();

  // Search and filter
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // Add Product form
  const [showForm, setShowForm] = useState(false);

  const [newProduct, setNewProduct] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
  });

  const [loading, setLoading] = useState(false);

  const safeProducts = Array.isArray(products)
    ? products
    : [];

  const safeCategories = Array.isArray(categories)
    ? categories
    : [];

  useEffect(() => {
    document.title =
      "Products | Inventory Management System";
  }, []);

  // Normalize text for search and category filter
  const normalizeValue = (value) => {
    return String(value || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
  };

  // Get product name
  const getProductName = (product) => {
    return String(
      product?.productName ||
        product?.productname ||
        product?.name ||
        ""
    ).trim();
  };

  // Get category name from product
  const getProductCategory = (product) => {
    return String(
      product?.category ||
        product?.categoryName ||
        ""
    ).trim();
  };

  // Get category name from category object
  const getCategoryName = (category) => {
    return String(
      category?.categoryName ||
        category?.name ||
        ""
    ).trim();
  };

  // Handle Add Product input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setNewProduct((previousProduct) => ({
      ...previousProduct,
      [name]: value,
    }));
  };

  // Reset Add Product form
  const resetForm = () => {
    setNewProduct({
      productName: "",
      category: "",
      price: "",
      quantity: "",
      supplier: "",
    });

    setShowForm(false);
  };

  // Add Product
  const addProduct = async (e) => {
    e.preventDefault();

    const productName = newProduct.productName.trim();
    const category = newProduct.category.trim();
    const supplier = newProduct.supplier.trim();

    const price = Number(newProduct.price);
    const quantity = Number(newProduct.quantity);

    // Validation
    if (
      !productName ||
      !category ||
      !newProduct.price ||
      !newProduct.quantity ||
      !supplier
    ) {
      alert("Please fill all product details");
      return;
    }

    if (price < 0 || Number.isNaN(price)) {
      alert("Please enter a valid price");
      return;
    }

    if (quantity < 0 || Number.isNaN(quantity)) {
      alert("Please enter a valid quantity");
      return;
    }

    const productData = {
      productName,
      category,
      price,
      quantity,
      supplier,
    };

    try {
      setLoading(true);

      console.log(
        "Sending Product Data:",
        productData
      );

      // Save product to MongoDB
      const response = await api.post(
        "/products",
        productData
      );

      console.log(
        "Add Product Response:",
        response.data
      );

      // Get newly created product
      const createdProduct =
        response.data?.product ||
        response.data?.newProduct ||
        response.data?.data;

      if (createdProduct) {
        // Add new product to frontend state
        setProducts((previousProducts) => [
          ...previousProducts,
          createdProduct,
        ]);
      } else {
        // If backend does not return product,
        // fetch all products again
        await fetchProducts();
      }

      alert("Product added successfully ✅");

      resetForm();
    } catch (error) {
      console.log(
        "Add Product Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add product"
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch Products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/products"
      );

      console.log(
        "Products from Backend:",
        response.data
      );

      const productData = Array.isArray(
        response.data
      )
        ? response.data
        : Array.isArray(
            response.data?.products
          )
        ? response.data.products
        : [];

      setProducts(productData);
    } catch (error) {
      console.log(
        "Fetch Products Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    if (!id) {
      alert("Product ID not found");
      return;
    }

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      await api.delete(
        `/products/${id}`
      );

      // Remove product from frontend
      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) =>
            (product._id || product.id) !== id
        )
      );

      alert(
        "Product deleted successfully"
      );
    } catch (error) {
      console.log(
        "Delete Product Error:",
        error.response?.data ||
          error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete product"
      );
    } finally {
      setLoading(false);
    }
  };

  // Search + Category Filter
  const filteredProducts =
    safeProducts.filter((product) => {
      const productName = normalizeValue(
        getProductName(product)
      );

      const productCategory =
        normalizeValue(
          getProductCategory(product)
        );

      const searchText =
        normalizeValue(search);

      const selectedCategory =
        normalizeValue(categoryFilter);

      const matchesSearch =
        productName.includes(searchText);

      const matchesCategory =
        selectedCategory === "all" ||
        productCategory === selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  return (
    <div className="products">

      <h2>📦 Products</h2>

      {/* TOP BAR */}
      <div className="top-bar">

        <button
          className="add-btn"
          onClick={() =>
            setShowForm(!showForm)
          }
          disabled={loading}
        >
          ➕ Add Product
        </button>

        <input
          type="text"
          className="search"
          placeholder="🔍 Search Product..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          className="filter"
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(
              e.target.value
            )
          }
        >
          <option value="All">
            All Categories
          </option>

          {safeCategories.map(
            (category, index) => {
              const categoryName =
                getCategoryName(category);

              if (!categoryName) {
                return null;
              }

              return (
                <option
                  key={
                    category?._id ||
                    category?.id ||
                    index
                  }
                  value={categoryName}
                >
                  {categoryName}
                </option>
              );
            }
          )}
        </select>

        {(search ||
          categoryFilter !== "All") && (
          <button
            className="clear-btn"
            onClick={() => {
              setSearch("");
              setCategoryFilter("All");
            }}
          >
            Clear
          </button>
        )}

      </div>

      {/* ADD PRODUCT FORM */}
      {showForm && (
        <div className="product-form">

          <h3>➕ Add New Product</h3>

          <form onSubmit={addProduct}>

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              value={
                newProduct.productName
              }
              onChange={handleChange}
              disabled={loading}
            />

            <label>
              Category
            </label>

            <select
              name="category"
              value={
                newProduct.category
              }
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">
                Select Category
              </option>

              {safeCategories.map(
                (category, index) => {
                  const categoryName =
                    getCategoryName(category);

                  if (!categoryName) {
                    return null;
                  }

                  return (
                    <option
                      key={
                        category?._id ||
                        category?.id ||
                        index
                      }
                      value={categoryName}
                    >
                      {categoryName}
                    </option>
                  );
                }
              )}
            </select>

            <label>
              Price
            </label>

            <input
              type="number"
              name="price"
              placeholder="Enter Price"
              min="0"
              value={
                newProduct.price
              }
              onChange={handleChange}
              disabled={loading}
            />

            <label>
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              placeholder="Enter Quantity"
              min="0"
              value={
                newProduct.quantity
              }
              onChange={handleChange}
              disabled={loading}
            />

            <label>
              Supplier
            </label>

            <input
              type="text"
              name="supplier"
              placeholder="Enter Supplier Name"
              value={
                newProduct.supplier
              }
              onChange={handleChange}
              disabled={loading}
            />

            <div className="form-buttons">

              <button
                type="submit"
                className="save-btn"
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "💾 Save Product"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
                disabled={loading}
              >
                ❌ Cancel
              </button>

            </div>

          </form>

        </div>
      )}

      {/* PRODUCTS TABLE */}
      <div className="table-box">

        <table>

          <thead>
            <tr>
              <th>S.No</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {loading &&
            safeProducts.length === 0 ? (
              <tr>
                <td colSpan="7">
                  ⏳ Loading Products...
                </td>
              </tr>
            ) : filteredProducts.length >
              0 ? (
              filteredProducts.map(
                (product, index) => {

                  const productId =
                    product?._id ||
                    product?.id;

                  const productName =
                    getProductName(
                      product
                    ) ||
                    "Unnamed Product";

                  const productCategory =
                    getProductCategory(
                      product
                    ) || "-";

                  return (
                    <tr
                      key={
                        productId ||
                        index
                      }
                    >

                      <td>
                        {index + 1}
                      </td>

                      <td>
                        {productName}
                      </td>

                      <td>
                        {productCategory}
                      </td>

                      <td>
                        ₹
                        {Number(
                          product?.price || 0
                        )}
                      </td>

                      <td>
                        {Number(
                          product?.quantity || 0
                        )}
                      </td>

                      <td>
                        {product?.supplier ||
                          "-"}
                      </td>

                      <td>

                        <button
                          className="view-btn"
                          onClick={() =>
                            navigate(
                              `/products/${productId}`
                            )
                          }
                          disabled={
                            !productId
                          }
                        >
                          👁 View
                        </button>

                        <button
                          className="edit-btn"
                          onClick={() =>
                            navigate(
                              `/products/edit/${productId}`
                            )
                          }
                          disabled={
                            !productId
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
                            loading ||
                            !productId
                          }
                        >
                          🗑 Delete
                        </button>

                      </td>

                    </tr>
                  );
                }
              )
            ) : (
              <tr>
                <td colSpan="7">
                  📦 No Products Found
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

