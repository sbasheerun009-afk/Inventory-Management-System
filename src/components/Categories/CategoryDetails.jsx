import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api/api";
import "./Category.css";

function CategoryDetails() {
const { id } = useParams();

const [category, setCategory] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

const fetchCategory = async () => {
try {
setLoading(true);
setError("");
  const response = await api.get(`/categories/${id}`);

  console.log("Category Details:", response.data);

  const data =
    response.data.category || response.data;

  setCategory(data);
} catch (error) {
  console.log(
    "Fetch Category Error:",
    error.response?.data || error.message
  );

  setError(
    error.response?.data?.message ||
      "Failed to fetch category details"
  );
} finally {
  setLoading(false);
}


};

useEffect(() => {
fetchCategory();
}, [id]);

if (loading) {
return ( <div className="categories"> <h2>📂 Category Details</h2>

```
    <p style={{ textAlign: "center" }}>
      ⏳ Loading Category...
    </p>
  </div>
);


}

if (error) {
return ( <div className="categories"> <h2>📂 Category Details</h2>


    <p
      style={{
        color: "red",
        textAlign: "center",
      }}
    >
      ❌ {error}
    </p>

    <Link to="/categories">
      <button className="cancel-btn">
        ⬅ Back to Categories
      </button>
    </Link>
  </div>
);

}

if (!category) {
return ( <div className="categories"> <h2>❌ Category Not Found</h2>


    <Link to="/categories">
      <button className="cancel-btn">
        ⬅ Back to Categories
      </button>
    </Link>
  </div>
);


}

return ( <div className="categories"> <h2>📂 Category Details</h2>

  <div className="category-form">
    <h3>Category Information</h3>

    <p>
      <strong>Category ID:</strong>{" "}
      {category._id}
    </p>

    <p>
      <strong>Category Name:</strong>{" "}
      {category.categoryName}
    </p>

    <p>
      <strong>Description:</strong>{" "}
      {category.description}
    </p>

    <Link to="/categories">
      <button className="cancel-btn">
        ⬅ Back to Categories
      </button>
    </Link>
  </div>
</div>


);
}

export default CategoryDetails;
