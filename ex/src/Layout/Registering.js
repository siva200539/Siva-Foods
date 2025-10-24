import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "../redux/OrderSlice";
import "react-toastify/dist/ReactToastify.css";
import "./Registering.css";

const Registering = () => {
  const dispatch = useDispatch();
  const orderedItems = useSelector((state) => state.orders.orderedItems);

  const totalAmount = orderedItems.reduce((sum, item) => {
    const price =
      typeof item.price === "string"
        ? Number(item.price.replace(/[^\d.-]/g, ""))
        : item.price;
    return sum + price * item.quantity;
  }, 0);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    orderType: "",
    specialNote: "",
  });

  const [orderStage, setOrderStage] = useState("order");

  // Animate order progress
  useEffect(() => {
    if (orderStage === "order") {
      const timer1 = setTimeout(() => setOrderStage("processing"), 2500);
      const timer2 = setTimeout(() => setOrderStage("delivered"), 5000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [orderStage]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      toast.warn("⚠️ Please fill all required fields");
      return;
    }

    const orderData = {
      ...formData,
      dish: orderedItems.map((item) => item.title || item.dish),
      amount: totalAmount,
      status: "Order Placed",
      createdAt: new Date(),
    };

    fetch("http://localhost:7001/placeorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("✅ Order Placed Successfully!");
        dispatch(clearOrders());
        setFormData({
          name: "",
          phone: "",
          address: "",
          orderType: "",
          specialNote: "",
        });
        setOrderStage("order");
      })
      .catch(() => toast.error("❌ Failed to place order"));
  };

  const ProgressAnimation = () => {
    const steps = ["Order", "Processing", "Delivered"];
    const activeIndex =
      orderStage === "order" ? 0 : orderStage === "processing" ? 1 : 2;

    return (
      <div className="progress-container">
        <div className="progress-line"></div>
        <div
          className="progress-fill"
          style={{ width: `${(activeIndex / 2) * 100}%` }}
        ></div>
        {steps.map((step, i) => (
          <div
            key={i}
            className={`progress-step ${i <= activeIndex ? "active" : ""}`}
          >
            <span className="circle"></span>
            {step}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="register-bg">
      <div className="register-box">
        <ToastContainer />
        <h2 className="register-title">🍴 Finalize Your Order</h2>

        <ProgressAnimation />

        {orderedItems.length === 0 ? (
          <p className="empty-msg">No items ordered yet.</p>
        ) : (
          <>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Dish</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderedItems.map((item, i) => {
                  const price =
                    typeof item.price === "string"
                      ? Number(item.price.replace(/[^\d.-]/g, ""))
                      : item.price;
                  return (
                    <tr key={i}>
                      <td>{item.title || item.dish}</td>
                      <td>₹{price}</td>
                      <td>{item.quantity}</td>
                      <td>₹{price * item.quantity}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <h3 className="grand-total">Grand Total: ₹{totalAmount}</h3>
          </>
        )}

        <form className="order-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />
          <textarea
            name="address"
            placeholder="Full Address"
            value={formData.address}
            onChange={handleChange}
          ></textarea>

          <select
            name="orderType"
            value={formData.orderType}
            onChange={handleChange}
          >
            <option value="">-- Select Order Type --</option>
            <option value="Dine-In">Dine-In</option>
            <option value="Takeaway">Takeaway</option>
            <option value="Delivery">Delivery</option>
          </select>

          <textarea
            name="specialNote"
            placeholder="Special Note (optional)"
            value={formData.specialNote}
            onChange={handleChange}
          ></textarea>

          <button className="submit-btn" type="submit">
            ✅ Confirm & Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Registering;
