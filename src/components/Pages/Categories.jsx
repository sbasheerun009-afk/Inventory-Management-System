import { useState, useEffect } from "react";
import "./Categories.css";

function Categories() {

  const [search, setSearch] = useState("");

  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", products: 15 },
    { id: 2, name: "Furniture", products: 8 },
    { id: 3, name: "Stationery", products: 20 },
    { id: 4, name: "Accessories", products: 12 },
  ]);


  useEffect(() => {
    document.title = "Categories | Inventory Management System";
  }, []);



  const deleteCategory = (id) => {

    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if(confirmDelete){

      setCategories(
        categories.filter(
          (category)=> category.id !== id
        )
      );

    }
  };



  const editCategory = (id) => {

    const newName = prompt(
      "Enter new category name"
    );

    if(newName){

      setCategories(
        categories.map((category)=>(
          category.id === id
          ? {...category, name:newName}
          : category
        ))
      );

    }
  };



  const addCategory = () => {

    const name = prompt(
      "Enter category name"
    );

    if(name){

      const newCategory = {
        id: Date.now(),
        name:name,
        products:0
      };


      setCategories([
        ...categories,
        newCategory
      ]);

    }

  };



  const filteredCategories =
    categories.filter((category)=>
      category.name
      .toLowerCase()
      .includes(search.toLowerCase())
    );



  return (

    <div className="categories">


      <h2>
        🗂️ Categories
      </h2>



      <div className="top-bar">


        <button
          className="add-btn"
          onClick={addCategory}
        >
          ➕ Add Category
        </button>



        <input
          type="text"
          placeholder="🔍 Search Category..."
          className="search"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />


      </div>




      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Category Name</th>
            <th>Total Products</th>
            <th>Action</th>
          </tr>

        </thead>



        <tbody>


        {
          filteredCategories.length > 0 ? (

            filteredCategories.map((category)=>(

              <tr key={category.id}>

                <td>{category.id}</td>

                <td>{category.name}</td>

                <td>{category.products}</td>


                <td>

                  <button
                    className="edit-btn"
                    onClick={()=>editCategory(category.id)}
                  >
                    ✏️ Edit
                  </button>


                  <button
                    className="delete-btn"
                    onClick={()=>deleteCategory(category.id)}
                  >
                    🗑 Delete
                  </button>


                </td>


              </tr>

            ))

          ):(

            <tr>
              <td colSpan="4">
                🗂️ No Categories Available
              </td>
            </tr>

          )
        }


        </tbody>


      </table>


    </div>

  );
}


export default Categories;