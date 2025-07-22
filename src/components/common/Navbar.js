// src/components/common/Navbar.js
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="logo">Klassic Stay</div>

      <div className="menu-icon" onClick={toggleMenu}>
        {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
      </div>

      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
        <li><NavLink to="/explore" onClick={closeMenu}>Explore</NavLink></li>
        <li><NavLink to="/mystays" onClick={closeMenu}>My Stays</NavLink></li>
        <li><NavLink to="/auth" onClick={closeMenu}>Login</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
