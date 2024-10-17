import React, { useState } from 'react';
import './Chathelp.css';
 
const Chathelp = () => {
    const [isActive, setIsActive] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
 
    // Get user_id from localStorage
    const userId = localStorage.getItem('user_id');
 
    // Toggle the visibility of the chatbox
    const toggleChatbox = () => {
        setIsActive(!isActive);
    };
 
    // Send a message to the Flask backend and get the response
    const handleSendMessage = async () => {
        if (inputValue === "") return;
 
        // Add the user's message to the messages array
        const userMessage = { name: "User", message: inputValue };
        setMessages(prevMessages => [...prevMessages, userMessage]);
 
        try {
            // Send the message and user ID to the Flask backend
            const response = await fetch('http://141.136.42.65:8081/query', {
                method: 'POST',
                body: JSON.stringify({ query: inputValue, user_id: userId }),  // Send user_id here
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await response.json();
 
            // Add the bot's message to the messages array
            const botMessage = { name: "IVY", message: data.response };
            setMessages(prevMessages => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = { name: "IVY", message: "Sorry, something went wrong. Please try again later." };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        }
 
        setInputValue('');  // Clear the input field
    };
 
    // Send a message when the Enter key is pressed
    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            handleSendMessage();
        }
    };
 
    return (
        <div className="chatHelpbox">
            <div className={`chatHelpbox__support ${isActive ? 'chatbox--active' : 'chatbox--inactive'}`}>
                <div className="chatHelpbox__header">
                    <div className="chatHelpbox__image--header">
                        <img src="/icons8-chat-bot (1).gif" alt="Chat Bot" />
                    </div>
                    <div className="chatHelpbox__content--header">
                        <h4 className="chatHelpbox__heading--header">IVY Chatbot</h4>
                        <p className="chatHelpbox__description--header">Hi. My name is IVY. How can I help you?</p>
                    </div>
                </div>
                <div className="chatHelpbox__messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`messages_item ${msg.name === "IVY" ? "messages_item--visitor" : "messages_item--operator"}`}>
                            {msg.message}
                        </div>
                    ))}
                </div>
                <div className="chatHelpbox__footer">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyUp={handleKeyUp}
                        placeholder="Write a message..."
                    />
                    <button className="send__button" onClick={handleSendMessage}>Send</button>
                </div>
            </div>
            <div className="chatHelpbox__buttonn">
                <button className='ChathelpImg' onClick={toggleChatbox}><img src="/helperbot.gif" alt="Chat" /></button>
             
            </div>
        </div>
    );
};
 
export default Chathelp;