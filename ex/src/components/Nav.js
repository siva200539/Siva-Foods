import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import lo from '../images/logo.jfif';

const Nav = () => {
  
  return (
    <div>
      <header>
        <p className="head">SIVA foods</p>
        <img src={lo} alt="logo" className="log"/>
        
        <nav className="cont">
          <Link to="/">Home</Link>
          <Link to="/table">Table</Link>
          <Link to="/menu">Menu</Link>          <Link to="/cart">CART</Link>
        </nav>
      </header>

    
    </div>
  );
};

export default Nav;
