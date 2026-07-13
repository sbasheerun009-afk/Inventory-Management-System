import { useState } from "react";
import "./Suppliers.css";

function Suppliers() {

  const [search, setSearch] = useState("");

  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "ABC Electronics",
      contact: "9876543210",
      email: "abc@gmail.com",
      address: "Hyderabad"
    },
    {
      id: 2,
      name: "Global Traders",
      contact: "9123456780",
      email: "global@gmail.com",
      address: "Vijayawada"
    },
    {
      id: 3,
      name: "Sri Lakshmi Suppliers",
      contact: "9988776655",
      email: "lakshmi@gmail.com",
      address: "Guntur"
    }
  ]);


  const addSupplier = () => {

    const name = prompt("Enter Supplier Name");
    const contact = prompt("Enter Contact Number");
    const email = prompt("Enter Email");
    const address = prompt("Enter Address");


    if(name && contact && email && address){

      const newSupplier = {
        id: Date.now(),
        name,
        contact,
        email,
        address
      };


      setSuppliers([
        ...suppliers,
        newSupplier
      ]);

    }

  };



  const deleteSupplier = (id) => {

    const confirmDelete = window.confirm(
      "Delete this supplier?"
    );


    if(confirmDelete){

      setSuppliers(
        suppliers.filter(
          (supplier)=>supplier.id !== id
        )
      );

    }

  };



  const filteredSuppliers = suppliers.filter(
    (supplier)=>
      supplier.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );


  return (

    <div className="suppliers">


      <h2>🚚 Suppliers</h2>


      <div className="top-bar">


        <button
          className="add-btn"
          onClick={addSupplier}
        >
          ➕ Add Supplier
        </button>



        <input
          type="text"
          placeholder="🔍 Search Supplier..."
          className="search"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />


      </div>




      <table>


        <thead>

          <tr>
            <th>ID</th>
            <th>Supplier Name</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Address</th>
            <th>Action</th>
          </tr>

        </thead>



        <tbody>


        {
          filteredSuppliers.length > 0 ? (

            filteredSuppliers.map((supplier)=>(

              <tr key={supplier.id}>

                <td>{supplier.id}</td>

                <td>{supplier.name}</td>

                <td>{supplier.contact}</td>

                <td>{supplier.email}</td>

                <td>{supplier.address}</td>


                <td>

                  <button
                    className="delete-btn"
                    onClick={()=>deleteSupplier(supplier.id)}
                  >
                    🗑 Delete
                  </button>

                </td>

              </tr>

            ))

          ) : (

            <tr>
              <td colSpan="6">
                No Suppliers Available
              </td>
            </tr>

          )
        }


        </tbody>


      </table>


    </div>

  );
}


export default Suppliers;