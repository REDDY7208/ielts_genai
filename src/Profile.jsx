// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Profile.css';

// const Profile = () => {
//   const [userDetails, setUserDetails] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch('http://127.0.0.1:5006/user-details'); // Replace with your API endpoint
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setUserDetails(data);
//       } catch (error) {
//         console.error('Error fetching user details:', error);
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   if (!userDetails) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="profile-container">
//       <h1>Profile Details</h1>
//       <p><strong>Email:</strong> {userDetails.email}</p>
//       <p><strong>Full Name:</strong> {userDetails.fullname}</p>
//       <p><strong>Mobile Number:</strong> {userDetails.mobile}</p>
//       <p><strong>Plan:</strong> {userDetails.plan}</p>
//       <p><strong>Purchase Date:</strong> {userDetails.purchase_date}</p>
//       <p><strong>Expiry Date:</strong> {userDetails.expire_date}</p>
//       <button onClick={() => navigate('/')}>Go Back to Home</button>
//     </div>
//   );
// };

// export default Profile;
