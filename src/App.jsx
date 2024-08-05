import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import CreateAccountPage from './components/CreateAccountPage';
import LoginSignUp from './components/LoginSignUp/LoginSignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginSignUp />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
