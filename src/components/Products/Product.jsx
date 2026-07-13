import { useState, useEffect } from "react";
import "./Product.css";


function Products({ products, setProducts, orders, setOrders }) {


  const [search, setSearch] = useState("");

  const [showForm, setShowForm] = useState(false);


  const [orderQty, setOrderQty] = useState({});



  const [newProduct, setNewProduct] = useState({

    name:"",
    category:"",
    price:"",
    quantity:""

  });





  useEffect(()=>{

    document.title =
    "Products | Inventory Management System";

  },[]);







  // ADD PRODUCT

  const addProduct = ()=>{


    if(
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price ||
      !newProduct.quantity
    ){

      alert("Please fill all details");

      return;

    }



    const product={

      id:Date.now(),

      name:newProduct.name,

      category:newProduct.category,

      price:Number(newProduct.price),

      quantity:Number(newProduct.quantity)

    };



    setProducts([

      ...products,

      product

    ]);



    setNewProduct({

      name:"",
      category:"",
      price:"",
      quantity:""

    });



    setShowForm(false);


    alert("✅ Product Added Successfully");


  };








  // DELETE PRODUCT

  const deleteProduct=(id)=>{


    setProducts(

      products.filter(

        item=>item.id !== id

      )

    );


  };









  // ORDER PRODUCT

  const orderProduct=(product)=>{


    const qty = Number(orderQty[product.id]);



    if(!qty || qty<=0){

      alert("Enter Order Quantity");

      return;

    }




    if(product.quantity < qty){

      alert("❌ Stock Not Available");

      return;

    }







    const newOrder={


      id:Date.now(),

      name:product.name,

      category:product.category,

      price:product.price,

      quantity:qty,

      total:product.price * qty,

      status:"Completed"


    };




    setOrders([

      ...orders,

      newOrder

    ]);







    const updatedProducts = products.map(item=>{


      if(item.id === product.id){


        return{

          ...item,

          quantity:item.quantity - qty

        };


      }


      return item;


    });




    setProducts(updatedProducts);




    setOrderQty({

      ...orderQty,

      [product.id]:""

    });



    alert("🛒 Order Placed Successfully");


  };









  const getStatus=(qty)=>{


    if(qty===0)

      return "❌ Out Of Stock";


    if(qty<=5)

      return "⚠️ Low Stock";


    return "✅ In Stock";


  };







  const filteredProducts = products.filter(item=>

    item.name
    .toLowerCase()
    .includes(search.toLowerCase())

  );







return(

<div className="products">


<h2>
📦 Products Management
</h2>




<div className="top-bar">


<button

className="add-btn"

onClick={()=>setShowForm(!showForm)}

>

➕ Add Product

</button>



<input

type="text"

placeholder="🔍 Search Product"

value={search}

className="search"

onChange={(e)=>setSearch(e.target.value)}

/>


</div>







{
showForm &&

<div className="product-form">


<input
placeholder="Product Name"
value={newProduct.name}
onChange={(e)=>
setNewProduct({
...newProduct,
name:e.target.value
})
}
/>



<input
placeholder="Category"
value={newProduct.category}
onChange={(e)=>
setNewProduct({
...newProduct,
category:e.target.value
})
}
/>




<input
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
placeholder="Quantity"
value={newProduct.quantity}
onChange={(e)=>
setNewProduct({
...newProduct,
quantity:e.target.value
})
}
/>



<button
className="save-btn"
onClick={addProduct}
>

Save Product

</button>


</div>

}








<table>


<thead>

<tr>

<th>ID</th>

<th>Name</th>

<th>Category</th>

<th>Price</th>

<th>Quantity</th>

<th>Status</th>

<th>Order Qty</th>

<th>Action</th>


</tr>


</thead>





<tbody>


{

filteredProducts.map(item=>(


<tr key={item.id}>


<td>{item.id}</td>


<td>{item.name}</td>


<td>{item.category}</td>


<td>₹{item.price}</td>


<td>{item.quantity}</td>


<td>{getStatus(item.quantity)}</td>





<td>


<input

type="number"

placeholder="Qty"

value={orderQty[item.id] || ""}

onChange={(e)=>

setOrderQty({

...orderQty,

[item.id]:e.target.value

})

}


/>



<br/>


<button

className="order-btn"

onClick={()=>orderProduct(item)}

>

🛒 Order

</button>



</td>






<td>


<button className="edit-btn">

✏️ Edit

</button>



<button

className="delete-btn"

onClick={()=>deleteProduct(item.id)}

>

🗑 Delete

</button>



</td>


</tr>


))


}



</tbody>



</table>



</div>


);


}


export default Products;