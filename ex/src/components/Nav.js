import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";
import lo from '../images/logo.jfif';

const Nav = () => {
  
  return (
    <div>
      <header>
        <p className="name" >Aura Hotel</p>
        <img src={lo} alt="logo" className="log"/>
      </header>  
        <nav className="cont">
          <Link to="/">Home</Link>
          <Link to="/menu">Menu</Link>          
          <Link to="/cart">Cart</Link>
          <Link to='/register'><button className="sign">Sign up</button></Link>
        </nav>
      

    
    </div>
  );
};

export default Nav;
          