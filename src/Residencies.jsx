

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import 'swiper/css';
import './Residencies.css';
import { sliderSettings } from './common';
import data from './slider.json';
import { Button, notification, Modal, Checkbox } from 'antd';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Residencies = () => {
    const [popupVisible, setPopupVisible] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [authPopupVisible, setAuthPopupVisible] = useState(false); // New state for auth popup
    const [microphoneAllowed, setMicrophoneAllowed] = useState(false);
    const [cameraAllowed, setCameraAllowed] = useState(false);
    const [networkStatus, setNetworkStatus] = useState(''); // New state for network status

    const handleCardClick = (plan) => {
        setSelectedPlan(plan);
        setPopupVisible(true);
        document.body.style.overflow = 'hidden'; // Disable scroll when popup opens
    };

    const closePopup = () => {
        setPopupVisible(false);
        setSelectedPlan(null);
        document.body.style.overflow = ''; // Restore scroll when popup closes
    };

    const checkNetworkStatus = () => {
        // Dummy implementation for network status check
        const isOnline = navigator.onLine;
        if (isOnline) {
            setNetworkStatus('Good');
        } else {
            setNetworkStatus('Poor');
        }
    };

    const handlePayment = async () => {
        if (!window.Razorpay) {
            notification.error({
                message: 'Razorpay Script Error',
                description: 'Razorpay script not loaded. Please check if the Razorpay script is included in the HTML.',
            });
            return;
        }

        const user_id = localStorage.getItem('user_id'); // Get user ID from local storage

        // Check if the user has an active plan
        const checkPlanResponse = await fetch(`http://141.136.42.65:8081/check_plan_status?user_id=${user_id}`);
        const checkPlanData = await checkPlanResponse.json();

        if (checkPlanData.status === 'active') {
            notification.warning({
                message: 'Active Plan Detected',
                description: 'You already have an active plan. Try upgrading your plan instead.',  
            });
            return; // Stop the payment process if the user has an active plan
        }

        try {
            // Create an order
            const orderResponse = await fetch('/api/create_order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: (parseFloat(selectedPlan.price.replace(/,/g, '')) * 100).toString(), // Convert to paise
                    currency: 'INR',
                }),
            });

            if (!orderResponse.ok) {
                throw new Error('Failed to create order');
            }

            const orderData = await orderResponse.json();
            const { order_id } = orderData;

            const options = {
                key: 'rzp_test_MgBR86kWUWJ04V', // Replace with your Razorpay key ID
                amount: (parseFloat(selectedPlan.price.replace(/,/g, '')) * 100).toString(), // Amount in paise
                currency: 'INR',
                name: 'Payment for Plan',
                description: `Payment for ${selectedPlan.name}`,
                order_id: order_id,
                handler: function (response) {
                    // When the payment is successful, capture the payment details
                    const paymentDetails = {
                        payment_id: response.razorpay_payment_id,
                        order_id: response.razorpay_order_id,
                        signature: response.razorpay_signature,
                        user_id: user_id, // Include user ID
                        plan_id: selectedPlan.razorpayProductId, // Include plan ID
                    };

                    // Send payment details to Flask application
                    fetch('/api/payment_success', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(paymentDetails),
                    })
                    .then(response => response.json())
                    .then(data => {
                        notification.success({
                            message: 'Payment Successful',
                            description: `Your payment of ₹${selectedPlan.price} has been successfully processed. Thank you for purchasing ${selectedPlan.name}.`,
                        });
                        closePopup();
                        // Show authentication popup after successful payment
                        setAuthPopupVisible(true);
                    })
                    .catch(error => {
                        notification.error({
                            message: 'Payment Error',
                            description: `Failed to store payment details: ${error.message}`,
                        });
                    });
                },
                prefill: {
                    name: 'Student Name',
                    email: 'student@example.com',
                    contact: '1234567890',
                },
                theme: {
                    color: '#3399cc',
                },
                modal: {
                    ondismiss: () => {
                        closePopup(); // Close popup and restore scroll if payment modal is dismissed
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            notification.error({
                message: 'Order Creation Error',
                description: `Failed to create order: ${error.message}`,
            });
        }
    };

    useEffect(() => {
        checkNetworkStatus();
    }, []);

    const areas = [
        "Australia", "Canada", "New Zealand", "United Kingdom", "United States",
        "Ireland", "South Africa", "Singapore", "Germany", "France", "Netherlands",
        "Sweden", "Switzerland", "United Arab Emirates", "United States", "Ireland",
        "South Africa", "Singapore", "Sweden"
    ];

    return (
        <section className="r-wrapper">
            <div className="paddings innerWidth r-container">
                <div className="r-head flexColStart">
                    <span className='orangeText'>Services we provide</span>
                    <div className="scroll-container">
                        <div className="scroll-text">
                            <span className='primaryText'>Areas we cover: </span>
                            {areas.map((area, index) => (
                                <span key={index}>{area}</span>
                            ))}
                        </div>
                    </div>
                    <span className='primaryText'>Popular Plans</span>
                </div>

                <Swiper {...sliderSettings} className="swiper-container">
                   <SliderButton /> 
                    {
                        data.map((card, i) => (
                            <SwiperSlide key={i} onClick={() => handleCardClick(card)}>
                                <div className="flexColStart r-card" style={{ backgroundColor: card.color }}>
                                    <img src={card.image} alt={card.name} className='card-img'/><br />
                                    <span className="r-price">
                                        <span style={{ color: 'orange', fontSize: '22px' }}><b>₹</b></span>
                                        <span className='price-det'>{card.price}</span>
                                    </span>
                                    <span className='primaryText'>{card.name}</span>

                                    {/* Display details as a list */}
                                    <ul className="ordered-list">
                                        {Array.isArray(card.detail) && card.detail.map((item, index) => (
                                            <li key={index} className="list-item">
                                                <span className="checkmark">✔</span>
                                                <span className="list-text">{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Buy Now button */}
                                    <Button
                                        type="primary"
                                        size="large"
                                        className="button"
                                        onClick={(e) => {
                                            e.stopPropagation(); // Prevent click from closing the popup
                                            handleCardClick(card);
                                        }}
                                    >
                                        Buy Now
                                    </Button>
                                </div>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>

                {popupVisible && selectedPlan && (
                    <div className="popup-overlay show" onClick={closePopup}>
                        <div className="popup-content" style={{ backgroundColor: selectedPlan.color }} onClick={(e) => e.stopPropagation()}>
                            <h2 className='plan-name'>{selectedPlan.name}</h2>

                            <ul className="ordered-list">
                                {selectedPlan.detail.map((item, index) => (
                                    <li key={index} className="list-item">
                                        <span className="checkmark">✔</span>
                                        <span className="list-text">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                type="primary"
                                size="large"
                                className="button"
                                onClick={handlePayment}
                            >
                                Proceed to Pay ₹{selectedPlan.price}
                            </Button>
                        </div>
                    </div>
                )}

                {/* Authentication popup */}
                <Modal
                    title="Complete Authentication"
                    visible={authPopupVisible}
                    onCancel={() => setAuthPopupVisible(false)}
                    footer={[
                        <Link key="submit" to="/auth">
                            <Button type="primary">
                                Authenticate
                            </Button>
                        </Link>,
                    ]}
                >
                    <p><strong>Microphone Access:</strong> {microphoneAllowed ? 'Allowed' : 'Not Allowed'}</p>
                    <p><strong>Camera Access:</strong> {cameraAllowed ? 'Allowed' : 'Not Allowed'}</p>
                    <p><strong>Network Status:</strong> {networkStatus}</p>
                    <Checkbox checked={microphoneAllowed} onChange={() => setMicrophoneAllowed(!microphoneAllowed)}>
                        Allow Microphone Access
                    </Checkbox>
                    <Checkbox checked={cameraAllowed} onChange={() => setCameraAllowed(!cameraAllowed)}>
                        Allow Camera Access
                    </Checkbox>
                </Modal>
            </div>
        </section>
    );
};

// Button component to control Swiper
const SliderButton = () => {
    const swiper = useSwiper();
    return (
        <div className=" r-buttons">
            <Button onClick={() => swiper.slidePrev()}>&lt; </Button>
            <Button onClick={() => swiper.slideNext()}>&gt;</Button> 
        </div>
    );
};

export default Residencies;