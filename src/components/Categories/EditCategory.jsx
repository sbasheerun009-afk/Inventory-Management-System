import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/api";
import "./Category.css";

function EditCategory() {
const { id } = useParams();
const navigate = useNavigate();

const [category, setCategory] = useState({
categoryName: "",
description: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

// GET CATEGORY BY ID
const fetchCategory = async () => {
try {
setLoading(true);
setError("");

  const response = await api.get(
    `/categories/${id}`
  );

  console.log(
    "Category Details:",
    response.data
  );

  const data =
    response.data.category ||
    response.data;

  setCategory({
    categoryName:
      data.categoryName || "",
    description:
      data.description || "",
  });
} catch (error) {
  console.log(
    "Fetch Category Error:",
    error.response?.data ||
      error.message
  );

  setError(
    error.response?.data?.message ||
      "Failed to fetch category"
  );
} finally {
  setLoading(false);
}

};

useEffect(() => {
fetchCategory();
}, [id]);

// UPDATE CATEGORY
const handleUpdate = async (e) => {
e.preventDefault();
if (!category.categoryName.trim()) {
  alert("Please enter category name");
  return;
}

try {
  setLoading(true);
  setError("");

  const categoryData = {
    categoryName:
      category.categoryName.trim(),
    description:
      category.description.trim(),
  };

  await api.put(
    `/categories/${id}`,
    categoryData
  );

  alert(
    "Category Updated Successfully"
  );

  navigate("/categories");
} catch (error) {
  console.log(
    "Update Category Error:",
    error.response?.data ||
      error.message
  );

  setError(
    error.response?.data?.message ||
      "Failed to update category"
  );
} finally {
  setLoading(false);
}


};

return ( <div className="categories"> <h2>✏️ Edit Category</h2>

```
  {error && (
    <div
      style={{
        color: "red",
        padding: "10px",
        textAlign: "center",
      }}
    >
      ❌ {error}
    </div>
  )}

  {loading &&
  !category.categoryName ? (
    <p
      style={{
        textAlign: "center",
      }}
    >
      ⏳ Loading Category...
    </p>
  ) : (
    <div className="category-form">
      <h3>Update Category</h3>

      <input
        type="text"
        placeholder="Category Name"
        value={
          category.categoryName
        }
        onChange={(e) =>
          setCategory({
            ...category,
            categoryName:
              e.target.value,
          })
        }
      />

      <textarea
        placeholder="Description"
        value={
          category.description
        }
        onChange={(e) =>
          setCategory({
            ...category,
            description:
              e.target.value,
          })
        }
      />

      <div>
        <button
          className="save-btn"
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Update Category"}
        </button>

        <button
          className="cancel-btn"
          onClick={() =>
            navigate("/categories")
          }
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </div>
  )}
</div>


);
}

export default EditCategory;

