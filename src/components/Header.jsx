import React from 'react';
import './Header.css';
import logo from '../assets/logo1.png';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <img src={logo} alt="User Manager" style={{width:'70px',height:'auto'}}/>
        
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><Link to="/users">User List</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
