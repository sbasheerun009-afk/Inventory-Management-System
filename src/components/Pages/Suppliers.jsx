// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import "./Suppliers.css";
// import api from "../../api/api";

// function Suppliers() {
//   const [search, setSearch] = useState("");
//   const [suppliers, setSuppliers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchSuppliers = async () => {
//     try {
//       setLoading(true);

//       const response = await api.get("/suppliers");

//       setSuppliers(response.data.suppliers || []);
//     } catch (error) {
//       console.log(
//         "Fetch Suppliers Error:",
//         error.response?.data || error.message
//       );

//       alert("Failed to fetch suppliers");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     document.title = "Suppliers | Inventory Management System";
//     fetchSuppliers();
//   }, []);

//   const addSupplier = async () => {
//     const supplierName = prompt("Enter Supplier Name");
//     const phone = prompt("Enter Contact Number");
//     const email = prompt("Enter Email");
//     const address = prompt("Enter Address");

//     if (
//       !supplierName?.trim() ||
//       !phone?.trim() ||
//       !email?.trim() ||
//       !address?.trim()
//     ) {
//       alert("Please fill all supplier details");
//       return;
//     }

//     try {
//       setLoading(true);

//       const supplierData = {
//         supplierName: supplierName.trim(),
//         phone: phone.trim(),
//         email: email.trim(),
//         address: address.trim(),
//       };

//       await api.post("/suppliers", supplierData);

//       alert("Supplier Added Successfully");

//       await fetchSuppliers();
//     } catch (error) {
//       console.log(
//         "Add Supplier Error:",
//         error.response?.data || error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           "Failed to add supplier"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteSupplier = async (id) => {
//     if (!id) {
//       alert("Supplier ID not found");
//       return;
//     }

//     if (!window.confirm("Delete this supplier?")) {
//       return;
//     }

//     try {
//       setLoading(true);

//       await api.delete(`/suppliers/${id}`);

//       alert("Supplier Deleted Successfully");

//       await fetchSuppliers();
//     } catch (error) {
//       console.log(
//         "Delete Supplier Error:",
//         error.response?.data || error.message
//       );

//       alert(
//         error.response?.data?.message ||
//           "Failed to delete supplier"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredSuppliers = suppliers.filter((supplier) =>
//     (supplier.supplierName || "")
//       .toLowerCase()
//       .includes(search.toLowerCase())
//   );

//   return (
//     <div className="suppliers">
//       <h2>🚚 Suppliers Management</h2>

//       <div className="top-bar">
//         <button
//           className="add-btn"
//           onClick={addSupplier}
//           disabled={loading}
//         >
//           ➕ Add Supplier
//         </button>

//         <input
//           type="text"
//           className="search"
//           placeholder="🔍 Search Supplier..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Supplier Name</th>
//             <th>Contact</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {loading && suppliers.length === 0 ? (
//             <tr>
//               <td colSpan="6">
//                 ⏳ Loading Suppliers...
//               </td>
//             </tr>
//           ) : filteredSuppliers.length > 0 ? (
//             filteredSuppliers.map((supplier, index) => (
//               <tr key={supplier._id}>
//                 <td>{index + 1}</td>

//                 <td>{supplier.supplierName}</td>

//                 <td>{supplier.phone}</td>

//                 <td>{supplier.email}</td>

//                 <td>{supplier.address}</td>

//                 <td>
//                   <Link
//                     to={`/suppliers/${supplier._id}`}
//                   >
//                     <button className="view-btn">
//                       👁️ View
//                     </button>
//                   </Link>

//                   <Link
//                     to={`/suppliers/edit/${supplier._id}`}
//                   >
//                     <button className="edit-btn">
//                       ✏️ Edit
//                     </button>
//                   </Link>

//                   <button
//                     className="delete-btn"
//                     onClick={() =>
//                       deleteSupplier(supplier._id)
//                     }
//                     disabled={loading}
//                   >
//                     🗑 Delete
//                   </button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">
//                 📦 No Suppliers Found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Suppliers;
import { useEffect, useState } from "react";
import "./Suppliers.css";
import api from "../../api/api";

