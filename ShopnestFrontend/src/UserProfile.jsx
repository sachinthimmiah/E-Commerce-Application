import React, { useState, useEffect } from "react";
import "./UserProfileCard.css";

const UserProfileCard = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [showCard, setShowCard] = useState(false);

  // Function to fetch user data from an API
  const fetchUserData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/1"); // Replace with your API endpoint
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // Fetch data when the component mounts
  }, []);

  const toggleCard = () => {
    setShowCard(!showCard);
  };

  return (
    <div className="user-profile-container">
      

      {showCard && user && (
        <div className="user-profile-card">
          <h2>{user.name}</h2>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role}
          </p>
        </div>
      )}

      {showCard && !user && <p>Loading user data...</p>}
    </div>
  );
};

export default UserProfileCard;
