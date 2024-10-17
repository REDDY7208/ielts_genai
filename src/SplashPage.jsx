import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate
import backgroundVideo from  './assets/splashpage10.mp4'; // Add your background video
 
import './index.css';
import introVideo from './assets/ieltsGenai.mp4';
const SplashPage = () => {
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);
  const navigate = useNavigate();
 
  useEffect(() => {
    // Set initial state in localStorage if not already set
    if (!localStorage.getItem('firstVisit')) {
      localStorage.setItem('firstVisit', 'true');
    }
  }, []);
 
 
 
  const handleClick = () => {
    setVideoPlaying(true);
    setShowSkipButton(true);
    const videoElement = document.getElementById('introVideo');
    if (videoElement) {
      videoElement.play();
      if (videoElement.requestFullscreen) {
        videoElement.requestFullscreen();
      } else if (videoElement.mozRequestFullScreen) {
        videoElement.mozRequestFullScreen();
      } else if (videoElement.webkitRequestFullscreen) {
        videoElement.webkitRequestFullscreen();
      } else if (videoElement.msRequestFullscreen) {
        videoElement.msRequestFullscreen();
      }
    }
  };
 
  const handleClose = () => {
    setVideoPlaying(false);
    setShowSkipButton(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };
 
  const handleSkip = () => {
    const userId = localStorage.getItem('user_id');
    const firstVisit = localStorage.getItem('firstVisit') === 'true';
    const isLoggedIn = !!userId; // Check if user_id exists in localStorage
 
    if (isLoggedIn) {
      // If the user is logged in, go to the home page
      navigate('/home');
    } else if (firstVisit) {
      // If it's the first visit, go to the login page and mark that it's no longer the first visit
      localStorage.setItem('firstVisit', 'false');
      navigate('/home');
    } else {
      // If the user is not logged in and it's not the first visit, go to the login page
      navigate('/home');
    }
  };
 
 
  return (
    <div>
   
   <div className="splash-container">
      <video
        src={backgroundVideo}
        className='background-video'
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="instruction-container">
          <button className="get-started-button" onClick={handleClick}>
            Get Started
          </button>
        </div>
 
        {isVideoPlaying && (
          <div className="video-modal">
            <video
              id="introVideo"
              className="intro-video"
              autoPlay
              controls={false}
              onEnded={handleClose}
            >
              <source src={introVideo} type="video/mp4" />
              IELTSGenAI Introduction Video
            </video>
            {showSkipButton && (
              <button className="skip-button" onClick={handleSkip}>
                Skip
              </button>
            )}
            <span className="close" onClick={handleClose}>×</span>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default SplashPage;