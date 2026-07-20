import { useState, useEffect } from "react";
import "./Product.css";
import api from "../../api/api";

function Products({ products, setProducts, categories }) {

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [supplierQty, setSupplierQty] = useState({});

  const [newProduct, setNewProduct] = useState({
    productname: "",
    category: "",
    price: "",
    quantity: "",
  });
 // GET PRODUCTS FROM BACKEND
const fetchProducts = async () => {
  try {
    const response = await api.get("/products");

    console.log(response.data);

    setProducts(response.data.products);

  } catch (error) {
    console.log(error);
  }
};


useEffect(() => {
  document.title = "Products | Inventory";
  fetchProducts();
}, []);


// ADD PRODUCT + UPDATE PRODUCT

const addProduct = async () => {

  if (
    !newProduct.productname.trim() ||
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
  try {

    if(editMode){

      const response = await api.put(
        `/products/${editId}`,
        {
          productname:newProduct.productname,
          category:newProduct.category,
          price:Number(newProduct.price),
          quantity:Number(newProduct.quantity)
        }
      );
      setProducts(
        products.map((p)=>
          p._id === editId
          ? response.data.product
          : p
        )
      );
      alert("Product Updated Successfully");
    }
    else{
      const response = await api.post("/products",
        {
          productname:newProduct.productname,
          category:newProduct.category,
          price:Number(newProduct.price),
          quantity:Number(newProduct.quantity)
        }
      );
      setProducts([
        response.data.product,
        ...products
      ]);
      alert("Product Added Successfully");
    } setNewProduct({
      productname:"",
      category:"",
      price:"",
      quantity:""
    });
    setShowForm(false);
    setEditMode(false);
    setEditId(null);
  }
  catch(error){
    console.log(error);
  }};
// EDIT PRODUCT

const handleEdit = (item)=>{

  setEditMode(true);

  setEditId(item._id);


  setNewProduct({

    productname:item.productname,
    category:item.category,
    price:item.price,
    quantity:item.quantity
  });
  setShowForm(true);
};
// DELETE PRODUCT
const deleteProduct = async(id)=>{
 if(window.confirm("Delete this product?")){
  try{
    await api.delete(`/products/${id}`);
    setProducts(
      products.filter(
        (p)=>p._id !== id
      )
    );
    alert("Product Deleted Successfully");
  }
  catch(error){
    console.log(error)
  }
 }};

// ADD STOCK

const handleAddStock=(product)=>{


 const qty = Number(
   supplierQty[product._id]
 );


 if(!qty || qty<=0){

   alert("Enter valid quantity");
   return;

 }



 setProducts(

  products.map((p)=>

    p._id===product._id

    ?

    {
      ...p,
      quantity:p.quantity + qty
    }

    :

    p

  )

 );


 setSupplierQty({

  ...supplierQty,

  [product._id]:""

 });


 alert("Stock Added Successfully");


};
const getStatus=(qty)=>{
 if(qty<=0)
 return "❌ Out Of Stock";
 if(qty<=5)
 return "⚠️ Low Stock";
 return "✅ In Stock";

};
const filteredProducts = products.filter((p)=>

 p.productname
 .toLowerCase()
 .includes(search.toLowerCase())

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
            productname:"",
            category:"",
            price:"",
            quantity:""
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
        onChange={(e)=>setSearch(e.target.value)}
      />
    </div>
    {showForm && (

      <div className="product-form">

        <h3>
          {editMode ? "Edit Product" : "Add New Product"}
        </h3>


        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.productname}

          onChange={(e)=>
            setNewProduct({
              ...newProduct,
              productname:e.target.value
            })
          }
        />
        <select
          value={newProduct.category}

          onChange={(e)=>
            setNewProduct({
              ...newProduct,
              category:e.target.value
            })
          }
        >

          <option value="">
            Select Category
          </option>


          {categories.map((item)=>(

            <option
              key={item._id}
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

          onChange={(e)=>
            setNewProduct({
              ...newProduct,
              price:e.target.value
            })
          }

        />
        <input
          type="number"
          min="0"
          placeholder="Quantity"

          value={newProduct.quantity}

          onChange={(e)=>
            setNewProduct({
              ...newProduct,
              quantity:e.target.value
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

            onClick={()=>{

              setShowForm(false);
              setEditMode(false);
              setEditId(null);

              setNewProduct({

                productname:"",
                category:"",
                price:"",
                quantity:""

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
            <th>productame</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock Qty</th>
            <th>Status</th>
            <th>Add Stock</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
        {
        filteredProducts.length > 0 ?
        filteredProducts.map((item,index)=>(
          <tr key={item._id}>
            <td>{index+1}</td>
            <td>
              {item.productname}
            </td>
            <td>
              {item.category}
            </td>
            <td>
              ₹{item.price}
            </td>
            <td>
              {item.quantity}
            </td>
            <td>
              {getStatus(item.quantity)}
            </td>

            <td>


              <input

                type="number"

                min="1"

                className="qty-input"

                placeholder="Qty"


                value={
                  supplierQty[item._id] || ""
                }


                onChange={(e)=>

                  setSupplierQty({ ...supplierQty,
                    [item._id]:e.target.value
                  })
                }
              />
              <button
                className="supplier-btn"
                onClick={()=>handleAddStock(item)}>

                📦 Add

              </button>
            </td>
            <td>
              <button
                className="edit-btn"
                onClick={()=>handleEdit(item)}
              >
                ✏️ Edit
              </button>
              <button
                className="delete-btn"
                onClick={()=>deleteProduct(item._id)}
              >
                🗑 Delete
              </button>
            </td>
          </tr>
        ))
        :(
        <tr>
             <td

              colSpan="8"

              style={{
                textAlign:"center",
                padding:"15px"
              }}

            >
              No Products Found
            </td>
          </tr>
        )
        }
        </tbody>
      </table>
      </div>
    </div>
);
}
 export default Products;