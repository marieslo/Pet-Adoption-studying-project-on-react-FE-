import { createContext, useContext, useState } from 'react';
import localforage from 'localforage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (userData) => {
    const { email, password, firstName, lastName } = userData;
    const newUser = { email, password, firstName, lastName };

    setUser(newUser);
    await localforage.setItem('user', newUser);
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