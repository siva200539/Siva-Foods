import React from "react";
import "./Home.css";
import imag from "../images/food.jpg";

function Home() {
  return (
    <section className="home">
      <div className="home-content">
        <h1 className="title">
          <span className="highlight">Skip The Wait,</span>
          <br />
          <span className="focus">Grab The Plate!</span>
        </h1>
        
        <a href="/menu" className="order-btn">
          Check Menu
        </a>
      </div>

      <div className="home-image">
        <img src={imag} alt="Cook serving food" className="cook" />
        <div className="image-bg"></div>
      </div>
    </section>
  );
}

export default Home;
