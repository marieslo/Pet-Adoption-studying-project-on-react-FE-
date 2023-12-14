import React from 'react';
import './style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './components/HomePage/HomePage';
import SearchPage from './components/SearchPage/SearchPage'
import { AuthProvider } from './context/AuthProvider';


export default function App() {
  return ( 
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<><Header /><HomePage /></>}/>
        <Route path="/search" element={<SearchPage/>}/>
      </Routes>
      </Router>
      </AuthProvider>
  );
}