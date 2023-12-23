import { createContext, useContext, useState, useEffect } from 'react';
import localforage from 'localforage';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await localforage.getItem('user');
      if (storedUser) {
        setUser(storedUser);
      }
    };

    fetchUser();
  }, []);

  const login = async (userData) => {
    const { email, password, firstName, lastName, phoneNumber } = userData;
    const storedUser = await localforage.getItem('user');
    const newUser = { email, password, firstName, lastName, phoneNumber };

    const updatedUser = storedUser ? { ...storedUser, ...newUser } : newUser;

    setUser(updatedUser);
    await localforage.setItem('user', updatedUser);
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