import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import './index.css';
import Residencies from './Residencies';
import Navbar from './navbar';  // Import the Navbar component
import ChatHelp from './ChatHelp/ChatHelp';
import Testimonial from './Testimonial'
import LearningResources from './LearningResources'
import myImage from './assets/Picture1.png'
 
const Home = () => {
  const [isNavbarOpen, setNavbarOpen] = useState(false);
  const [user, setUser] = useState(null);
 
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
 
  const showNavbar = () => {
    setNavbarOpen(true);
  };
 
  const closeNavbar = () => {
    setNavbarOpen(false);
  };
 
  return (
    <div>
      {/* Replace the old navbar code with the Navbar component */}
      <Navbar user={user} />
 
   
 
      {/* Header */}
 
      <div className="header">
 
        <div>
 
          <h1 className="main-head animated-head">Learning IELTS Skills Anywhere, Anytime</h1>
 
          <h3 className='sub-head'>Welcome to IELTSGenAI!</h3>
 
          <p className="about">
 
           
 
              At IELTSGenAI, we are dedicated to helping you achieve your highest potential on the IELTS exam. Whether you're Aiming to study abroad, advance your career, or simply meet your personal goals, our comprehensive platform offers tailored resources
              and support for each module: Speaking, Listening, Writing, and Reading.
 
           
 
          </p>
 
 
 
 
          {/*<button className="header-button">Shop Now</button> */}
 
        </div>
 
        <div >
 
          <img
 
            className="header-img"
 
            src={myImage}
 
            alt="Study  Abroad Image"
 
 
 
 
          />
 
        </div>
 
      </div>
 
 
 
      <LearningResources />
      <Residencies />
      <ChatHelp />
 
      <Testimonial />
      {/* Footer */}
      <div className="footer">
        <div className="footer-container">
          <div className="footer-box-1">
            <h1 className="headingtext">IELTSGenAI</h1>
            <p>Follow us on :</p>
            <div className="footer-icon-container">
              <i className="fa-brands fa-facebook" style={{ color: 'white' }}></i>
              <i className="fa-brands fa-x-twitter" style={{ color: 'white' }}></i>
              <i className="fa-brands fa-linkedin" style={{ color: 'white' }}></i>
              <i className="fa-brands fa-instagram" style={{ color: 'white' }}></i>
              <i className="fa-brands fa-telegram" style={{ color: 'white' }}></i>
            </div>
          </div>
          <div className="footer-box-2">
            <h4 className="textcolorwhite">ABOUT</h4>
            <p className="footerlinks"><Link to="/" className='link'>History</Link></p>
 
            <p className="footerlinks"><Link to="/" className='link'>Terms & Conditions</Link></p>
            <p className="footerlinks"><Link to="/" className='link'>Privacy Policy</Link></p>
          </div>
          <div className="footer-box-3">
            <h4 className="textcolorwhite">SERVICES</h4>
            <p className="footerlinks"><Link to="/" >How to Start</Link></p>
            <p className="footerlinks"><Link to="/">Our Product</Link></p>
 
            <p className="footerlinks"><Link to="/">Promo</Link></p>
 
          </div>
          <div className="footer-box-4">
            <h4 className="textcolorwhite">OTHER</h4>
            <p className="footerlinks"><a href="support@ieltsgenai.com">Contact us</a></p>
            <p className="footerlinks"><Link to="/">Help</Link></p>
 
            <p className="footerlinks"><Link to="/">FAQ's</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default Home;