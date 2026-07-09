import "./Categories.css";

function Categories() {
  return (
    <div className="categories">
      <h2>Categories</h2>

      <button className="add-btn">+ Add Category</button>

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
          <tr>
            <td>1</td>
            <td>Electronics</td>
            <td>Electronic Devices</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>Stationery</td>
            <td>Office Items</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>

          <tr>
            <td>3</td>
            <td>Bags</td>
            <td>School Bags</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Categories;