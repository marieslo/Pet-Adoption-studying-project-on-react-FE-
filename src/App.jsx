import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/MyNavBar/MyNavBar';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import MyProfilePage from './pages/MyProfilePage/MyProfilePage';
import { AuthProvider } from './context/AuthProvider';
import { FetchPetsProvider } from './context/FetchPetsContext';

export default function App() {
  return ( 
    <AuthProvider>
      <FetchPetsProvider> 
        <Router>
          <MyNavbar />
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/profile" element={<MyProfilePage />} />
          </Routes>
        </Router>
      </FetchPetsProvider>
    </AuthProvider>
  );
}