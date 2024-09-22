import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
} from "react-router-dom";
import { AuthProvider } from './services/context/AuthContext';  
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';


function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        {/* Default route redirects to the login page */}
        <Route path="/" element={<Login />} />
        
        {/* Route for login */}
        <Route path="/login" element={<Login />} />

        {/* Route for home page */}
        <Route path="/home" element={<Home />} />

        {/* Route for register page */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
