import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Function to log in the user
  const setLoggedInUser = (userData) => {
    setUser(userData);
  };

  // Function to log out the user
  const removeLoggedInUser = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setLoggedInUser, removeLoggedInUser  }}>
      {children}
    </AuthContext.Provider>
  );
};
