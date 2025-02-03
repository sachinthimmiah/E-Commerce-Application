import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router for navigation
import useravatar from './useravatar.png';
import './assets/home.css';

export function ProfileDropdown({ username }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // For navigation

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('authToken'); // Example: Remove JWT token
    sessionStorage.clear(); // Clear session data if any
    console.log('User logged out');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="profile-dropdown">
      <button className="profile-button" onClick={toggleDropdown}>
        <img
          src={useravatar}
          alt="User Avatar"
          className="user-avatar"
          onError={(e) => {
            e.target.src = 'fallback-logo.png';
          }} // Fallback for image error
        />
        <span className="username">{username || 'Guest'}</span> {/* Display username */}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          <a href="#">Profile</a>
          <a href="/orders">Orders</a>
          <button className="profile-button1" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
