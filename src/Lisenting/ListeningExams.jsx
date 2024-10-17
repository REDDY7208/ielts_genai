import React, { useState, useEffect } from "react";
import './ListeningTest.css';
import listenAudio1 from '../assets/listenAudio1.mp3'; // Audio for test 1
import listenAudio2 from '../assets/listenAudio2.mp3'; // Audio for test 2
import listenAudio3 from '../assets/listenAudio3.mp3'; // Audio for test 3
import listenAudio4 from '../assets/listenAudio4.mp3'; // Audio for test 4
import listenAudio5 from '../assets/listenAudio5.mp3'; // Audio for test 5
import listenAudio6 from '../assets/listenAudio6.mp3'; // Audio for test 6
import listenAudio7 from '../assets/listenAudio7.mp3'; // Audio for test 7
import listenAudio8 from '../assets/listenAudio8.mp3'; // Audio for test 8
import listenAudio9 from '../assets/listenAudio9.mp3'; // Audio for test 9
import listenAudio10 from '../assets/listenAudio10.mp3'; // Audio for test 10

import jsonData1 from '../data/listeningQuestion1.json';
import jsonData2 from '../data/listeningQuestion2.json';
import jsonData3 from '../data/listeningQuestion3.json';
import jsonData4 from '../data/listeningQuestion4.json';
import jsonData5 from '../data/listeningQuestion5.json';
import jsonData6 from '../data/listeningQuestion6.json';
import jsonData7 from '../data/listeningQuestion7.json';
import jsonData8 from '../data/listeningQuestion8.json';
import jsonData9 from '../data/listeningQuestion9.json';
import jsonData10 from '../data/listeningQuestion10.json';

