
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MockTestPopup.css';

const MockTestPopup = ({ onClose }) => {
  const navigate = useNavigate();
  const [planStatus, setPlanStatus] = useState(null); // Track the plan status

  const user_id = JSON.parse(localStorage.getItem('user_id')); // Get the user_id from local storage

  const checkPlanStatus = async () => {
    if (!user_id) {
      alert('User not logged in.');
      return;
    }

    try {
      const response = await fetch(`/api/check_plan_status?user_id=${user_id}`);
      const data = await response.json();

      if (data.status === 'active') {
        setPlanStatus('active');
      } else if (data.status === 'expired') {
        setPlanStatus('expired');
      } else {
        setPlanStatus('no_plan');
      }
    } catch (error) {
      console.error('Error checking plan status:', error);
      alert('Error checking plan status.');
    }
  };

  const handleModuleClick = (path) => {
    if (planStatus === 'active') {
      navigate(path);
      onClose(); // Close the popup after navigation
    } else {
      alert('You need to buy a plan to attend the test.');
    }
  };

  useEffect(() => {
    checkPlanStatus(); // Check plan status when the component mounts
  }, [user_id]);

  return (
    <div className="mock-test-popup-overlay" onClick={onClose}>
      <div className="mock-test-popup" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="module-square" onClick={() => handleModuleClick('/writing-id')}>
          Writing Test
        </div>
        <div className="module-square" onClick={() => handleModuleClick('/reading')}>
          Reading Test
        </div>
        <div className="module-square" onClick={() => handleModuleClick('/listening-tests')}>
          Listening Test
        </div>
        <div className="module-square" onClick={() => handleModuleClick('/speaking')}>
          Speaking Test
        </div>
      </div>
    </div>
  );
};

export default MockTestPopup;






