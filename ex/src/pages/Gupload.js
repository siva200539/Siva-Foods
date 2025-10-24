// src/pages/Gupload.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import "./Gupload.css";

const Gupload = () => {
  const [ProductItems, setProductsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:7001/getall");
      const data = await res.json();
      // show only documents that are orders (created by placeorder)
      const ordersOnly = data.filter((d) => d.type === "order");
      setProductsItems(ordersOnly);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data:", err);
      toast.error("Failed to fetch data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000); // auto-refresh
    return () => clearInterval(interval);
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
        {loading ? (
          <p className="loading-text">Loading orders...</p>
        ) : ProductItems.length === 0 ? (
          <p className="no-data">No orders found.</p>
        ) : (
          ProductItems.map((item) => (
            <div key={item._id} className="cart-card">
              <h3 className="dish-name">{item.items ? item.items.map(i=>i.title).join(", ") : item.dish}</h3>
              <p><strong>Name:</strong> {item.customer?.name || item.name}</p>
              <p><strong>Table:</strong> {item.customer?.tableNo || item.tableNo}</p>
              <p><strong>Transaction:</strong> {item.customer?.transaction || item.transaction}</p>
              <p><strong>Amount:</strong> ₹{item.totalAmount ?? item.amount ?? 0}</p>
              <p><strong>Status:</strong> {item.status || "Order Received ✅"}</p>

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
          ))
        )}
      </div>
    </div>
  );
};

export default Gupload;
