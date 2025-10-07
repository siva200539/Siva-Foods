import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromCart, updateQuantity } from "../redux/CartSlice";
import { addOrder } from "../redux/OrderSlice";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const Cartpage = () => {
  const cartitems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = (item) => {
    const totalAmount = item.price * item.quantity;

    const orderData = {
      dish: item.title,
      price: item.price,
      quantity: item.quantity,
      totalAmount,
    };

    dispatch(addOrder(orderData)); // store in redux
    alert(`${item.title} added to order list ✅`);
  };

  const handleFinalize = () => {
    navigate("/reg"); // navigate only when user clicks finalize
  };

  return (
    <section>
      <div className="row">
        {cartitems.map((a) => (
          <div className="image-item" key={a.id}>
            <img src={a.img} alt={a.title} />
            <div>
              <p>{a.title}</p>
              <h2 className="price">₹{a.price}</h2>

              <button className="btn" onClick={() => dispatch(deleteFromCart(a))}>
                Delete
              </button>

              <h4>Quantity</h4>
              <div className="quan">{a.quantity}</div>

              <div className="btt">
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: a.id, quantity: a.quantity + 1 }))
                  }
                >
                  +
                </button>
                <button
                  onClick={() =>
                    dispatch(updateQuantity({ id: a.id, quantity: a.quantity - 1 }))
                  }
                >
                  -
                </button>
              </div>

              {/* ORDER BUTTON */}
              <button className="btn" onClick={() => handleOrder(a)}>
                ORDER
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* FINALIZE BUTTON */}
      {cartitems.length > 0 && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button
            className="btm"
            onClick={handleFinalize}
            style={{ background: "green", color: "white", padding: "10px 20px" }}
          >
Finalize Order
          </button>
        </div>
      )}
    </section>
  );
};

export default Cartpage;
