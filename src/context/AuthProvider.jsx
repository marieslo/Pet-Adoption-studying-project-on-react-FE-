import React, { createContext, useContext, useState } from 'react';
import localforage from 'localforage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    setUser(userData);
    await localforage.setItem('user', userData);
  };

  const logout = async () => {
    setUser(null);
    await localforage.removeItem('user');
  };

  const authContextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};