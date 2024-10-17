



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './playground.css'; // Import the CSS file for styling and animations

// Theme data
const themes = [
  { "theme_id": 1, "theme_name": "The environment" },
  { "theme_id": 2, "theme_name": "Sports topics" },
  { "theme_id": 3, "theme_name": "Globalisation" },
  { "theme_id": 4, "theme_name": "Law and order" },
  { "theme_id": 5, "theme_name": "Technology" },
  { "theme_id": 6, "theme_name": "Politics" },
  { "theme_id": 7, "theme_name": "Language and culture" },
  { "theme_id": 8, "theme_name": "Health" },
  { "theme_id": 9, "theme_name": "Education" },
  { "theme_id": 10, "theme_name": "Crime" },
  { "theme_id": 11, "theme_name": "Employment and equal pay" },
  { "theme_id": 12, "theme_name": "Fossil fuels" },
  { "theme_id": 13, "theme_name": "Employment (general)" },
  { "theme_id": 14, "theme_name": "Employment and highly skilled jobs" },
  { "theme_id": 15, "theme_name": "Sports" },
  { "theme_id": 16, "theme_name": "Climate" }
];

const words = { 
  "1": ["biodiversity", "conservation", "sustainable development", "ecosystem services", "anthropogenic effects", "pollution control", "environmental sustainability", "climate resilience"],
  "2": ["athletics", "competition", "sportsmanship", "endorphins", "fitness regimen", "medals", "team dynamics", "spectator engagement"],
  "3": ["interconnectedness", "cultural homogenization", "global marketplace", "economic disparity", "outsourcing", "cultural imperialism", "trade liberalization", "transnational corporations"],
  "4": ["jurisprudence", "civil liberties", "judicial system", "restorative justice", "preventive measures", "court proceedings", "legal accountability", "due process of law"],
  "5": ["technological advancement", "digital literacy", "innovative solutions", "high-tech", "disruptive technology", "big data", "cloud computing", "internet of things"],
  "6": ["political discourse", "governance", "public policy", "electoral process", "political ideology", "advocacy", "partisanship", "civic responsibility"],
  "7": ["cultural relativism", "linguistic diversity", "ethnocentrism", "heritage", "cultural preservation", "dialect", "sociolect", "cultural assimilation"],
  "8": ["well-being", "nutrition", "healthcare access", "chronic illness", "preventative medicine", "holistic health", "mental wellness", "health disparities"],
  "9": ["pedagogy", "academic rigor", "educational attainment", "learning outcomes", "interdisciplinary studies", "curriculum development", "critical pedagogy", "scholarly pursuits"],
  "10": ["deviance", "recidivism", "criminal justice system", "lawful", "retributive justice", "victimology", "preventive justice", "law-abiding"],
  "11": ["gender pay gap", "job market fluctuations", "employee retention", "workforce diversity", "labor rights", "occupational health", "meritocracy", "economic mobility"],
  "12": ["greenhouse gases", "renewable energy sources", "sustainable energy", "environmental degradation", "carbon neutrality", "climate action", "energy conservation", "resource depletion"],
  "13": ["professional development", "job market analysis", "career pathways", "vocational education", "skills assessment", "career advancement", "employment trends", "workforce skills"],
  "14": ["expertise", "credentialing", "labor force", "market demand", "job specialization", "skill development", "professional qualifications", "training programs"],
  "15": ["athletic performance", "professional athlete", "sporting event", "fan culture", "sports analytics", "athlete training", "sports sponsorship", "fitness culture"],
  "16": ["climate justice", "environmental activism", "sustainable practices", "carbon offsetting", "biodiversity conservation", "climate adaptation", "environmental ethics", "sustainable ecosystems"]
};

function Playground1() {
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedWord, setSelectedWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [type, setType] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [userId, setUserId] = useState(null);

  // Get the user ID from local storage when the component mounts
  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    setUserId(storedUserId);
  }, []);

  const handleThemeClick = (themeId) => {
    setSelectedTheme(themeId);
    setSelectedWord('');
    setDefinition('');
    setType('');
    setFeedback(null);
  };

  const handleWordClick = async (word) => {
    setSelectedWord(word);
    setDefinition(''); // Clear previous data
    setType('');
    setFeedback(null);

    try {
      const wordInfoResponse = await axios.post('/api/word_info', { word, user_id: userId });
      setDefinition(wordInfoResponse.data.info);
    } catch (error) {
      console.error("Error fetching word info:", error);
      setDefinition('Error fetching word information.');
    }
  };

  const handleSubmit = async () => {
    if (!selectedWord || !definition || !type) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      // Post data to evaluate endpoint
      const response = await axios.post('/api/evaluate', {
        sentence: definition,
        word: selectedWord,
        type: type,
        user_id: userId
      });

      setFeedback(response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data");
    }
  };

  return (
    <div className="playground-container">
      <h1 className="title">Theme and Word Selector</h1>

      <div className="content">
        {/* Themes */}
        <div className="themes-section">
          <h3>Select OneThemes</h3>
          {themes.map((theme) => (
            <button
              key={theme.theme_id}
              className={`theme-button ${selectedTheme === theme.theme_id ? 'active' : ''}`}
              onClick={() => handleThemeClick(theme.theme_id)}
            >
              {theme.theme_name}
            </button>
          ))}
        </div>

        {/* Words */}
        <div className="words-section">
          <h3  >Select One Words</h3>
          {selectedTheme && words[selectedTheme].map((word) => (
            <button
              key={word}
              className={`word-button ${selectedWord === word ? 'active' : ''}`}
              onClick={() => handleWordClick(word)}
            >
              {word}
            </button>
          ))}
        </div>

        {/* Definition and Type */}
        <div className="input-section">
          {selectedWord && (
            <>
              <h3>Selected Word: {selectedWord}</h3>
              <p>{definition || "Loading definition..."}</p>
              <label>
                Type:
                <input
                  type="text"
                  className="input-field"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </label>
              <br />
              <button className="submit-button" onClick={handleSubmit}>Submit</button>
              {feedback && (
                <div className="feedback-section">
                  <h3>Feedback</h3>
                  <p><strong>Grammar Feedback:</strong> {feedback.grammar_feedback.join(', ')}</p>
                  <p><strong>Word Usage Feedback:</strong> {feedback.word_usage_feedback}</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Playground1;