function Suppliers() {
  const [search, setSearch] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newSupplier, setNewSupplier] = useState({
    supplierName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch Suppliers
  const fetchSuppliers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/suppliers");

      console.log("Suppliers:", response.data);

      setSuppliers(
        response.data.suppliers || response.data || []
      );
    } catch (error) {
      console.log(
        "Fetch Suppliers Error:",
        error.response?.data || error.message
      );

      alert("Failed to fetch suppliers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page loads
  useEffect(() => {
    document.title = "Suppliers | Inventory Management System";
    fetchSuppliers();
  }, []);

  // Open Add Supplier Form
  const openAddForm = () => {
    setNewSupplier({
      supplierName: "",
      email: "",
      phone: "",
      address: "",
    });

    setShowForm(true);
  };

  // Reset Form
  const resetForm = () => {
    setNewSupplier({
      supplierName: "",
      email: "",
      phone: "",
      address: "",
    });

    setShowForm(false);
  };

  // Add Supplier
  const addSupplier = async () => {
    if (
      !newSupplier.supplierName.trim() ||
      !newSupplier.email.trim() ||
      !newSupplier.phone.trim() ||
      !newSupplier.address.trim()
    ) {
      alert("Please fill all supplier details");
      return;
    }

    try {
      setLoading(true);

      const supplierData = {
        supplierName: newSupplier.supplierName.trim(),
        email: newSupplier.email.trim(),
        phone: newSupplier.phone.trim(),
        address: newSupplier.address.trim(),
      };

      console.log("Sending Supplier:", supplierData);

      await api.post("/suppliers", supplierData);

      alert("Supplier Added Successfully");

      resetForm();

      await fetchSuppliers();
    } catch (error) {
      console.log(
        "Add Supplier Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add supplier"
      );
    } finally {
      setLoading(false);
    }
  };

  // Delete Supplier
  const deleteSupplier = async (id) => {
    if (!id) {
      alert("Supplier ID not found");
      return;
    }

    if (!window.confirm("Delete this supplier?")) {
      return;
    }

    try {
      setLoading(true);

      await api.delete(`/suppliers/${id}`);

      alert("Supplier Deleted Successfully");

      await fetchSuppliers();
    } catch (error) {
      console.log(
        "Delete Supplier Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete supplier"
      );
    } finally {
      setLoading(false);
    }
  };

  // Search
  const filteredSuppliers = suppliers.filter((supplier) =>
    (supplier.supplierName || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="suppliers">

      <h2>🚚 Suppliers</h2>

      {/* TOP BAR */}
      <div className="top-bar">

        <button
          className="add-btn"
          onClick={openAddForm}
          disabled={loading}
        >
          ➕ Add Supplier
        </button>

        <input
          type="text"
          className="search"
          placeholder="🔍 Search Supplier"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>

      {/* ADD SUPPLIER FORM */}
      {showForm && (
        <div className="supplier-form">

          <h3>Add New Supplier</h3>

          {/* SUPPLIER NAME */}
          <input
            type="text"
            placeholder="Supplier Name"
            value={newSupplier.supplierName}
            onChange={(e) =>
              setNewSupplier({
                ...newSupplier,
                supplierName: e.target.value,
              })
            }
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Email"
            value={newSupplier.email}
            onChange={(e) =>
              setNewSupplier({
                ...newSupplier,
                email: e.target.value,
              })
            }
          />

          {/* PHONE */}
          <input
            type="text"
            placeholder="Phone"
            value={newSupplier.phone}
            onChange={(e) =>
              setNewSupplier({
                ...newSupplier,
                phone: e.target.value,
              })
            }
          />

          {/* ADDRESS */}
          <input
            type="text"
            placeholder="Address"
            value={newSupplier.address}
            onChange={(e) =>
              setNewSupplier({
                ...newSupplier,
                address: e.target.value,
              })
            }
          />

          {/* BUTTONS */}
          <div>

            <button
              className="save-btn"
              onClick={addSupplier}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
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

      {/* SUPPLIER TABLE */}
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

          {loading && suppliers.length === 0 ? (

            <tr>
              <td colSpan="6">
                ⏳ Loading Suppliers...
              </td>
            </tr>

          ) : filteredSuppliers.length > 0 ? (

            filteredSuppliers.map(
              (supplier, index) => (

                <tr
                  key={
                    supplier._id || index
                  }
                >

                  <td>{index + 1}</td>

                  <td>
                    {supplier.supplierName}
                  </td>

                  <td>
                    {supplier.phone}
                  </td>

                  <td>
                    {supplier.email}
                  </td>

                  <td>
                    {supplier.address}
                  </td>

                  <td>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteSupplier(
                          supplier._id
                        )
                      }
                      disabled={loading}
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>

              )
            )

          ) : (

            <tr>
              <td colSpan="6">
                📦 No Suppliers Available
              </td>
            </tr>

          )}

        </tbody>

      </table>

    </div>
  );
}

export default Suppliers;
