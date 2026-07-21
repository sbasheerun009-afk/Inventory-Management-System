import { useEffect, useState } from "react";
import api from "../../api/api";
import "./Suppliers.css";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [newSupplier, setNewSupplier] = useState({
    suppliername: "",
    email: "",
    phone: "",
    address: "",
  });

  // GET ALL SUPPLIERS
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/suppliers");

      console.log("Suppliers from Backend:", response.data);

      setSuppliers(response.data.suppliers || []);
    } catch (error) {
      console.log(
        "Fetch Suppliers Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to fetch suppliers"
      );
    } finally {
      setLoading(false);
    }
  };

  // FETCH SUPPLIERS WHEN PAGE LOADS
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setNewSupplier({
      ...newSupplier,
      [e.target.name]: e.target.value,
    });
  };

  // ADD SUPPLIER
  const addSupplier = async (e) => {
    e.preventDefault();

    if (
      !newSupplier.suppliername.trim() ||
      !newSupplier.email.trim() ||
      !newSupplier.phone.trim() ||
      !newSupplier.address.trim()
    ) {
      alert("Please fill all fields");
      return;
    }

    if (newSupplier.phone.length !== 10) {
      alert("Phone number must contain exactly 10 digits");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const supplierData = {
        suppliername: newSupplier.suppliername.trim(),
        email: newSupplier.email.trim(),
        phone: newSupplier.phone.trim(),
        address: newSupplier.address.trim(),
      };

      const response = await api.post(
        "/suppliers",
        supplierData
      );

      console.log("Added Supplier:", response.data);

      setSuppliers([
        ...suppliers,
        response.data.supplier,
      ]);

      // RESET FORM
      setNewSupplier({
        suppliername: "",
        email: "",
        phone: "",
        address: "",
      });

      setShowForm(false);

      alert("Supplier added successfully");
    } catch (error) {
      console.log(
        "Add Supplier Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to add supplier"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE SUPPLIER
  const deleteSupplier = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this supplier?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);
      setError("");

      await api.delete(`/suppliers/${id}`);

      setSuppliers(
        suppliers.filter(
          (item) => item._id !== id
        )
      );

      alert("Supplier deleted successfully");
    } catch (error) {
      console.log(
        "Delete Supplier Error:",
        error.response?.data || error.message
      );

      setError(
        error.response?.data?.message ||
          "Failed to delete supplier"
      );
    } finally {
      setLoading(false);
    }
  };

  // RESET FORM
  const resetForm = () => {
    setNewSupplier({
      suppliername: "",
      email: "",
      phone: "",
      address: "",
    });

    setShowForm(false);
  };

  return (
    <div className="suppliers">
      <h2>🚚 Suppliers</h2>

      {/* ADD SUPPLIER BUTTON */}
      <button
        className="add-btn"
        onClick={() => setShowForm(!showForm)}
        disabled={loading}
      >
        ➕ Add Supplier
      </button>

      {/* ERROR MESSAGE */}
      {error && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            padding: "10px",
          }}
        >
          ❌ {error}
        </p>
      )}

      {/* SUPPLIER FORM */}
      {showForm && (
        <div className="supplier-form">
          <h3>Add New Supplier</h3>

          {/* SUPPLIER NAME */}
          <input
            type="text"
            name="suppliername"
            placeholder="Supplier Name"
            value={newSupplier.suppliername}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newSupplier.email}
            onChange={handleChange}
          />

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            maxLength="10"
            value={newSupplier.phone}
            onChange={handleChange}
          />

          {/* ADDRESS */}
          <textarea
            name="address"
            placeholder="Address"
            value={newSupplier.address}
            onChange={handleChange}
          />

          {/* SAVE BUTTON */}
          <button
            className="save-btn"
            onClick={addSupplier}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>

          {/* CANCEL BUTTON */}
          <button
            className="cancel-btn"
            onClick={resetForm}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      )}

      {/* SUPPLIER TABLE */}
      <div className="table-box">
        <table>
          <thead>
            <tr>
              <th>S.No</th>
              <th>Supplier Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {/* LOADING */}
            {loading && suppliers.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  ⏳ Loading Suppliers...
                </td>
              </tr>
            ) : suppliers.length === 0 ? (
              /* NO DATA */
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  🚚 No Suppliers Found
                </td>
              </tr>
            ) : (
              /* DISPLAY SUPPLIERS */
              suppliers.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>{item.suppliername}</td>

                  <td>{item.email}</td>

                  <td>{item.phone}</td>

                  <td>{item.address}</td>

                  <td>
                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteSupplier(item._id)
                      }
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
    </div>
  );
}

export default Suppliers;

