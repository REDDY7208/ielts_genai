import React, { useState, useEffect } from 'react';
import testData1 from '../data/readingQuestion_01.json';
import testData2 from '../data/readingQuestion_02.json';
import testData3 from '../data/readingQuestion_03.json';
import testData4 from '../data/readingQuestion_04.json';
import testData5 from '../data/readingQuestion_05.json';
import testData6 from '../data/readingQuestion_06.json';
import './ReadingTest.css';

const ReadingTest = ({ testId }) => {
    const [jsonData, setJsonData] = useState({ questions: [] });
    const [step, setStep] = useState(1);
    const [timeRemaining, setTimeRemaining] = useState(3600);
    const [isTimeUp, setIsTimeUp] = useState(false);
    const [currentPart, setCurrentPart] = useState(1);
    const [currentPartQuestions, setCurrentPartQuestions] = useState([]);
    const [paragraphTitle, setParagraphTitle] = useState('');
    const [paragraphText, setParagraphText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [answers, setAnswers] = useState({});
    const [isTestActive, setIsTestActive] = useState(true);
    const [highlightedText, setHighlightedText] = useState({});
    const [isTimerPaused, setIsTimerPaused] = useState(false);

    const jsonFiles = {
        test1: testData1,
        test2: testData2,
        test3: testData3,
        test4: testData4,
        test5: testData5,
        test6: testData6
    };

    useEffect(() => {
        setJsonData(jsonFiles[testId] || testData1);
    }, [testId]);

    useEffect(() => {
        const selectedTestData = jsonFiles[testId];
        const partData = selectedTestData.find(test => test.essay_no === `para_00${currentPart}`);
        if (partData) {
            setParagraphTitle(partData.paragraph_title);
            setParagraphText(partData.paragraph_text);
            setCurrentPartQuestions(partData.questions);
        }
    }, [currentPart, testId]);

    useEffect(() => {
        let timer;
        if (step === 2 && !isTimerPaused) {
            timer = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 0) {
                        clearInterval(timer);
                        setIsTimeUp(true);
                        alert("Times Up ...Your test will be submitted");
                        handleReadingSubmit();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    }, [step, isTimerPaused]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswerChange = (questionId, value) => {
        setAnswers({
            ...answers,
            [questionId]: value
        });
    };

    const handleReadingSubmit = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        //const submitEndpoint = "http://141.136.42.65:5007/reading-submit-answers";
        const submitEndpoint ='/api/reading-submit-answers';

        const user_id = localStorage.getItem('user_id');

        try {
            const response = await fetch(submitEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    answers,
                    currentPart,
                    testId,
                    user_id
                }),
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
            alert('An error occurred while submitting your answers.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const swapPart = (part) => {
        setCurrentPart(part);
    };

    const enterFullScreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    };

    const handleBeforeUnload = (e) => {
        if (isTestActive) {
            e.preventDefault();
            e.returnValue = '';
        }
    };

    const getHeadingText = () => {
        switch (currentPart) {
            case 1:
                return 'You should spend about 20 minutes on Set of Questions, which are based on Reading Passage 1 below.';
            case 2:
                return 'You should spend about 20 minutes on Set of Questions, which are based on Reading Passage 2 below.';
            case 3:
                return 'You should spend about 20 minutes on Set of Questions, which are based on Reading Passage 3 below.';
            default:
                return '';
        }
    };

    const startTest = () => {
        enterFullScreen();
        setStep(2);
        disableBackNavigation();
    };

    const disableBackNavigation = () => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function () {
            window.history.go(1);
        };
    };

    return (
        <div className="reading-test">
            {isSubmitting && (
                <div className="loading-overlay-reading">
                    <div className="loading-content-reading">
                        <div className="spinner-reading"></div>
                        <p>Your responses are being stored...</p>
                    </div>
                </div>
            )}
            {step === 1 ? (
                <div className="fullscreen-overlay-reading">
                    <div className="instructions-wrapper-reading">
                        <div className="instructions-container-reading">
                            <h2>Reading Practice {testId}</h2>
                            <h4>Grow your skills with each session!</h4>
                            <h3>Test Information</h3>
                            <p>? <b>Part 1</b> (13 questions)</p>
                            <p>? <b>Part 2</b> (13 questions)</p>
                            <p>? <b>Part 3</b> (14 questions)</p>
                            <p><b>? Total Number of Questions:</b> 40 questions</p>
                            <p><b>? Time Limit of the Exam:</b> 60 minutes</p>
                            <h3>Test Format:</h3>
                            <p><b>3 Sections, 40 Questions</b> in total. You'll have <b>60 minutes</b> to complete all the sections. Manage your time wisely!</p>
                        </div>
                        <div className="video-tab-instructions-reading">
                            <h2>Important Instructions</h2>
                            <h4>Welcome to the reading test. Please read and follow these instructions carefully:</h4>
                            <ol>
                                <li><strong>Passage Reading:</strong> Read each passage carefully. Questions will be based on the content of the passage, so it's important to understand the text.</li>
                                <li><strong>Time Management:</strong> You have <b>60 minutes</b> to answer <b>40 questions</b>. There is no extra time to transfer answers, so write your answers directly on the sheet.</li>
                                <li><strong>Instructions Review:</strong> Read the instructions for each question type carefully before answering. Some questions may ask for a specific word count or type of response.</li>
                                <li><strong>Stay Focused:</strong> The texts will get more difficult as you move forward. Focus on each question carefully and avoid rushing through the final section.</li>
                                <li><strong>Check Your Network Connection:</strong> Ensure a stable internet connection to prevent interruptions during the test.</li>
                                <li><strong>Stay Focused:</strong> During the test, please do not switch to other tabs. If you do, your test will be automatically submitted.</li>
                            </ol>
                            <button onClick={startTest} className="start-button-reading">Start Now</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="reading-content">
                    <div className="fixed-header-reading">
                        <div className="timer-reading">
                            <p>
                                <i className="fas fa-clock"></i> <b>Time Remaining: {formatTime(timeRemaining)}  </b>
                            </p>
                            {isTimeUp && <p><i className="fas fa-clock"></i> Time is up!</p>}
                        </div>
                        <button
                            onClick={handleReadingSubmit}
                            className="submit-button-reading"
                            disabled={isSubmitting || isTimeUp}
                        >
                            Submit
                        </button>
                    </div>
                    <div className="scrollable-content-reading">
                        {currentPartQuestions.length > 0 && (
                            <div className="part-container-reading">
                                <div className="content-wrapper-reading">
                                    <div className="paragraph-reading">
                                        <h2 className='paraNumber-reading'>PART {currentPart}</h2>
                                        <h2 className='paraTitle-reading'>{paragraphTitle}</h2>
                                        <h3 className='paraInstruction-reading'>{getHeadingText()}</h3>
                                        <p className='paraTEXT-reading'>
                                            {paragraphText
                                                .split('\n\n')
                                                .map((paragraph, paraIndex) => (
                                                    <div key={paraIndex} className='paragraph-reading'>
                                                        {paragraph.split(/(\[blank\])/).map((part, index) => {
                                                            if (part === '[blank]') {
                                                                const questionIndex = fillInTheBlanksQuestions.shift();
                                                                return (
                                                                    <input
                                                                        key={index}
                                                                        type="text"
                                                                        name={`question_${questionIndex.id}`}
                                                                        value={answers[questionIndex.id] || ''}
                                                                        onChange={(e) => handleAnswerChange(questionIndex.id, e.target.value)}
                                                                        onCopy={(e) => e.preventDefault()}
                                                                        onCut={(e) => e.preventDefault()}
                                                                        onPaste={(e) => e.preventDefault()}
                                                                        spellCheck="false"
                                                                    />
                                                                );
                                                            }
                                                            return (
                                                                <p
                                                                    key={index}
                                                                    className={highlightedText[index] || ''}
                                                                    onClick={() => handleHighlight(index)}
                                                                >
                                                                    {part}
                                                                </p>
                                                            );
                                                        })}
                                                    </div>
                                                ))}
                                        </p>
                                    </div>
                                    <div className="questions-reading">
                                        <h2 className='questionNumber-reading'>
                                            Questions {currentPart === 1 ? 'PART 1' : currentPart === 2 ? 'PART 2' : 'PART 3'}
                                        </h2>
                                        {currentPartQuestions.map((question, index) => (
                                            <div key={index} className="question-reading">
                                                <p dangerouslySetInnerHTML={{ __html: question.text }}></p>
                                                {question.type === 'fill_in_the_blanks' && (
                                                    <input
                                                        type="text"
                                                        name={`question_${question.id}`}
                                                        value={answers[question.id] || ''}
                                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                                        onCopy={(e) => e.preventDefault()}
                                                        onCut={(e) => e.preventDefault()}
                                                        onPaste={(e) => e.preventDefault()}
                                                        spellCheck="false"
                                                    />
                                                )}
                                                {question.type === 'true_false_not_given' && (
                                                    <div>
                                                        {question.options.map((option, idx) => (
                                                            <label key={idx}>
                                                                <input
                                                                    type="radio"
                                                                    name={`question_${question.id}`}
                                                                    value={option}
                                                                    checked={answers[question.id] === option}
                                                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                                                />
                                                                {option}
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                                {question.type === 'checkbox' && (
                                                    <div>
                                                        {question.options.map((option, idx) => (
                                                            <label key={idx}>
                                                                <input
                                                                    type="checkbox"
                                                                    name={`question_${question.id}`}
                                                                    value={option}
                                                                    checked={answers[question.id]?.includes(option) || false}
                                                                    onChange={(e) => {
                                                                        const selectedOptions = answers[question.id] || [];
                                                                        if (e.target.checked) {
                                                                            handleAnswerChange(question.id, [...selectedOptions, option]);
                                                                        } else {
                                                                            handleAnswerChange(
                                                                                question.id,
                                                                                selectedOptions.filter((item) => item !== option)
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                                {option}
                                                            </label>
                                                        ))}
                                                    </div>
                                                )}
                                                {question.type === 'dropdown' && (
                                                    <select
                                                        name={`question_${question.id}`}
                                                        value={answers[question.id] || ''}
                                                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                                    >
                                                        <option value="" disabled>Select an option</option>
                                                        {question.options.map((option, idx) => (
                                                            <option key={idx} value={option}>
                                                                {option}
                                                            </option>
                                                        ))}
                                                    </select>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="swap-section-reading">
                        <div className="swap-part-reading">
                            <button onClick={() => swapPart(1)}>Part 1 </button>
                        </div>
                        <div className="swap-part-reading">
                            <button onClick={() => swapPart(2)}>Part 2 </button>
                        </div>
                        <div className="swap-part-reading">
                            <button onClick={() => swapPart(3)}>Part 3</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReadingTest;
