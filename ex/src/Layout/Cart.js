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

  // ✅ Calculate total price
  const totalAmount = cartitems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ When user clicks "Finalize Order"
  const handleFinalize = () => {
    if (cartitems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Save order to Redux OrderSlice
    dispatch(addOrder(cartitems));

    // Navigate to Registration (order summary page)
    navigate("/reg");
  };

  return (
    <section className="cart-section">
      <h2 className="cart-heading">🛒 Your Cart</h2>

      <div className="row">
        {cartitems.map((item) => (
          <div className="image-item" key={item.id}>
            <img src={item.img} alt={item.title} />

            <div className="cart-info">
              <p className="title">{item.title}</p>
              <h3 className="price">₹{item.price}</h3>

              <div className="quantity-controls">
                <h4>Quantity</h4>
                <div className="quan">{item.quantity}</div>
                <div className="btt">
                  <button
                    onClick={() =>
                      dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
                    }
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      dispatch(
                        updateQuantity({
                          id: item.id,
                          quantity: Math.max(1, item.quantity - 1),
                        })
                      )
                    }
                  >
                    -
                  </button>
                </div>
              </div>

              <button
                className="btn delete-btn"
                onClick={() => dispatch(deleteFromCart(item))}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Show Total and Finalize Button */}
      {cartitems.length > 0 && (
        <div className="cart-footer">
          <h3 className="total-amount">Total: ₹{totalAmount}</h3>
          <button className="btm finalize-btn" onClick={handleFinalize}>
            ✅ Finalize Order
          </button>
        </div>
      )}
    </section>
  );
};

export default Cartpage;
