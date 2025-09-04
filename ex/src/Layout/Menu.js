import React from "react";
import "./Menu.css";
import foodata from "../constant/Fooddata";
import { addToCart } from "../redux/CartSlice";
import { useDispatch } from "react-redux";
const FoodGallery = () => {
  const dispatch=useDispatch()

  return (
    <div className="image-cont">

        {
            foodata.map((a)=>{
            return(
    <div className="image-item" key={a.id}>
        <img src={a.img} alt="Noodles" />
        <div className="cont">
          <p>{a.title}</p>
          <h2 className="price">{a.price}</h2>
          <button className="btn" onClick={()=>dispatch(addToCart(a))}>ADD +</button>
          
        </div>
      </div>
 
            )
            }
            )
        }

     

    </div>
  );
};

export default FoodGallery;
