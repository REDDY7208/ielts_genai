// import React from 'react';

// const Product = () => {
//     const handlePayment = async () => {
//         try {
//             // Create an order
//             const orderResponse = await fetch('http://141.136.42.65:5000/create_order', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     amount: 1000, // Amount in paise (₹10)
//                     currency: 'INR'
//                 }),
//             });

//             if (!orderResponse.ok) {
//                 throw new Error('Failed to create order');
//             }

//             const orderData = await orderResponse.json();
//             const { order_id } = orderData;

//             const options = {
//                 key: 'rzp_test_xh2srTIIZrt29i', // Replace with your Razorpay key ID
//                 amount: 1000, // Amount in paise (₹10)
//                 currency: 'INR',
//                 name: 'Product 1',
//                 description: 'An example product',
//                 order_id: order_id,
//                 handler: function (response) {
//                     // When the payment is successful, capture the payment details
//                     const paymentDetails = {
//                         payment_id: response.razorpay_payment_id,
//                         order_id: response.razorpay_order_id,
//                         signature: response.razorpay_signature,
//                     };

//                     // Send payment details to Flask application
//                     fetch('http://localhost:5000/payment_success', {
//                         method: 'POST',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                         body: JSON.stringify(paymentDetails),
//                     })
//                     .then(response => response.json())
//                     .then(data => {
//                         console.log('Payment details stored successfully', data);
//                     })
//                     .catch(error => {
//                         console.error('Failed to store payment details', error);
//                     });
//                 },
//                 prefill: {
//                     name: "John Doe",
//                     email: "johndoe@example.com",
//                     contact: "9999999999"
//                 },
//                 theme: {
//                     color: "#3399cc"
//                 }
//             };

//             const rzp = new window.Razorpay(options);
//             rzp.open();
//         } catch (error) {
//             console.error('Error creating order', error);
//         }
//     };

//     return (
//         <div>
//             <h2>Product 1</h2>
//             <p>An example product description.</p>
//             <button onClick={handlePayment}>Buy Now</button>
//         </div>
//     );
// };

// export default Product;
