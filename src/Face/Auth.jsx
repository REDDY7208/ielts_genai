


import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './AuthFace.css'; // Ensure the path is correct

const Auth = () => {
    const [userId, setUserId] = useState(localStorage.getItem('user_id')); // Get the user ID from local storage
    const [capturedImages, setCapturedImages] = useState({
        front: null,
        left: null,
        right: null,
    });
    const [message, setMessage] = useState(''); // For success messages
    const [showAuth, setShowAuth] = useState(true); // To toggle the auth-container visibility
    const videoRef = useRef(null);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Start the camera
    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            })
            .catch((err) => console.error("Camera access denied: ", err));
    };

    // Capture image based on the angle (front, left, right)
    const captureImage = (angle) => {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImages((prev) => ({ ...prev, [angle]: dataUrl }));

        // Set success message
        setMessage(`Successfully captured ${angle} image!`);
    };

    // Send the images to register the face in the backend
    const registerFace = async () => {
        if (!capturedImages.front || !capturedImages.left || !capturedImages.right) {
            alert('Please capture all three angles (front, left, right).');
            return;
        }

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('front_image', capturedImages.front);
        formData.append('left_image', capturedImages.left);
        formData.append('right_image', capturedImages.right);

        try {
            const response = await fetch('/api/register_face', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            alert(result.message); // Popup for registration success

            // Clear the message after successful registration
            setMessage('Your face has been registered successfully!');
        } catch (error) {
            console.error('Error during face registration:', error);
        }
    };

    // Send the live image to verify the face
    const verifyFace = async () => {
        const canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        const context = canvas.getContext('2d');
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const liveImage = canvas.toDataURL('image/jpeg');

        const formData = new FormData();
        formData.append('user_id', userId);
        formData.append('image', liveImage);

        try {
            const response = await fetch('/api/verify_face', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            alert(result.message); // Popup for verification result
        } catch (error) {
            console.error('Error during face verification:', error);
        }
    };

    // Close the auth-container and redirect to home
    const handleClose = () => {
        setShowAuth(false); // Hide the container
        navigate('/home'); // Redirect to home page
    };

    return (
        <>
            {showAuth && (
                <div className="auth-container"> {/* Added the class for styling */}
                    <button className="close-button" onClick={handleClose}>×</button> {/* Close button with X symbol */}
                    <h2>Face Authentication</h2>
                    <video ref={videoRef} className="video-preview" /> {/* Apply the video preview class */}
                    <div className="button-group"> {/* Apply button group class */}
                        <button className="action-button" onClick={startCamera}>Start Camera</button>
                        <button className="action-button" onClick={() => captureImage('front')}>Capture Front Image</button>
                        <button className="action-button" onClick={() => captureImage('left')}>Capture Left Image</button>
                        <button className="action-button" onClick={() => captureImage('right')}>Capture Right Image</button>
                    </div>
                    {message && <p className="success-message">{message}</p>} {/* Apply success message class */}
                    <div>
                        <button className="action-button" onClick={registerFace}>Register Face</button>
                        <button className="action-button" onClick={verifyFace}>Verify Face</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Auth;

