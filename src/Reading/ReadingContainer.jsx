import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './ReadingContainer.css'
import '@fortawesome/fontawesome-free/css/all.min.css';



import testData1 from '../data/readingQuestion_01.json';
import testData2 from '../data/readingQuestion_02.json';
import testData3 from '../data/readingQuestion_03.json';
import testData4 from '../data/readingQuestion_04.json';
import testData5 from '../data/readingQuestion_05.json';
import testData6 from '../data/readingQuestion_06.json';
import ReadingTest from './ReadingTest';

const jsonFiles = {
  test1: testData1,
  test2: testData2,
  test3: testData3,
  test4: testData4,
  test5: testData5,
  test6: testData6,
};


function ReadingContainer() {
  const [selectedTest, setSelectedTest] = useState(null);

  const handleButtonClick = (testId) => {
    setSelectedTest(testId);
  };

  return (
    <>
      {/* <button>Start Reading</button> */}

      {/* <Link to="/reading_test_01">Test 1</Link> */}



      <div className='con_center_reading'>

        {!selectedTest && (

          <div className='button-container-reading'>
            <h2 className="reading_heading">Enhance your reading abilities with IELTSGenAI – Achieve success in every passage! </h2>

            {/* Render buttons for each test */}
            <div className="btn-container-reading">
            {Object.keys(jsonFiles).map((testId) => (
              <button className="btn-read-dynamic" key={testId} onClick={() => handleButtonClick(testId)}>
                {/* <i className="fas fa-book-reader"></i> Icon */}
                <h2 className='icon'>📖</h2>
                Start {testId}<br></br>
                <span>Get set for IELTS with intensive Reading preparation!</span>
              </button>
            ))}
            </div>
            
          </div>
        )}

        {/* Conditionally render the ListeningExams component with the selected test */}
        {selectedTest && (
          <ReadingTest testId={selectedTest} testData={jsonFiles[selectedTest]} />
        )}
      </div>

    </>
  )
}

export default ReadingContainer;