import React from "react";
import "./Menu.css";
import foodata from "../constant/Fooddata";
import { useDispatch } from "react-redux";
import { addItem } from "../redux/CounterSlice";

const FoodGallery = () => {
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(addItem(item)); // dispatch the action
  };

  return (
    <div className="image-cont">
      {foodata.map((a) => (
        <div className="image-item" key={a.id}>
          <img src={a.img} alt={a.title} />
          <div className="cont">
            <p>{a.title}</p>
            <h2 className="price">${a.price}</h2>
            <button className="btn" onClick={() => handleAdd(a)}>
              ADD +
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FoodGallery;
