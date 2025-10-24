import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../constant/UserContext';
import lo from '../images/logo.jfif';
import './Nav.css';

const Nav = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <header className="nav-header">
      <div className="nav-left">
        <img src={lo} alt="logo" className="logo" />
        <p className="name">Aura Hotel</p>
      </div>

      <nav className="nav-links">
        <Link to="/home">Home</Link>
        <Link to="/regis
        ">Register</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/cart">Cart</Link>

        {user && (
          <div className="profile-section">
            <span className="profile-name">👤 {user.username}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
