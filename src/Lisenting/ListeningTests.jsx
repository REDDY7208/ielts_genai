import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadphones } from '@fortawesome/free-solid-svg-icons'
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
import ListeningExams from "./ListeningExams";
import './ListeningTests.css'; // Import the CSS file
 
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
  // Add more tests if available...
};
 
const ListeningTests = () => {
  const [selectedTest, setSelectedTest] = useState(null);
 
  const handleButtonClick = (testId) => {
    setSelectedTest(testId);
  };
 
  return (
    <div >
      {/* Display the title outside of the navbar format */}
   
 
      {/* Conditionally render the button container only when no test is selected */}
      {!selectedTest && (
       
        <div className="test-selection-container">
           <h1>Master Your Listening Skills with IELTSGenAI Tests</h1>
          {/* Render buttons for each test */}
          {Object.keys(jsonFiles).map((testId) => (
            <button className="btn-dynamic" key={testId} onClick={() => handleButtonClick(testId)}>
 
            <FontAwesomeIcon icon={faHeadphones} className="icon-fade-in" /><br></br>
            Start {testId}<br />
            <span>Get ready for your IELTS with focused listening exercises!</span>
          </button>
          ))}
        </div>
      )}
 
      {/* Conditionally render the ListeningExams component with the selected test */}
      {selectedTest && (
        <ListeningExams testId={selectedTest} />
      )}
    </div>
  );
};
 
export default ListeningTests;
