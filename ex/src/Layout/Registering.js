import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "../redux/OrderSlice";

const Registering = () => {
  const dispatch = useDispatch();
  const orderedItems = useSelector((state) => state.orders.orderedItems);

  // ✅ Fix: Calculate grand total correctly by stripping ₹ and converting to numbers
  const totalAmount = orderedItems.reduce((sum, item) => {
    const cleanPrice = Number(item.price.replace(/[^\d.-]/g, ""));
    const quantity = Number(item.quantity);
    const itemTotal = cleanPrice * quantity;
    return sum + itemTotal;
  }, 0);

  const [formData, setFormData] = useState({
    name: "",
    tableNo: "",
    transaction: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.tableNo || !formData.transaction) {
      toast.warn("⚠️ Please fill all fields");
      return;
    }

    const orderData = {
      name: formData.name,
      tableNo: formData.tableNo,
      dishes: orderedItems,
      transaction: formData.transaction,
      amount: totalAmount,
      status: "Payment Successful ✅",
    };

    fetch("http://localhost:7001/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("✅ Order Registered Successfully!");
        dispatch(clearOrders()); // Clear the cart after saving
        setFormData({ name: "", tableNo: "", transaction: "" });
      })
      .catch(() => toast.error("❌ Error while saving order"));
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        backgroundColor: "white",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <ToastContainer />
      <h2 style={{ textAlign: "center" }}>Finalize Your Order</h2>

      {orderedItems.length === 0 ? (
        <p>No items ordered yet.</p>
      ) : (
        <>
          <table width="100%" border="1" cellPadding="8">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderedItems.map((item, i) => {
                const cleanPrice = Number(item.price.replace(/[^\d.-]/g, ""));
                const quantity = Number(item.quantity);
                const itemTotal = cleanPrice * quantity;

                return (
                  <tr key={i}>
                    <td>{item.dish}</td>
                    <td>₹{cleanPrice}</td>
                    <td>{quantity}</td>
                    <td>₹{itemTotal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3 style={{ marginTop: "15px" }}>Grand Total: ₹{totalAmount}</h3>
        </>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
       
        <select
          name="transaction"
          value={formData.transaction}
          onChange={handleChange}
          required
          style={{ marginLeft: "10px" }}
        >
          <option value="">-- Select Transaction --</option>
          <option value="Cash">Cash</option>
          <option value="UPI">UPI</option>
          <option value="Card">Card</option>
        </select>

        <button
          type="submit"
          style={{
            width: "100%",
            background: "green",
            color: "white",
            padding: "10px",
            marginTop: "15px",
          }}
        >
          Confirm & Submit
        </button>
      </form>
    </div>
  );
};

export default Registering;
