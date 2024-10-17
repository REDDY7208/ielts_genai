import React from 'react';
import './LearningResources.css';

const LearningResources = () => {
  const handleStartWriting = () => {
    window.open('/assets/IELTSGenAI-Writing.pdf', '_blank');
  };
  const handleStartReading = () => {
    window.open('/assets/IELTSGenAI-Reading.pdf', '_blank');
  };
  const handleStartListening = () => {
    window.open('/assets/IELTSGenAI-Listening.pdf', '_blank');
  };
  const handleStartSpeaking = () => {
    window.open('/assets/IELTSGenAI-SPEAKING.pdf', '_blank');
  };

  return (
    <div className="learning-resources" >
      <h1>Learning Resources</h1>
      <div className="resource-sections">
      <div className="resource-section" style={{ backgroundColor: '#F7CE56' , color: 'black' }}>
          <h2 className='icon'>✏️</h2> <br></br>
          <h2>Writing </h2>
          <p>Introduction</p>
          <p>Task 1 & 2</p>
          <p>Structure Tips</p>
          <p>Cohesion Tips</p>
          <p>Writing Error</p>
          <p>Timing Tips</p>
          <p>Vocabulary Use</p>
          <button className="learn-more" onClick={handleStartWriting}>Learn More</button>
        </div>
        <div className="resource-section" style={{ backgroundColor: '#7253A4', color: 'white' }}>
           <h2 className='icon'>📖</h2><br></br>
          <h2>Reading </h2>
          <p className='Reading-content'>Introduction</p>
          <p className='Reading-content'>Format Overview</p>
          <p className='Reading-content' >Time Tips</p>
          <p className='Reading-content'>Question Types</p>
          <p className='Reading-content'>Skimming/Scanning</p>
          <p className='Reading-content'>True/False Tips</p>
          <p className='Reading-content'>Headlings Match</p>
          <button className="learn-more" onClick={handleStartReading}>Learn More</button>
        </div>

     

        <div className="resource-section" style={{ backgroundColor: '#FE753F', color: 'black' }}>
        <h2 className='icon'> 🎧</h2> <br></br>
          <h2>Listening </h2>
          <p>Introduction</p>
          <p>Format Guide</p>
          <p>Task Types</p>
          <p>Multiple Choice Tips</p>
          <p>Focus Tips</p>
          <p>Answer Prediction</p>
          <p>Conclusion</p>
          <button className="learn-more" onClick={handleStartListening}>Learn More</button>
        </div>

        <div className="resource-section" style={{ backgroundColor: '#5383EC', color: '#fff' }}>
          <h2 className='icon'>🎤</h2> <br></br>
          <h2>Speaking </h2>
          <p className='Reading-content'>Introduction</p>
          <p className='Reading-content'>Test Overview</p>
          <p className='Reading-content'>Topic Tips</p>
          <p className='Reading-content'>Fluency Tips</p>
          <p className='Reading-content'>Common Questions</p>
          <p className='Reading-content'>Pronounciation Tips</p>
          <p className='Reading-content'>Conclusion</p>
          <button className="learn-more" onClick={handleStartSpeaking}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default LearningResources;
