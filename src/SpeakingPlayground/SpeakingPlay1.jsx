
import React, { useState } from 'react';
import './SpeakingPlay1.css';

const SpeakingPlay1 = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [generatedQuestion, setGeneratedQuestion] = useState(null);
  const [recording, setRecording] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [languageError, setLanguageError] = useState('');
  
  const userId = localStorage.getItem('user_id'); // Fetch user ID from local storage

  // List of available themes
  const themes = [
    'Work', 'Study', 'Hometown', 'Home', 'Art', 'Bicycles', 'Birthdays', 'Childhood',
    'Clothes', 'Computers'
  ];

  // Function to handle theme selection
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    setGeneratedQuestion(null);  // Clear previous question
    setEvaluation(null);  // Clear previous evaluation
    setTranscription('');  // Clear previous transcription
    setLanguageError(''); // Clear language error
  };

  // Function to generate question based on selected theme
  const generateQuestion = async () => {
    if (!selectedTheme) {
      setLanguageError('Please select a theme first!');
      return;
    }
    try {
      const response = await fetch(`http://141.136.42.65:8081/generate_question?theme_name=${selectedTheme}&user_id=${userId}`);
      const data = await response.json();
      if (data.error) {
        setLanguageError(data.error);
      } else {
        const qaText = data.question_and_answer;
        // Parse the qaText to extract Question and Suggested Answer
        const questionMatch = qaText.match(/Question:\s*(.+)\n/i);
        const answerMatch = qaText.match(/Suggested Answer:\s*([\s\S]+)/i);
        const question = questionMatch ? questionMatch[1].trim() : '';
        const suggestedAnswer = answerMatch ? answerMatch[1].trim() : '';
        setGeneratedQuestion({ question, suggestedAnswer });
      }
    } catch (error) {
      console.error('Error generating question:', error);
      setLanguageError('Error generating question.');
    }
  };

  // Function to start recording the user's answer
  const startRecording = async () => {
    setRecording(true);
    setLanguageError(''); // Clear any previous language error

    try {
      const response = await fetch('http://141.136.42.65:8081/capture_speech', { method: 'POST' });
      const data = await response.json();

      if (data.error) {
        setLanguageError(data.error);
      } else {
        setTranscription(data.transcription);
        evaluateAnswer(data.transcription);
      }
    } catch (error) {
      console.error('Error during speech capture:', error);
      setLanguageError('Error capturing speech.');
    } finally {
      setRecording(false);
    }
  };

  // Function to evaluate the user's answer using GPT and grammar checking
  const evaluateAnswer = async (sentence) => {
    try {
      const response = await fetch('http://141.136.42.65:8081/evaluate_answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ sentence, theme_name: selectedTheme, user_id: userId })
      });
      const data = await response.json();
      if (data.error) {
        setLanguageError(data.error);
      } else {
        setEvaluation(data);
      }
    } catch (error) {
      console.error('Error evaluating answer:', error);
      setLanguageError('Error evaluating answer.');
    }
  };

  return (
    <div className="speak-test-container">
      <div className="themes-list">
        <h3>Select a Theme:</h3>
        <p>Select a theme from the list below to generate a question:</p>
        {themes.map((theme, index) => (
          <button key={index} className={`theme-button ${selectedTheme === theme ? 'selected' : ''}`} onClick={() => handleThemeSelect(theme)}>
            {theme}
          </button>
        ))}
      </div>

      <div className="test-area">
        <h2>Speak Test</h2>
        <div className="question-area">
          <button onClick={generateQuestion} className="generate-button">Generate Question</button>
          {generatedQuestion && (
            <div className="question-display">
              <p><strong>Question:</strong> <b>{generatedQuestion.question}</b></p>
              <p><strong>Suggested Answer:</strong> <i>{generatedQuestion.suggestedAnswer}</i></p>
            </div>
          )}
        </div>
        <div className="record-area">
          <button onClick={startRecording} className={`record-button ${recording ? 'recording' : ''}`} disabled={recording}>
            {recording ? 'Recording in progress...' : 'Start Recording'}
          </button>
          {transcription && (
            <div className="transcription-display">
              <p><strong>Your Answer:</strong> {transcription}</p>
            </div>
          )}
          {languageError && (
            <div className="error-message">
              <p>{languageError}</p>
            </div>
          )}
        </div>
        {evaluation && (
          <div className="evaluation-result">
            <h4>Evaluation:</h4>
            <p><strong>AI Evaluation:</strong> <span dangerouslySetInnerHTML={{ __html: evaluation.AI_Evaluation }} /></p>
            {evaluation.suggestions && (
              <div>
                
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakingPlay1;
