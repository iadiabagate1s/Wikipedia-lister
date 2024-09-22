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
import Admin from './pages/admin';
import { Navbar, Nav, Container } from 'react-bootstrap'; 



function App() {
  return (
    <AuthProvider>
    <Router>
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top">  {/* Styled Navbar */}
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/home">Home</Nav.Link>  {/* Home page link */}
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>  {/* Admin page link */}
         
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
