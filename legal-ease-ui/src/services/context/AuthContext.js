import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage if available
  // useEffect(() => {
  //   // const storedUser = JSON.parse(localStorage.getItem('user'));
  //   // if (storedUser) {
  //     setUser(storedUser);
  //   // }
  // }, []);

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
