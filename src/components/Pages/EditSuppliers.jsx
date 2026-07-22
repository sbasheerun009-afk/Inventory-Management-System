import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";

function EditSupplier() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [supplier, setSupplier] = useState({
    supplierName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await api.get(
          `/suppliers/${id}`
        );

        const data = response.data.supplier;

        setSupplier({
          supplierName: data.supplierName || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (error) {
        console.log(
          "Fetch Supplier Error:",
          error.response?.data || error.message
        );

        alert("Failed to fetch supplier");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  const handleChange = (e) => {
    setSupplier({
      ...supplier,
      [e.target.name]: e.target.value,
    });
  };

  const updateSupplier = async (e) => {
    e.preventDefault();

    if (
      !supplier.supplierName.trim() ||
      !supplier.email.trim() ||
      !supplier.phone.trim() ||
      !supplier.address.trim()
    ) {
      alert("Please fill all details");
      return;
    }

    try {
      setLoading(true);

      await api.put(
        `/suppliers/${id}`,
        supplier
      );

      alert("Supplier Updated Successfully");

      navigate("/suppliers");
    } catch (error) {
      console.log(
        "Update Supplier Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update supplier"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h3>⏳ Loading Supplier...</h3>;
  }

  return (
    <div className="edit-supplier">
      <h2>✏️ Edit Supplier</h2>

      <form onSubmit={updateSupplier}>
        <input
          type="text"
          name="supplierName"
          placeholder="Supplier Name"
          value={supplier.supplierName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={supplier.email}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={supplier.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={supplier.address}
          onChange={handleChange}
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Update Supplier"}
        </button>

        <button
          type="button"
          onClick={() =>
            navigate("/suppliers")
          }
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditSupplier;