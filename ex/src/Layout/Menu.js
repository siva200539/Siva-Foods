import React from "react";
import "./Menu.css";
import foodata from "../constant/Fooddata";
import { addToCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";

const FoodGallery = () => {
  const dispatch = useDispatch();

  // ✅ remove duplicate dishes based on title
  const uniqueFoods = foodata.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.title === item.title)
  );

  return (
    <section className="menu-section">
      <h1 className="menu-heading"> Our Signature Dishes</h1>
      <p className="menu-sub">
        
      </p>

      <div className="image-cont">
        {uniqueFoods.map((food) => (
          <div className="card" key={food.id}>
            <div className="img-box">
              <img src={food.img} alt={food.title} />
            </div>

            <div className="details">
              <h3 className="food-title">{food.title}</h3>
              <p className="price">₹{food.price}</p>
              <button
                className="add-btn"
                onClick={() => dispatch(addToCart(food))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FoodGallery;
