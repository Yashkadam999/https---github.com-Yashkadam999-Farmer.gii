import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from './firebase'; // Make sure you import your firebase auth instance
import { onAuthStateChanged, signOut } from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Listen for firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const login = (loggedInUser) => {
    setUser(loggedInUser);
    // Redirect to dashboard after login
    navigate('/dashboard', { replace: true });
  };

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate('/login', { replace: true });
    });
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
