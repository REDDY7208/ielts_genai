import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const SideNavbar = ({ isOpen, onClose }) => {
  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className={`side-navbar ${isOpen ? 'open' : ''}`}>
      <p style={{ textAlign: 'right' }} onClick={onClose}>
        <i className="fa-solid fa-xmark"></i>
      </p>
      <div className="side-navbar-links">
        <p className="side-navbar-link" onClick={handleLinkClick}><Link to="/">Home</Link></p>
        <p className="side-navbar-link" onClick={handleLinkClick}><Link to="/collection">Collections</Link></p>
        <p className="side-navbar-link" onClick={handleLinkClick}><Link to="/contact">Contact</Link></p>
        <p className="side-navbar-link" onClick={handleLinkClick}><Link to="./screens/login">Login</Link></p>
      </div>
    </div>
  );
};

export default SideNavbar;
