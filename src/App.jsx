import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/MyNavBar/MyNavBar';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import { AuthProvider } from './context/AuthProvider';

export default function App() {
  return ( 
    <AuthProvider>
      <Router>
        <MyNavbar />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
      </Router>
    </AuthProvider>
  );
}