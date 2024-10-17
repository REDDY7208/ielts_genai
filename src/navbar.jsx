import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import FaceVerification from './Face/FaceVerification'; // Import FaceVerification component
import MockTestPopup from './MockTestPopup/MockTestPopup'; // Import MockTestPopup component
import './navbar.css';
import './MockTestPopup/MockTestPopup.css';

const Navbar = ({ user }) => {
  const [isProfileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isMockTestPopupVisible, setMockTestPopupVisible] = useState(false);
  const [isFaceVerificationVisible, setFaceVerificationVisible] = useState(false); // To control face verification popup
  const [isSidebarVisible, setSidebarVisible] = useState(false); // To control sidebar visibility
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setProfileDropdownVisible(!isProfileDropdownVisible);
  };

  const handleProfileMouseEnter = () => {
    setIsHoveringProfile(true);
  };

  const handleProfileMouseLeave = () => {
    setIsHoveringProfile(false);
  };

  const handleGoToCourse = () => {
    const userId = localStorage.getItem('user_id'); // Check for user session

    if (!userId) {
      // If no userId, redirect to login page
      navigate('/Auth');
    } else {
      // If userId exists, proceed with face verification
      setFaceVerificationVisible(true);
    }
  };

  const handleFaceVerificationSuccess = () => {
    setFaceVerificationVisible(false); // Close the face verification popup
    setMockTestPopupVisible(true); // Show the mock test popup after verification success
  };

  const closeMockTestPopup = () => {
    setMockTestPopupVisible(false); // Hide the mock test popup
  };

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible); // Toggle sidebar visibility
  };

  return (
    <nav className="navbar">
      <img className='logoImage' src="src/assets/IELTSGenAI-Logo2.png" alt="IELTSGenAI Logo" width="200" height="auto" />
     
      <div className="navbar-links">
        <p className="navbar-link"><Link to="/home">Home</Link></p>
        {/* <p className="navbar-link"><Link to="/Auth">Auth</Link></p>
        <p className="navbar-link"><Link to="/VerifyFace">Verify Face</Link></p> */}
        
        <p className="mocktest-nav" onClick={handleGoToCourse}>
          Mock Test
        </p>

        <p className="navbar-link"><Link to="/learningResources">Learning Resources</Link></p>
        {user && (
          <div
            className="profile-icon-container"
            onClick={toggleProfileDropdown}
            onMouseEnter={handleProfileMouseEnter}
            onMouseLeave={handleProfileMouseLeave}
          >
            <i className="fa-solid fa-user" aria-label="Profile"></i>
            {isProfileDropdownVisible && (
              <div className="profile-dropdown">
                <p onClick={() => navigate('/dashboard')}>Dashboard</p>
              </div>
            )}
            {isHoveringProfile && (
              <div className="email-dropdown user-email">
                <p>{user.email}</p>
              </div>
            )}
          </div>
        )}
        {user && <LogoutButton />}
      </div>
     
      <div className="navbar-menu-toggle" aria-label="Menu Toggle" onClick={toggleSidebar}>
        <i className="fa-solid fa-bars"></i>
      </div>

      {/* Sidebar for mobile view */}
      {isSidebarVisible && (
        <div className="sidebar">
          <p className="sidebar-link"><Link to="/home" className='link' onClick={toggleSidebar}>Home</Link></p>
          <p className="sidebar-link"><Link to="/Auth" className='link' onClick={toggleSidebar}>Auth</Link></p>
          <p className="sidebar-link"><Link to="/VerifyFace" className='link' onClick={toggleSidebar}>Verify Face</Link></p>
        
          <p className="sidebar-link"><Link to="/learningResources" className='link' onClick={toggleSidebar}>Learning Resources</Link></p>
          <p className="mocktest-btnn" onClick={() => { handleGoToCourse(); toggleSidebar(); }}>
            Mock Test
          </p>
          {user && (
            <div className="profile-icon-container">
              <i className="fa-solid fa-user" aria-label="Profile"></i>
              <p className='sidebar-link' onClick={() => { navigate('/dashboard'); toggleSidebar(); }}>Dashboard</p>
            </div>
          )}
         <p className='logout-btn'> {user && <LogoutButton />} </p>
        </div>
      )}

      {isFaceVerificationVisible && (
        <FaceVerification onSuccess={handleFaceVerificationSuccess} onClose={() => setFaceVerificationVisible(false)} /> // Face verification popup
      )}
      {isMockTestPopupVisible && (
        <MockTestPopup onClose={closeMockTestPopup} /> // MockTestPopup after successful verification
      )}
    </nav>
  );
};

export default Navbar;
