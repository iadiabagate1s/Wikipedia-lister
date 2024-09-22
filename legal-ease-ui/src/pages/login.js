import React, { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { AuthContext } from '../services/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {login} from '../services/api/auth';
import { Link } from 'react-router-dom';

function Login() {
const { setLoggedInUser, user } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password
        );
        setLoggedInUser(response.user);
        navigate('/home');
    }
    catch (error) {
      console.error(error);
    setError(error.response.data.message);
    }};

  return (
    <Container>
    <Row className="justify-content-md-center">
      <Col md="6">

        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
        <Link to="/register">Don't have an account? Register</Link>
      </Col>
    </Row>
  </Container>
  );
}

export default Login;
