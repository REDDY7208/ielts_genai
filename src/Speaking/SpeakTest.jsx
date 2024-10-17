
import React, { useState, useEffect } from 'react';
import './SpeakTest.css';

const SpeakTest = () => {
    const [questions, setQuestions] = useState([]);
    const [responses, setResponses] = useState([]);
    const [feedback, setFeedback] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // Fetch the user ID from local storage
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const startTest = async () => {
        // Reset states
        setQuestions([]);
        setResponses([]);
        setFeedback('');
        setStatus('');

        try {
            const response = await fetch('/api/start-test', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: userId }) // Sending the user ID to the backend
            });
            const data = await response.json();

            if (response.ok) {
                // Successfully received data from backend
                setQuestions(data.results.questions || []);
                setResponses(data.results.responses || []);
                setFeedback(data.results.Feedback || '');
                setStatus(data.message);
            } else {
                // Show the error message from backend
                setStatus(data.message);
            }
        } catch (error) {
            console.error('Error starting test:', error);
            setStatus('Error starting the test. Please try again later.');
        }
    };

    return (
        <div className="test-container">
            <h1>IELTS Speaking Test Simulation</h1>

            <button onClick={startTest} disabled={!userId}>Start Test</button>

            {status && <p className="status-message">{status}</p>}

            {questions.length > 0 && (
                <div className="response-container">
                    <div className="responses">
                        {questions.map((question, index) => (
                            <div key={index}>
                                <div className="question">Question {index + 1}: {question}</div>
                                <div className="response">Your Response: {responses[index]}</div>
                            </div>
                        ))}
                    </div>
                    <div className="feedback">
                        <strong>Feedback:</strong> {feedback}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpeakTest;





