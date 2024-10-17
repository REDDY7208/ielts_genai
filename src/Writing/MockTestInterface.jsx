import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MockTestInterface.css'; // Import the CSS file

const MockTestInterface = () => {
  const [mockTests, setMockTests] = useState([]);
  const navigate = useNavigate(); // useNavigate hook for navigation

  // Fetch the JSON file
  useEffect(() => {
    fetch('/mockTests.json') // Ensure the file is in the 'public' folder
      .then((response) => response.json())
      .then((data) => setMockTests(data.tests))
      .catch((error) => console.error('Error fetching the mock tests:', error));
  }, []);

  const disableBackNavigation = () => {
    window.history.pushState(null, null, window.location.href);
    window.onpopstate = function () {
      window.history.go(1);
    };
  };

  // Handle button click for navigation
  const handleButtonClick = (testId) => {
    navigate(`/test/${testId}`);
    disableBackNavigation();
  };

  return (
    <div className="container">
      <h2 className="heading">Writing Practice Test</h2>

      {/* Continuous format for all buttons */}
      <div className="button-grid">
        {mockTests.map((test, index) => (
          <button
            key={test.test_id}
            className="button-write"
            onClick={() => handleButtonClick(test.test_id)}
          >
          <h4 className="buttonTitle" dangerouslySetInnerHTML={{ __html: `Writing<br>Practice Test ${index + 1}` }}></h4>

            <p className='btn-instruction'>{` ${test.type || 'General or Academic'}`}</p>
            <p className='btn-instruction'>{` ${test.task || 'Task 1 and Task 2'}`}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MockTestInterface;
