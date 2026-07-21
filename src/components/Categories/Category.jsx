
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "./Category.css";

function Category() {
const [categories, setCategories] = useState([]);
const [categoryName, setCategoryName] = useState("");
const [description, setDescription] = useState("");
const [showForm, setShowForm] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

// GET ALL CATEGORIES
const fetchCategories = async () => {
try {
setLoading(true);
setError("");

  const response = await api.get("/categories");

  console.log(
    "Categories from Backend:",
    response.data
  );

  setCategories(
    response.data.categories || []
  );
} catch (error) {
  console.log(
    "Fetch Categories Error:",
    error.response?.data ||
      error.message
  );

  setError(
    error.response?.data?.message ||
      "Failed to fetch categories"
  );
} finally {
  setLoading(false);
}

};

useEffect(() => {
document.title = "Categories | Inventory";
fetchCategories();
}, []);

// ADD CATEGORY
const addCategory = async () => {
if (!categoryName.trim()) {
alert("Please enter category name");
return;
}
try {
  setLoading(true);
  setError("");

  const categoryData = {
    categoryName:
      categoryName.trim(),
    description:
      description.trim(),
  };

  const response = await api.post(
    "/categories",
    categoryData
  );

  const newCategory =
    response.data.category;

  setCategories([
    newCategory,
    ...categories,
  ]);

  setCategoryName("");
  setDescription("");
  setShowForm(false);

  alert(
    "Category Added Successfully"
  );
} catch (error) {
  console.log(
    "Add Category Error:",
    error.response?.data ||
      error.message
  );

  alert(
    error.response?.data?.message ||
      "Failed to add category"
  );
} finally {
  setLoading(false);
}

};

// DELETE CATEGORY
const deleteCategory = async (id) => {
if (
!window.confirm(
"Delete this category?"
)
) {
return;
}

try {
  setLoading(true);
  setError("");

  await api.delete(
    `/categories/${id}`
  );

  setCategories(
    categories.filter(
      (item) => item._id !== id
    )
  );

  alert(
    "Category Deleted Successfully"
  );
} catch (error) {
  console.log(
    "Delete Category Error:",
    error.response?.data ||
      error.message
  );

  alert(
    error.response?.data?.message ||
      "Failed to delete category"
  );
} finally {
  setLoading(false);
}

};

// RESET FORM
const resetForm = () => {
setCategoryName("");
setDescription("");
setShowForm(false);
};

return ( <div className="categories"> <h2>
📂 Inventory Management - Categories </h2>

```
  <div className="top-bar">
    <button
      className="add-btn"
      onClick={() =>
        setShowForm(!showForm)
      }
      disabled={loading}
    >
      ➕ Add Category
    </button>
  </div>

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

  {showForm && (
    <div className="category-form">
      <h3>Add New Category</h3>

      <input
        type="text"
        placeholder="Category Name"
        value={categoryName}
        onChange={(e) =>
          setCategoryName(
            e.target.value
          )
        }
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) =>
          setDescription(
            e.target.value
          )
        }
      />

      <div>
        <button
          className="save-btn"
          onClick={addCategory}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : "Save"}
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

  <div className="table-box">
    <table>
      <thead>
        <tr>
          <th>S.No</th>
          <th>Category Name</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {loading &&
        categories.length === 0 ? (
          <tr>
            <td
              colSpan="4"
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              ⏳ Loading Categories...
            </td>
          </tr>
        ) : categories.length === 0 ? (
          <tr>
            <td
              colSpan="4"
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              📂 No Categories Found
            </td>
          </tr>
        ) : (
          categories.map(
            (item, index) => (
              <tr key={item._id}>
                <td>
                  {index + 1}
                </td>

                <td>
                  {item.categoryName}
                </td>

                <td>
                  {item.description ||
                    "No Description"}
                </td>

                <td>
                  <Link
                    to={`/categories/${item._id}`}
                  >
                    <button className="view-btn">
                      👁️ View
                    </button>
                  </Link>

                  <Link
                    to={`/categories/edit/${item._id}`}
                  >
                    <button className="edit-btn">
                      ✏️ Edit
                    </button>
                  </Link>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteCategory(
                        item._id
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
        )}
      </tbody>
    </table>
  </div>
</div>


);
}

export default Category;
