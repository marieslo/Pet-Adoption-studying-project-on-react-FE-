import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/AuthProvider';
import FetchPetsProvider from './context/FetchPetsContext';
import MyPetsProvider from './context/MyPetsProvider';

import AddPetForm from './admin/AddPetForm';
import EditPetForm from './admin/EditPetForm';
import PetsDashboard from './admin/PetsDashboard';
import UsersDashboard from './admin/UsersDashboard';

import Header from './components/Header/Header';
import NavigateBar from './components/NavigateBar/Navigatebar';

import WelcomePage from './pages/WelcomePage/WelcomePage';
import HomePage from './pages/HomePage/HomePage';
import SearchPage from './pages/SearchPage/SearchPage';
import MyProfilePage from './pages/MyProfilePage/MyProfilePage';
import MyPetsPage from './pages/MyPetsPage/MyPetsPage';
import SinglePetPage from './pages/SinglePetPage/SinglePetPage';

import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <FetchPetsProvider>
        <MyPetsProvider>
          <Router>
            <NavigateBar />
            <Header />
            <Routes>
              <Route path="/" element={<WelcomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/profile" element={<MyProfilePage />} />
              <Route path="/mypets" element={<MyPetsPage />} />
              <Route path="/pets/:id" element={<SinglePetPage />} />

              <Route path="/addpet" element={<AddPetForm />} />
              <Route path="/addpet/:id" element={<EditPetForm />} />

              <Route path="/petsdashboard" element={<PetsDashboard />} />
              <Route path="/usersdashboard" element={<UsersDashboard />} />
            </Routes>
          </Router>
        </MyPetsProvider>
      </FetchPetsProvider>
    </AuthProvider>
  );
}