import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginSignUp from './components/LoginSignUp/LoginSignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<LoginSignUp isLogin={true} />} />
        <Route path="/create-account" element={<LoginSignUp isLogin={false} />} />
      </Routes>
    </Router>
  );
}

export default App;
