import React from "react";
import "./Home.css"; 
import imag from '../images/food.jpg'
function Home() {
  return (
    <div>
      <p className="title">
        <span className="hunger">Skip The Wait</span>
        <br />
        <span className="wait">Grab The Plate!</span>
      </p>

      <a href="/menu" className="order-btn">Check Now</a>

      <img src={imag}alt="Cook" className="cook" />

      
    </div>
  );
}

export default Home;
