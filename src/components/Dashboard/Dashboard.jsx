import './Dashboard.css' 
import { useState } from 'react';

function Dashboard(){
    function addproduct(){
    }
    return(
        <div className="dashboard-container">
            <h2>Inventory Management Dashboard</h2>
            
        
        <div className="cards">
            <div className="card">
             <h3>Total Products</h3> 
                    <p>120</p>
                </div>
                <div className="card">
                    <h3>Low Stock</h3>
                    <p>10</p> 
                </div>
                <div className="card">
                    <h3>Out of Stock</h3>
                    <p>5</p>
                </div>
                <div className="card">
                    <h3>Categories</h3> 
                    <p>8</p>
                </div>
            </div>

            
    <h3 className="table-title">Recent Product Table</h3>
        <div className="table-wrapper">
            <table>
                <th> 
                    <tr>
                        <th>ID</th>
                        <th>Product Name</th>
                        <th>Category</th> 
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                    </th>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Laptop</td>
                    <td>Electronics</td>
                    <td>20</td>
                    <td>₹50,000</td>
                    <td><span className="status in-stock">In Stock</span></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Mouse</td>
                        <td>Electronics</td> 
                        <td>15</td>
                        <td>₹1,000</td>
                        <td><span className="status in-stock">In Stock</span></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Keyboard</td>
                        <td>Electronics</td>
                        <td>10</td> 
                        <td>₹2,000</td>
                        <td><span className="status in-stock">In Stock</span></td> {/* td close */}
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Refrigerator</td> 
                        <td>Electronics</td>
                        <td>5</td>
                        <td>₹30,000</td>
                        <td><span className="status out-stock">Out of Stock</span></td> {/* spelling fix */}
                    </tr>
                    <tr>
                        <td>5</td>
                            <td>School Bags</td>
                            <td>Bags</td>
                            <td>50</td>
                            <td>₹1,000</td>
                            <td><span className="status in-stock">In Stock</span></td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>Notebooks</td>
                            <td>Stationery</td> 
                            <td>100</td>
                            <td>₹50</td>
                            <td><span className="status in-stock">In Stock</span></td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>Pen</td>
                            <td>Stationery</td>
                            <td>150</td>
                            <td>₹50</td>
                            <td><span className="status low-stock">Low Stock</span></td>

                        </tr>
                        <tr>
                            <td>8</td>
                            <td>USB Cable</td>
                            <td>Accessories</td>
                            <td>100</td>
                            <td>₹200</td>
                            <td><span className="status out-stock">Out of Stock</span></td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>Water Bottle</td>
                            <td>Accessories</td>
                            <td>200</td>
                            <td>₹150</td>
                            <td><span className="status in-stock">In Stock</span></td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>Monitor</td>
                            <td>Electronics</td>
                            <td>100</td>
                            <td>₹1,500</td>
                            <td><span className="status out-stock">Out of Stock</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
};
export default Dashboard;






























































































































































































































































































































































































































































































































































































































































































































































































































































































































































    