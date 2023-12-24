import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNavbar from './components/MyNavbar/MyNavbar';
import WelcomePage from './pages/WelcomePage/WelcomePage';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import MyProfilePage from './pages/MyProfilePage/MyProfilePage';
import MyPetsPage from './pages/MyPetsPage/MyPetsPage';
import { AuthProvider } from './context/AuthProvider';
import { FetchPetsProvider } from './context/FetchPetsContext';
import Header from './components/Header/Header';
import SinglePetPage from './pages/SinglePetPage/SinglePetPage';
import PetsDashboard from './admin/PetsDashboard';
import UsersDashboard from './admin/UsersDashboard';
import AddPetForm from './admin/AddPetForm';
import './App.css'

export default function App() {
  return (
    <AuthProvider>
      <FetchPetsProvider>
        <Router>
          <MyNavbar />
            <Header />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<MyProfilePage />} />
              <Route path="/mypets" element={<MyPetsPage />} />
              <Route path="/pets/:id" element={<SinglePetPage />} />

              <Route path="/petsdashboard" element={<PetsDashboard />} />
              <Route path="/usersdashboard" element={<UsersDashboard />} />
              <Route path="addpet" element={<AddPetForm/>} />
            </Routes>
        </Router>
      </FetchPetsProvider>
    </AuthProvider>
  );
}