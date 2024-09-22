import React, { useState, useContext, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { register } from '../services/api/auth'; // Assuming you have a register function in auth service
import { AuthContext } from '../services/context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Register() {
  const { setLoggedInUser, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);


  // Checking if passwords match
  const passwordsMatch = password === confirmPassword && password !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Assuming register function in services/auth.js handles the API call
      const response = await register(email, password);
      setSuccess(true);
      setError(null);  // Clear any previous errors

      setLoggedInUser(response);
      navigate('/home');
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || 'Registration failed');
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Register</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">Registration successful! You can now log in.</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formConfirmPassword" className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {/* Indicator for password match */}
              <Form.Text className={passwordsMatch ? 'text-success' : 'text-danger'}>
                {passwordsMatch ? 'Passwords match!' : 'Passwords do not match'}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={!passwordsMatch}>
              Sign Up
            </Button>
          </Form>

          <div className="text-center mt-3">
            <p>
              Already have an account? <Link to="/login">Go to login</Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Register;
