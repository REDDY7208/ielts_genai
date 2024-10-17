


//router protector code down 

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashPage from './SplashPage';
import Home from './Home';
import './index.css';
import Login from './Login';

import Dashboard from './Dashboard';

import Dasbot from './DashboardBOT/DasBot';
import SpeakTest from './Speaking/SpeakTest';
import Chathelp from './ChatHelp/ChatHelp';


import SpeakPlayground from './SpeakingPlayground/SpeakingPlay1';
import LearningResources from './LearningResources';


import ProtectedRoute from './ProtectedRoute';  // Import ProtectedRoute
import Auth from './Face/Auth';
import TestDetails from './Writing/TestDetails';
import MockTestInterface from './Writing/MockTestInterface';
import FaceVerification from './Face/FaceVerification';
import ListeningExams from './Lisenting/ListeningExams';
import ListeningTests from './Lisenting/ListeningTests';
import ReadingContainer from './Reading/ReadingContainer';
import Playground1 from './writingPlayground/playground';
import MockTestPopup from './MockTestPopup/MockTestPopup';






const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashPage />} />
        <Route path="/Login" element={<Login />} />
        {/* <Route path='/Auth' element={<Auth />} /> */}
        <Route path='/test/:testId' element={<TestDetails />} />
        <Route path='/writing-id' element={<MockTestInterface />} />
        <Route path='/VerifyFace' element={<FaceVerification />} />
        <Route path='/listening-tests/: testId' element={<ListeningExams />} />
        <Route path='/listening-tests' element={<ListeningTests />} />







        {/* Protected routes */}
        <Route
          path="/home"
          element={

            <Home />

          }
        />
                <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/writing"
          element={
            <ProtectedRoute>
              <WritingTest />
            </ProtectedRoute>
          }
        /> */}
        <Route
          path="/speaking"
          element={
            <ProtectedRoute>
              <SpeakTest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dasbot"
          element={
            <ProtectedRoute>
              <Dasbot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Chatbox"
          element={
            <ProtectedRoute>
              <Chathelp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reading"
          element={
            <ProtectedRoute>
              <ReadingContainer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Auth"
          element={
            <ProtectedRoute>
              <Auth/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/playground1"
          element={
            <ProtectedRoute>
              <Playground1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/playground2"
          element={
            <ProtectedRoute>
              <SpeakPlayground />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learningResources"
          element={
            <ProtectedRoute>
              <LearningResources />
            </ProtectedRoute>
          }
        />





        {/* Public Routes */}
        <Route path="/collection" element={<h1>Collections Page</h1>} />

        <Route path="/screens/login" element={<h1>Login Page</h1>} />
      </Routes>
    </Router>
  );
};

export default App;

