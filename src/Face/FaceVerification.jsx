


/*import React, { useState, useRef, useEffect } from 'react';
import './AuthFace.css';

const FaceVerification = ({ onSuccess, onClose }) => {
    const [userId, setUserId] = useState(localStorage.getItem('user_id')); // Get the user ID from local storage
    const videoRef = useRef(null);
    const [message, setMessage] = useState(''); // For success or failure message
    const [accessGranted, setAccessGranted] = useState(false); // Track if access is granted
    const [mediaStream, setMediaStream] = useState(null); // Keep track of the media stream

    const startCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                setMediaStream(stream); // Save the stream reference

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.addEventListener('loadedmetadata', () => {
                        videoRef.current.play().catch(error => console.error("Error during video play:", error));
                    });
                }
            })
            .catch((err) => {
                console.error("Camera access denied: ", err);
                setMessage("Camera access denied. Please check your permissions.");
            });
    };

    const stopCamera = () => {
        if (mediaStream) {
            const tracks = mediaStream.getTracks();
            tracks.forEach(track => track.stop()); // Stop each track of the media stream
            setMediaStream(null); // Reset the mediaStream state

            if (videoRef.current) {
                videoRef.current.srcObject = null; // Clear the video source
                videoRef.current.pause(); // Pause the video element
            }

            console.log('Camera stopped immediately');
        } else {
            console.log('No mediaStream found');
        }
    };

    const verifyFace = async () => {
        if (!videoRef.current || !mediaStream) {
            setMessage("No camera detected. Please start the camera.");
            return;
        }

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
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Example if you need token
                }
            });

            if (response.status === 403) {
                setMessage("Access Denied.");
                return;
            }

            const result = await response.json();

            if (result.message === 'Access granted!') {
                setAccessGranted(true); // Access is granted, show the message and OK button
                setMessage('Access Granted'); // Set message to Access Granted
            } else {
                setMessage(result.message); // Set failure message
            }
        } catch (error) {
            console.error('Error during face verification:', error);
            setMessage('Verification failed. Please try again.');
        }
    };

    useEffect(() => {
        startCamera();

        // Cleanup: stop the camera when component unmounts
        return () => {
            stopCamera();
        };
    }, []);

    const handleSuccess = () => {
        stopCamera(); // Stop the camera immediately when user clicks OK
        onSuccess(); // Proceed with the success callback
    };

    return (
        <div className="auth-container">
            <h2>Face Verification</h2>
            <video ref={videoRef} className="video-preview" />
            {!accessGranted ? (
                <div className="button-group">
                    <button className="action-button" onClick={startCamera}>Start Camera</button>
                    <button className="action-button" onClick={verifyFace}>Verify Face</button>
                    <p> <b>Ensure clear lighting and face the camera straight.</b>
                    </p>
                </div>
            ) : (
                <div className="access-granted-message">
                    <p>{message}</p>
                    <button className="ok-button" onClick={handleSuccess}>OK</button>
                </div>
            )}
            {message && !accessGranted && <p className="error-message">{message}</p>}
            <button className="close-button" onClick={onClose} aria-label="Close">
                &times;
            </button>
        </div>
    );
};

export default FaceVerification;*/
import React, { useState, useRef, useEffect } from 'react';
import './AuthFace.css';
 
const FaceVerification = ({ onSuccess, onClose }) => {
    const [userId, setUserId] = useState(localStorage.getItem('user_id')); // Get the user ID from local storage
    const videoRef = useRef(null);
    const [message, setMessage] = useState(''); // For success or failure message
    const [accessGranted, setAccessGranted] = useState(false); // Track if access is granted
    const [mediaStream, setMediaStream] = useState(null); // Keep track of the media stream
 
    const startCamera = () => {
        // Check if browser supports getUserMedia
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setMessage("Your browser does not support camera access.");
            return;
        }
 
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                setMediaStream(stream); // Save the stream reference
 
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.addEventListener('loadedmetadata', () => {
                        videoRef.current.play().catch(error => console.error("Error during video play:", error));
                    });
                }
            })
            .catch((err) => {
                console.error("Camera access denied: ", err);
                setMessage("Camera access denied. Please check your permissions or try another browser.");
            });
    };
 
    const stopCamera = () => {
        if (mediaStream) {
            const tracks = mediaStream.getTracks();
            tracks.forEach(track => track.stop()); // Stop each track of the media stream
            setMediaStream(null); // Reset the mediaStream state
 
            if (videoRef.current) {
                videoRef.current.srcObject = null; // Clear the video source
                videoRef.current.pause(); // Pause the video element
            }
 
            console.log('Camera stopped immediately');
        } else {
            console.log('No mediaStream found');
        }
    };
 
    const verifyFace = async () => {
        if (!videoRef.current || !mediaStream) {
            setMessage("No camera detected. Please start the camera.");
            return;
        }
 
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
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Example if you need token
                }
            });
 
            if (response.status === 403) {
                setMessage("Access Denied.");
                return;
            }
 
            const result = await response.json();
 
            if (result.message === 'Access granted!') {
                setAccessGranted(true); // Access is granted, show the message and OK button
                setMessage('Access Granted'); // Set message to Access Granted
            } else {
                setMessage(result.message); // Set failure message
            }
        } catch (error) {
            console.error('Error during face verification:', error);
            setMessage('Verification failed. Please try again.');
        }
    };
 
    useEffect(() => {
        startCamera();
 
        // Cleanup: stop the camera when component unmounts
        return () => {
            stopCamera();
        };
    }, []);
 
    const handleSuccess = () => {
        stopCamera(); // Stop the camera immediately when user clicks OK
        onSuccess(); // Proceed with the success callback
    };
 
    return (
<div className="auth-container">
<h2>Face Verification</h2>
<video ref={videoRef} className="video-preview" />
            {!accessGranted ? (
<div className="button-group">
<button className="action-button" onClick={startCamera}>Start Camera</button>
<button className="action-button" onClick={verifyFace}>Verify Face</button>
<p> <b>Ensure clear lighting and face the camera straight.</b> </p>
</div>
            ) : (
<div className="access-granted-message">
<p>{message}</p>
<button className="ok-button" onClick={handleSuccess}>OK</button>
</div>
            )}
            {message && !accessGranted && <p className="error-message">{message}</p>}
<button className="close-button" onClick={onClose} aria-label="Close">
&times;
</button>
</div>
    );
};
 
export default FaceVerification;


