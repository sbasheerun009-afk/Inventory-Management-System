// import { useState, useEffect } from "react";
// import "./Categories.css";

// function Categories({ categories, setCategories }) {

//   const addCategory = () => {
//   const name = prompt("Enter Category Name");

//   if (!name || name.trim() === "") {
//     alert("Category name is required.");
//     return;
//   }

//   const exists = categories.some(
//     (item) => item.name.toLowerCase() === name.trim().toLowerCase()
//   );

//   if (exists) {
//     alert("Category already exists.");
//     return;
//   }

//   const nextId =
//     categories.length > 0
//       ? Math.max(...categories.map((item) => Number(item.id))) + 1
//       : 1;

//   const newCategory = {
//     id: nextId,
//     name: name.trim(),
//     description: "New Category",
//   };

//   setCategories([...categories, newCategory]);

//   alert(" Category Added Successfully");
// };

// const editCategory = (id) => {
//   const newName = prompt("Enter New Category Name");

//   if (!newName || newName.trim() === "") return;

//   setCategories(
//     categories.map((item) =>
//       item.id === id
//         ? { ...item, name: newName.trim() }
//         : item
//     )
//   );

//   alert("✏️ Category Updated Successfully");
// };
 


//   useEffect(() => {
//     document.title = "Categories | Inventory Management System";
//   }, []);



//   const deleteCategory = (id) => {

//     const confirmDelete = window.confirm(
//       "Delete this category?"
//     );

//     if(confirmDelete){

//       setCategories(
//         categories.filter(
//           (category)=> category.id !== id
//         )
//       );

//     }
//   };



//   const editCategory = (id) => {

//     const newName = prompt(
//       "Enter new category name"
//     );

//     if(newName){

//       setCategories(
//         categories.map((category)=>(
//           category.id === id
//           ? {...category, name:newName}
//           : category
//         ))
//       );

//     }
//   };



//   const addCategory = () => {

//     const name = prompt(
//       "Enter category name"
//     );

//     if(name){

//       const newCategory = {
//         id: Date.now(),
//         name:name,
//         products:0
//       };


//       setCategories([
//         ...categories,
//         newCategory
//       ]);

//     }

//   };



//   const filteredCategories =
//     categories.filter((category)=>
//       category.name
//       .toLowerCase()
//       .includes(search.toLowerCase())
//     );



//   return (

//     <div className="categories">


//       <h2>
//         🗂️ Categories
//       </h2>



//       <div className="top-bar">


//         <button
//           className="add-btn"
//           onClick={addCategory}
//         >
//           ➕ Add Category
//         </button>



//         <input
//           type="text"
//           placeholder="🔍 Search Category..."
//           className="search"
//           value={search}
//           onChange={(e)=>setSearch(e.target.value)}
//         />


//       </div>




//       <table>

//         <thead>

//           <tr>
//             <th>ID</th>
//             <th>Category Name</th>
//             <th>Total Products</th>
//             <th>Action</th>
//           </tr>

//         </thead>



//         <tbody>


//         {
//           filteredCategories.length > 0 ? (

//             filteredCategories.map((category)=>(

//               <tr key={category.id}>

//                 <td>{category.id}</td>

//                 <td>{category.name}</td>

//                 <td>{category.products}</td>


//                 <td>

//                   <button
//                     className="edit-btn"
//                     onClick={()=>editCategory(category.id)}
//                   >
//                     ✏️ Edit
//                   </button>


//                   <button
//                     className="delete-btn"
//                     onClick={()=>deleteCategory(category.id)}
//                   >
//                     🗑 Delete
//                   </button>


//                 </td>


//               </tr>

//             ))

//           ):(

//             <tr>
//               <td colSpan="4">
//                 🗂️ No Categories Available
//               </td>
//             </tr>

//           )
//         }


//         </tbody>


//       </table>


//     </div>

//   );
// }


// export default Categories;
import { useState, useEffect } from "react";
import "./Categories.css";

function Categories({
  categories,
  setCategories,
  products,
  setProducts,
}) {
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.title = "Categories | Inventory Management System";
  }, []);

  const addCategory = () => {
    const name = prompt("Enter Category Name");

    if (!name || !name.trim()) {
      alert("Please enter category name");
      return;
    }

    const exists = categories.some(
      (item) =>
        item.name.toLowerCase() === name.trim().toLowerCase()
    );

    if (exists) {
      alert("Category already exists");
      return;
    }

    const nextId =
      categories.length > 0
        ? Math.max(...categories.map((item) => item.id)) + 1
        : 1;

    const newCategory = {
      id: nextId,
      name: name.trim(),
      description: "New Category",
    };

    setCategories([...categories, newCategory]);
    alert("Category Added Successfully");
  };

  const editCategory = (id) => {
    const category = categories.find((item) => item.id === id);

    if (!category) return;

    const newName = prompt(
      "Enter New Category Name",
      category.name
    );

    if (!newName || !newName.trim()) return;

    const updatedName = newName.trim();

    setCategories(
      categories.map((item) =>
        item.id === id
          ? { ...item, name: updatedName }
          : item
      )
    );

    setProducts(
      products.map((product) =>
        product.category === category.name
          ? { ...product, category: updatedName }
          : product
      )
    );

    alert("Category Updated Successfully");
  };

  const deleteCategory = (id) => {
    const category = categories.find((item) => item.id === id);

    if (!category) return;

    const used = products.some(
      (product) => product.category === category.name
    );

    if (used) {
      alert(
        "This category is assigned to products. Update or delete those products first."
      );
      return;
    }

    if (window.confirm("Delete this category?")) {
      setCategories(
        categories.filter((item) => item.id !== id)
      );
      alert("Category Deleted Successfully");
    }
  };

  const filteredCategories = categories.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );
return (
  <div className="categories">
    <h2>🗂️ Categories Management</h2>

    <div className="top-bar">
      <button
        className="add-btn"
        onClick={addCategory}
      >
        ➕ Add Category
      </button>

      <input
        type="text"
        className="search"
        placeholder="🔍 Search Category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

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
          filteredCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>{category.description}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => editCategory(category.id)}
                >
                  ✏️ Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteCategory(category.id)}
                >
                  🗑 Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td
              colSpan="4"
              style={{
                textAlign: "center",
                padding: "20px",
              }}
            >
              No Categories Found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
}

export default Categories;