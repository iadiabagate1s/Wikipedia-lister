import React, { useState, useEffect } from 'react';
import { Table, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { getAllUsers, getUserObject } from '../services/api/user';
import { getAllSearches } from '../services/api/search';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searches, setSearches] = useState([]);
  const [searchFrequency, setSearchFrequency] = useState([]);
  const [error, setError] = useState(null);

  // Fetch all users and searches on page load
  useEffect(() => {
    fetchUsers();
    fetchSearches();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setError('Error fetching users');
    }
  };

  const fetchSearches = async () => {
    try {
      const searchesData = await getAllSearches();
      setSearches(searchesData.searches);
      setSearchFrequency(searchesData.frequency); // Set frequency data
    } catch (err) {
      setError('Error fetching searches');
    }
  };

  const handleUserClick = async (email) => {
    try {
      const userData = await getUserObject(email);
      setSelectedUser(userData);
    } catch (err) {
      setError('Error fetching user details');
    }
  };

  return (
    <Container className="admin-container mt-4">
      <Row>
        <Col md={6}>
          <h2>All Users</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Table bordered hover responsive className="user-table">
            <thead>
              <tr>
                <th>Email</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{new Date(user.created_at).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleUserClick(user.email)}
                    >
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col md={6}>
          <h2>User Details</h2>
          {selectedUser ? (
            <div className="user-details">
              <h5>{selectedUser.email}</h5>
              <p>Created At: {new Date(selectedUser.created_at).toLocaleString()}</p>
              {selectedUser.searches && selectedUser.searches.length > 0 ? (
                <>
                  <h6>Search History:</h6>
                  <ul>
                    {selectedUser.searches.map((search) => (
                      <li key={search.id}>
                        {search.query} - {new Date(search.created_at).toLocaleString()}
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p>No search history available</p>
              )}
            </div>
          ) : (
            <p>Select a user to see details</p>
          )}
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={6}>
          <h2>All Searches</h2>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Query</th>
                <th>User Email</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {searches.map((search) => (
                <tr key={search.id}>
                  <td>{search.query || 'No query'}</td>
                  <td>{search.user.email}</td>
                  <td>{new Date(search.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>

        <Col md={6}>
          <h2>Search Frequency</h2>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th>Query</th>
                <th>Count</th>
              </tr>
            </thead>
            <tbody>
              {searchFrequency.map((freq) => (
                <tr key={freq.query}>
                  <td>{freq.query || 'No query'}</td>
                  <td>{freq.count}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
