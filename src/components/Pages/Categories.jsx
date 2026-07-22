import { useEffect, useState } from "react";
import "./Categories.css";
import api from "../../api/api";

function Categories({
  categories = [],
  setCategories,
  products = [],
  setProducts,
}) {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title =
      "Categories | Inventory Management System";
    fetchCategories();
  }, []);
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const response = await api.get("/categories");

      console.log(
        "Categories API Response:",
        response.data
      );

      // Handle different backend response formats
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else if (
        Array.isArray(response.data?.categories)
      ) {
        setCategories(response.data.categories);
      } else if (
        Array.isArray(response.data?.data)
      ) {
        setCategories(response.data.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.log(
        "Fetch Categories Error:",
        error.response?.data || error.message
      );

      alert("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };
  const addCategory = async () => {
    const name = prompt("Enter Category Name");

    if (!name || !name.trim()) {
      alert("Please enter category name");
      return;
    }

    const categoryName = name.trim();

    // Check duplicate category
    const exists = categories.some(
      (item) =>
        (
          item.categoryName ||
          item.categoryname ||
          item.name ||
          ""
        ).toLowerCase() === categoryName.toLowerCase()
    );

    if (exists) {
      alert("Category already exists");
      return;
    }

    try {
      setLoading(true);

      // Backend field names
      const categoryData = {
        categoryName: categoryName,
        description: "New Category",
      };

      const response = await api.post(
        "/categories",
        categoryData
      );

      console.log(
        "Category Added:",
        response.data
      );

      // Get newly created category
      const addedCategory =
        response.data?.category ||
        response.data?.data ||
        response.data;

      // Immediately update React state
      if (addedCategory) {
        setCategories((prevCategories) => [
          ...prevCategories,
          addedCategory,
        ]);
      } else {
        // If backend doesn't return created object
        await fetchCategories();
      }

      alert("Category Added Successfully");

    } catch (error) {
      console.log(
        "Add Category Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to add category"
      );
    } finally {
      setLoading(false);
    }
  };
  const editCategory = async (id) => {
    const category = categories.find(
      (item) => item._id === id
    );

    if (!category) {
      alert("Category not found");
      return;
    }

    const currentName =
      category.categoryName ||
      category.categoryname ||
      category.name ||
      "";

    const newName = prompt(
      "Enter New Category Name",
      currentName
    );

    if (!newName || !newName.trim()) {
      return;
    }

    const updatedName = newName.trim();

    try {
      setLoading(true);

      const categoryData = {
        categoryName: updatedName,
        description:
          category.description || "New Category",
      };

      const response = await api.put(
        `/categories/${id}`,
        categoryData
      );

      console.log(
        "Category Updated:",
        response.data
      );

      // Update category in React state
      setCategories((prevCategories) =>
        prevCategories.map((item) =>
          item._id === id
            ? {
                ...item,
                categoryName: updatedName,
              }
            : item
        )
      );

      // Update category name in products
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.category === currentName
            ? {
                ...product,
                category: updatedName,
              }
            : product
        )
      );

      alert("Category Updated Successfully");

    } catch (error) {
      console.log(
        "Update Category Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Failed to update category"
      );
    } finally {
      setLoading(false);
    }
  };
  const deleteCategory = async (id) => {
    const category = categories.find(
      (item) => item._id === id
    );

    if (!category) {
      alert("Category not found");
      return;
    }

    const categoryName =
      category.categoryName ||
      category.categoryname ||
      category.name ||
      "";

    // Check if category is used by products
    const used = products.some(
      (product) =>
        product.category === categoryName
    );

    if (used) {
      alert(
        "This category is assigned to products. Update or delete those products first."
      );
      return;
    }

    if (
      !window.confirm(
        "Delete this category?"
      )
    ) {
      return;
    }

    try {
      setLoading(true);

      await api.delete(
        `/categories/${id}`
      );

      // Remove from React state immediately
      setCategories((prevCategories) =>
        prevCategories.filter(
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
  const filteredCategories =
    Array.isArray(categories)
      ? categories.filter((item) => {
          const categoryName =
            item.categoryName ||
            item.categoryname ||
            item.name ||
            "";

          return categoryName
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );
        })
      : [];
  return (
    <div className="categories">
      <h2>🗂️ Categories Management</h2>

      <div className="top-bar">
        <button
          className="add-btn"
          onClick={addCategory}
          disabled={loading}
        >
          ➕ Add Category
        </button>

        <input
          type="text"
          className="search"
          placeholder="🔍 Search Category..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {loading && (
        <p style={{ textAlign: "center" }}>
          ⏳ Loading...
        </p>
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredCategories.length > 0 ? (
            filteredCategories.map(
              (category, index) => {
                const categoryName =
                  category.categoryName ||
                  category.categoryname ||
                  category.name ||
                  "Unnamed Category";

                return (
                  <tr
                    key={
                      category._id ||
                      category.id ||
                      index
                    }
                  >
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {categoryName}
                    </td>

                    <td>
                      {category.description ||
                        "-"}
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() =>
                          editCategory(
                            category._id
                          )
                        }
                        disabled={loading}
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() =>
                          deleteCategory(
                            category._id
                          )
                        }
                        disabled={loading}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                );
              }
            )
          ) : (
            <tr>
              <td
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                📦 No Categories Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
export default Categories;
