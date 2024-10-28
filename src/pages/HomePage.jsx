import React from 'react';

import { Link } from 'react-router-dom'; // Import Link for navigation
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-container">

      <div className="overlay-content">
        <h1>Example of API CRUD Operations using Axios</h1>
        <p>This application allows you to manage users easily. You can view, add, edit, and delete users as needed.</p>
        <p>Explore the features of this application by navigating to the User List.</p>
        <Link to="/users" className="user-list-button">Go to User List</Link>
      </div>
    </div>
  );
};

export default HomePage;
