


import React from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const userId = localStorage.getItem('user_id');
    
    if (!userId) {
      console.error('User ID is missing');
      return;
    }

    try {
      const response = await fetch('http://141.136.42.65:8081/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (response.ok) {
        // Clear relevant data from local storage
        localStorage.removeItem('user_id');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');

        // Redirect to login page
        navigate('/login');

        // Force a page reload to clear any cached content
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.error('Logout failed:', errorData.message || 'An error occurred');
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout failed:', error.message);
      alert('Logout failed. Please try again.');
    }
  };

  return (
    <button className='logout-button' onClick={handleLogout} aria-label="Logout">Logout</button>
  );
};

export default LogoutButton;