const ListeningExams = ({ testId }) => {
    console.log("testId:", testId); // Log testId for debugging

    const [jsonData, setJsonData] = useState({ questions: [] });
    const [step, setStep] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(2400);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [answers, setAnswers] = useState({});
    const [currentPart, setCurrentPart] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const audioRef = React.useRef(null);

    const userId = localStorage.getItem('user_id'); 

    const jsonFiles = {
        test1: jsonData1,
        test2: jsonData2,
        test3: jsonData3,
        test4: jsonData4,
        test5: jsonData5,
        test6: jsonData6,
        test7: jsonData7,
        test8: jsonData8,
        test9: jsonData9,
        test10: jsonData10,
    };
    const audioFiles = {
        test1: listenAudio1,
        test2: listenAudio2,
        test3: listenAudio3,
        test4: listenAudio4,
        test5: listenAudio5,
        test6: listenAudio6,
        test7: listenAudio7,
        test8: listenAudio8,
        test9: listenAudio9,
        test10: listenAudio10,
    };

    useEffect(() => {
        setJsonData(jsonFiles[testId] || jsonData1);
    }, [testId]);

    useEffect(() => {
        if (step === 2 && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prevTime) => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        } else if (timeRemaining === 0) {
            setIsTimeUp(true);
            alert("Time is up! The test will be submitted now.");
            handleSubmit();
        }
    }, [step, timeRemaining]);

    const handleStartNow = async () => {
        try {
            // Call the start monitoring API
            const startMonitoringResponse = await fetch('/api/start_monitoring', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId }),
            });
            if (startMonitoringResponse.ok) {
                console.log('Monitoring started');
            } else {
                console.error('Failed to start monitoring');
            }
        } catch (error) {
            console.error('Error starting monitoring:', error);
        }

        goFullScreen();
        disableBackNavigation();
        setStep(2);
        audioRef.current?.play();
    };

    const goFullScreen = () => {
        const { document } = window;
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
        }
    };

    const disableBackNavigation = () => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleInputChange = (e, id) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: e.target.value,
        }));
    };

    const handleCheckboxChange = (e, id) => {
        const value = e.target.value;
        setAnswers((prevAnswers) => {
            const currentAnswers = prevAnswers[id] || [];
            if (currentAnswers.includes(value)) {
                return {
                    ...prevAnswers,
                    [id]: currentAnswers.filter((item) => item !== value),
                };
            } else {
                return {
                    ...prevAnswers,
                    [id]: [...currentAnswers, value],
                };
            }
        });
    };

    const handleRadioChange = (e, id) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        const baseSubmitURL = 'http://141.136.42.65:5010/submits';  
        
        
        try {
            const stopMonitoringResponse = await fetch('/api/stop_monitoring', {
                method: 'POST',
            });
            if (stopMonitoringResponse.ok) {
                console.log('Monitoring stopped');
            } else {
                console.error('Failed to stop monitoring');
             }

            const response = await fetch(baseSubmitURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers, user_id: userId,testId}),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Answers submitted successfully!');
                console.log(result);
                window.location.href = '/Dashboard';
            } else {
                alert('Failed to submit answers.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during submission.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const swapSection = (part) => {
        setCurrentPart(part);
    };

    const filteredQuestions = jsonData?.sections?.find(section => section.part === `Section_0${currentPart}`)?.questions || [];

    // Function to prevent default behavior for copy, paste, and cut
    const preventDefaultBehavior = (e) => {
        e.preventDefault();
    };

    return (
        <div className="listening-test">
            {isSubmitting && (
                <div className="loading-overlay">
                    <div className="loading-content">
                        <div className="spinner"></div>
                        <p>Your responses are being stored...</p>
                    </div>
                </div>
            )}

            {step === 1 ? (
                 <div className="listening-test__container">
                 <div className="listening-test__card listening-test__card--info">
                     <h2 className="lis-head">Listening Practice {testId}</h2>

                     <h2>Skill grows with every session!</h2>
                     <h3>Test information</h3>
                    
                     <p>✔ <b>Part 1 </b>(10 questions)</p>
                     <p>✔ <b>Part 2 </b> (10 questions)</p>
                     <p>✔ <b>Part 3 </b> (10 questions)</p>
                     <p>✔  <b>Part 4 </b> (10 questions)</p>
                     <p> <b>✔ Time Limit of The Exam:</b> 40 mins</p>
                     <h3> Test Format:</h3>
                     <p> <b>4  </b>Sections, <b>40</b> Questions <b>(Part 1: 10, Part 2: 10, Part 3: 10, Part 4: 10)</b>. Exam Timing: <b>30 </b> minutes with an additional <b>10 </b> minutes for answer transfer.</p>
                 </div>

                 <div className="listening-test__card listening-test__card--instructions">
                     <h2 className="lis-head">Important Instructions</h2>
                     <h2>Welcome to the listening test. Please read and follow these instructions carefully:</h2>
                     <ul className="listening-test__instructions">
                         <li><strong>Audio Playback  :  </strong> The audio will autoplay same time audio not visible during the test. Make sure your volume is adjusted to hear clearly.</li>
                         <li><strong>Single Listening  :  </strong> The audio will only play once, so listen attentively to answer the questions accurately.</li>
                         <li><strong>Answering  : </strong> Write your answers as you listen.<b> do not wait</b> until the audio is finished to start writing.</li>
                         <li><strong>Check Your Network Connection  :  </strong> Ensure a stable internet connection to prevent interruptions during the test.</li>
                         <li><strong>Instructions Review : </strong>Read each question carefully before the audio starts to prepare for the listening section.</li>
                     </ul>
                     <button className="listening-test__buttonn" onClick={handleStartNow}>
                         Start Now
                     </button>
                 </div>

             </div>

            ) : (
                <div className="listening-test__content">
                    <div className="listen-header">
                        <div className="timer">
                            <p>
                                <i className="fas fa-clock"></i> Time Remaining: {formatTime(timeRemaining)}
                            </p>
                            {isTimeUp && <p><i className="fas fa-clock"></i> Time is up!</p>}
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="submit-btn"
                            disabled={isSubmitting || isTimeUp}
                        >
                            Submit
                        </button>
                    </div>

                    <div className="listen-audio">
                    <audio ref={audioRef} autoPlay loop controls={false}>
                            <source src={audioFiles[testId]} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>

                    <h2 className="lis-para-title">{jsonData.sections[currentPart - 1]?.paragraph_title}</h2>
                    <p><b>{jsonData.sections[currentPart - 1]?.instructions.main_head_001}</b></p>

                    <form className="lis-form">
                        {filteredQuestions.map((question) => (
                            <div key={question.id} className="listen-question">
                                <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
                                {question.type === 'fill_in_the_blanks' && (
                                    <input
                                        type="text"
                                        placeholder="Enter your answer"
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleInputChange(e, question.id)}
                                        onCopy={preventDefaultBehavior}
                                        onPaste={preventDefaultBehavior}
                                        onCut={preventDefaultBehavior}
                                        style={{ outline: 'none', textDecoration: 'none' }}
                                        spellCheck="false"
                                    />
                                )}

                                {question.type === 'checkbox' && question.options.map((option, index) => (
                                    <div key={index}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value={option}
                                                checked={answers[question.id]?.includes(option) || false}
                                                onChange={(e) => handleCheckboxChange(e, question.id)}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}

                                {question.type === 'choose_the_best' && question.options.map((option, index) => (
                                    <div key={index}>
                                        <label>
                                            <input
                                                type="radio"
                                                value={option}
                                                checked={answers[question.id] === option}
                                                onChange={(e) => handleRadioChange(e, question.id)}
                                            />
                                            {option}
                                        </label>
                                    </div>
                                ))}

                                {question.type === 'dropdown' && (
                                    <select
                                        value={answers[question.id] || ''}
                                        onChange={(e) => handleInputChange(e, question.id)}
                                    >
                                        <option value="">Select an option</option>
                                        {question.options.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        ))}
                    </form>


                    <div className="listen-part-switch">
                 
                       
                        <button  onClick={() => swapSection(1)} className= {currentPart === 1 ? 'active' : ''}>
                            Part 1
                        </button>
                        <button onClick={() => swapSection(2)} className={currentPart === 2 ? 'active' : ''}>
                            Part 2
                        </button>
                        <button onClick={() => swapSection(3)} className={currentPart === 3 ? 'active' : ''}>
                            Part 3
                        </button>
                        <button onClick={() => swapSection(4)} className={currentPart === 4 ? 'active' : ''}>
                            Part 4
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListeningExams;



