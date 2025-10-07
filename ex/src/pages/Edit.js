import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Edit.css'; // custom styles

const Edit = () => {
  const { id } = useParams();
  const [productsItems, setProductsItems] = useState({});

  useEffect(() => {
    fetch(`http://localhost:7001/getone/${id}`)
      .then((res) => res.json())
      .then((data) => setProductsItems(data))
      .catch((err) => console.error("Error:", err));
  }, [id]); // ✅ avoids infinite loop

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.fname.value;
    const transaction = form.transaction.value;
    const dish = form.dish.value;
    const tableno = form.tableno.value;

    const passdata = { name, transaction, dish, tableno };

    fetch(`http://localhost:7001/editfood/${id}`, {
      method: "PATCH",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(passdata),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("✅ Successfully Updated!");
        setTimeout(() => {
          window.location.href = "/update";
        }, 2000);
      })
      .catch(() => toast.error("❌ Update failed"));
  };

  return (
    <div className="edit-container">
      <ToastContainer />
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4">Update Order</h2>
        <form onSubmit={handleUpdate}>
          
          <div className="mb-3">
            <label className="form-label"><b>Name</b></label>
            <input type="text" name="fname" className="form-control"
              defaultValue={productsItems.name} required />
          </div>

          <div className="mb-3">
            <label className="form-label"><b>Table Number</b></label>
            <input type="number" name="tableno" className="form-control"
              defaultValue={productsItems.tableNo} required />
          </div>

          <div className="mb-3">
            <label className="form-label"><b>Dish</b></label>
            <input type="text" name="dish" className="form-control"
              defaultValue={productsItems.dish} required />
          </div>

          <div className="mb-3">
            <label className="form-label"><b>Transaction</b></label>
            <input type="text" name="transaction" className="form-control"
              defaultValue={productsItems.transaction} required />
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary px-4">Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Edit;
