import React, { useState, useEffect } from 'react';
import './DashBot.css';

function Dasbot() {
    const [messages, setMessages] = useState([]);
    const [recognition, setRecognition] = useState(null);
    const [synth, setSynth] = useState(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        setRecognition(new SpeechRecognition());
        setSynth(window.speechSynthesis);
    }, []);

    const startConversation = () => {
        greetUser();
    };

    const greetUser = () => {
        const greeting = "Hi, I am Max. How can I help you today? I will be your learning tutor.";
        appendMessage('bot', greeting);
        speak(greeting, () => listen());
    };

    const listen = () => {
        recognition.start();
        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            appendMessage('user', speechResult);
            processQuestion(speechResult);
        };

        recognition.onerror = (event) => {
            console.error(event.error);
            appendMessage('bot', "Sorry, I didn't catch that. Could you please say it again?");
            speak("Sorry, I didn't catch that. Could you please say it again?", () => listen());
        };
    };

    const processQuestion = (question) => {
        if (isRelevant(question)) {
            getAnswerFromAPI(question, (answer) => {
                appendMessage('bot', answer);
                speak(answer, () => {
                    followUpQuestion();
                });
            });
        } else {
            const response = "The question is not relevant to IELTS. Please ask a question related to the IELTS exam.";
            appendMessage('bot', response);
            speak(response, () => followUpQuestion());
        }
    };

    const followUpQuestion = () => {
        const followUpResponse = "Do you have any other questions? Please say 'yes' or 'no'.";
        appendMessage('bot', followUpResponse);
        speak(followUpResponse, () => {
            listenForFollowUpResponse();
        });
    };

    const listenForFollowUpResponse = () => {
        recognition.start();
        recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript.toLowerCase();
            appendMessage('user', speechResult);

            if (speechResult.includes("no")) {
                const closingResponse = "Thank you for your time! If you have more questions later, feel free to ask. Have a great day. Bye!";
                appendMessage('bot', closingResponse);
                speak(closingResponse);
            } else if (speechResult.includes("yes")) {
                const continueResponse = "Great! What's the question in your mind?";
                appendMessage('bot', continueResponse);
                speak(continueResponse, () => listen());
            } else {
                const unclearResponse = "Sorry, I didn't catch that. Could you please say it again?";
                appendMessage('bot', unclearResponse);
                speak(unclearResponse, () => listenForFollowUpResponse());
            }
        };

        recognition.onerror = (event) => {
            console.error(event.error);
            appendMessage('bot', "Sorry, I didn't catch that. Could you please say it again?");
            speak("Sorry, I didn't catch that. Could you please say it again?", () => listenForFollowUpResponse());
        };
    };

    const isRelevant = (question) => {
        const IELTS_KEYWORDS = ['ielts', 'test', 'exam', 'reading', 'writing', 'listening', 'speaking', 'band', 'score'];
        return IELTS_KEYWORDS.some(keyword => question.toLowerCase().includes(keyword));
    };

    const getAnswerFromAPI = (question, callback) => {
        fetch('/api/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: question })
        })
        .then(response => response.json())
        .then(data => {
            callback(data.answer);
        })
        .catch(error => {
            console.error('Error:', error);
            callback("There was an error processing your request.");
        });
    };

    const appendMessage = (sender, message) => {
        setMessages(prevMessages => [...prevMessages, { sender, message }]);
    };

    const speak = (text, callback) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = callback;
        synth.speak(utterance);
    };

    return (
        <div className="dasbot-container">
            <div className="dasbot-header">
                <h2>IELTS Chatbot - Max</h2>
            </div>
            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender}`}>
                        {msg.message}
                    </div>
                ))}
            </div>
            <button className="start-conversation" onClick={startConversation}>
                Start Conversation
            </button>
        </div>
    );
}

export default Dasbot;
