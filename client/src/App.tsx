import React from 'react';

import { Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Header from './components/Header/Header';
import UserPage from './pages/UserPage/UserPage';

const App: React.FC = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/me" element={<UserPage />} />
    </Routes>
  </Router>
);

export default App;
