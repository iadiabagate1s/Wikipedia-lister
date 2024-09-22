import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../services/context/AuthContext'; 
import { Container, Row, Col, Form, Button, ListGroup, InputGroup, Collapse, Alert } from 'react-bootstrap';
import { search, removeSearchHistoryItemAPI, clearAllSearchHistoryAPI } from '../services/api/search';
import { useNavigate } from 'react-router-dom';
import './home.css'; 

function Home() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState(user?.searches || []);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);


  if (!user) {
    return null;  // This ensures that nothing is rendered if the user is null
  }

  const handleSearch = async () => {
    try {
      const { searchResult, searchRecord } = await search(query, user?.email);
      setSearchResults(searchResult.pages);
      setSearchHistory(prevHistory => [searchRecord, ...prevHistory]);  // Add new record to search history
      setError(null);  // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch search results. Please try again.');
    }
  };

  const handleInputClear = () => {
    setQuery('');
    setSearchResults([]);
  };

  const removeSearchHistoryItem = async (id) => {
    let res = await removeSearchHistoryItemAPI(id);
    res ? setSearchHistory(searchHistory.filter(record => record.id !== id)): setError('Failed to remove search history item');
  };

  const clearAllSearchHistoy = async  () => {
    
    let res = await clearAllSearchHistoryAPI(user?.email);

    res ? setSearchHistory([]): setError('Failed to clear search history');
  };

const searchAgain = async (record)=>{
  setQuery(record);
}

  return (
    <Container className="home-container">
      <Row className="justify-content-center mt-3">
        <Col md={8}>
          <div className="sticky-search-bar">
            <h3 className="mb-4">Welcome, {user.email}</h3>
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Enter search query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button variant="primary" onClick={handleSearch} disabled={!query}>
                Search
              </Button>
              <Button variant="outline-secondary" onClick={handleInputClear}>
                X
              </Button>
            </InputGroup>
            {error && <Alert variant="danger">{error}</Alert>}
          </div>

          <div className="search-results-section">
            <h4>Search Results:</h4>
            <ListGroup className="search-results-list">
              {searchResults.map((result, index) => (
                <ListGroup.Item key={result.id || index} className="search-result-item">
                  <a href={`https://example.com/pages/${result.id}`} target="_blank" rel="noopener noreferrer" className="result-link">
                    <h5>{result.title}</h5>
                  </a>
                  <p>{result.description}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>

        <Col md={4} className="sticky-sidebar">
          <div className="search-history-section">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Search History</h4>
              <Button variant="outline-danger" size="sm" onClick={clearAllSearchHistoy}>Clear All</Button>
            </div>
            <ListGroup className="search-history-list">
              {searchHistory.map((record, index) => (
                <ListGroup.Item key={record.id || index}  className="d-flex justify-content-between align-items-center">
                  <div>
                    <p>Query: {record.query} (Searched at: {new Date(record.created_at).toLocaleString()})</p>
                    <Button variant="link" size="sm" onClick={() => searchAgain(record.query)}>Search Again</Button>
                  </div>
                  <Button variant="outline-danger" size="sm" onClick={() => removeSearchHistoryItem(record.id)}>
                    X
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
