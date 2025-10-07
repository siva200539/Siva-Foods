import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import "./Gupload.css";

const Gupload = () => {
  const [ProductItems, setProductsItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7001/getall`)
      .then((res) => res.json())
      .then((data) => setProductsItems(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  const DeleteItems = (id) => {
    fetch(`http://localhost:7001/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        toast.error("Deleted successfully");
        setProductsItems((prevProductItems) =>
          prevProductItems.filter((item) => item._id !== id)
        );
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  return (
    <div className="upload-container">
      <h2 className="upload-title">Order Details</h2>
      <div className="cart-items">
        {ProductItems?.map((item) => (
          <div key={item._id} className="cart-card">
            <h3 className="dish-name">{item.dish}</h3>

            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Table No:</strong> {item.tableNo}</p>
            <p><strong>Transaction:</strong> {item.transaction}</p>
            <p><strong>Amount:</strong> ₹{item.amount || 0}</p>
            <p><strong>Status:</strong> {item.status || "Payment Successful ✅"}</p>

            <div className="card-actions">
              <button className="btn-delete" onClick={() => DeleteItems(item._id)}>
                Delete
              </button>
              <Link to={`/edit/${item._id}`}>
                <button className="btn-edit">
                  <FiEdit />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gupload;
