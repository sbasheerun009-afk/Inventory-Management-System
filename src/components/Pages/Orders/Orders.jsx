import { useState } from "react";
import "./Orders.css";

function Orders({ orders, setOrders, products, setProducts }) {

  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const placeOrder = () => {
    if (!selectedProduct || !quantity) {
      alert("Please select product and quantity");
      return;
    }
const product = products.find(
    (item) => item.id === Number(selectedProduct)
);
if (!product) {
    alert("Product not found");
    return;
}
if (product.quantity < Number(quantity)) {
    alert("❌ Not enough stock");
    return;
}
const newOrder = {
      id: Date.now(),
      name: product.name,
      category: product.category,
      price: product.price,
      quantity: Number(quantity),
      total: product.price * Number(quantity),
      status: "Completed"
    };
setOrders([...orders,newOrder])
const updatedProducts = products.map((item) => {
if (item.id === product.id) {
  return {...item,
    quantity: item.quantity - Number(quantity)
        };
  }
return item;
});
setProducts(updatedProducts);
setSelectedProduct("");
setQuantity("");
alert("✅ Order Placed Successfully");
 };
return (
<div className="orders">
  <h2>🛒 Orders Management</h2>
  <div className="order-form">
    <select
        value={selectedProduct}
        onChange={(e)=>setSelectedProduct(e.target.value)}
    >

    <option value="">
      Select Product
    </option>
{
      products.map((item)=>(
        <option
          key={item.id}
          value={item.id}
        >
      {item.name}

      </option>
      ))}
</select>
    <input
    type="number"
    placeholder="Enter Quantity"
    value={quantity}
    onChange={(e)=>setQuantity(e.target.value)}
    />
<button onClick={placeOrder}>
  🛒 Place Order
</button>
   </div> 
   <h3>📋 Order History </h3>
{ orders.length === 0 ? (
    <p className="empty">
        No Orders Available
    </p>
) : (
   <table>
    <thead>
      <tr>

        <th>ID</th>
        <th>Product</th>
        <th>Category</th>
        <th>Quantity</th>
        <th>Total Price</th>
        <th>Status</th>
      </tr>
   </thead>
   <tbody>
    { orders.map((order)=>(
      <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.name}</td>
        <td>{order.category}</td>
        <td>{order.quantity}</td>
        <td>₹{order.total}</td>
      <td> ✅ {order.status} </td>

      </tr> 
    ))
    }
    </tbody>
    </table> )
      }  
      </div>
  );}

export default Orders;