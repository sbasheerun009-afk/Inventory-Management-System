import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";

function SupplierDetails() {
  const { id } = useParams();

  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await api.get(
          `/suppliers/${id}`
        );

        setSupplier(response.data.supplier);
      } catch (error) {
        console.log(
          "Fetch Supplier Error:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  if (loading) {
    return <h3>⏳ Loading Supplier...</h3>;
  }

  if (!supplier) {
    return <h3>❌ Supplier Not Found</h3>;
  }

  return (
    <div className="supplier-details">
      <h2>🚚 Supplier Details</h2>

      <div className="details-card">
        <p>
          <strong>Supplier Name:</strong>{" "}
          {supplier.supplierName}
        </p>

        <p>
          <strong>Phone:</strong>{" "}
          {supplier.phone}
        </p>

        <p>
          <strong>Email:</strong>{" "}
          {supplier.email}
        </p>

        <p>
          <strong>Address:</strong>{" "}
          {supplier.address}
        </p>

        <Link to="/suppliers">
          <button className="back-btn">
            ⬅ Back to Suppliers
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SupplierDetails;