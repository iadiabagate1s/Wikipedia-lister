import { search } from '../../src/controllers/searches/index.js'; 
import * as searchQueries from '../../src/db/queries/searchQueries.js'; 
import * as userQueries from '../../src/db/queries/userQueries.js'; 

import fetch from 'node-fetch';  // Import fetch

jest.mock('node-fetch');  // Tell Jest to mock fetch

describe('Search Function', () => {
  let req, res;

  beforeEach(() => {
    req = {
      params: { email: 'test@example.com' },
      query: { query: 'apple' }
    };
    
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();  // Clear mocks after each test
  });

  it('should return 404 if the user does not exist', async () => {
    // Mock user existence query to return false
    jest.spyOn(userQueries, 'userExistQuery').mockResolvedValue(false);

    await search(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({ message: 'User not found' });
  });

  it('should perform a search and save the record if the user exists', async () => {
    // Mock user existence query to return true
    jest.spyOn(userQueries, 'userExistQuery').mockResolvedValue(true);

    // Mock the search creation query
    jest.spyOn(searchQueries, 'createSearchQuery').mockResolvedValue({ id: 1, query: 'apple' });

    // Mock the fetch API to return a successful response
    fetch.mockResolvedValue({
      json: async () => ({ pages: [{ title: 'Apple' }] })
    });

    await search(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith(expect.objectContaining({
      searchResult: { pages: [{ title: 'Apple' }] },
      searchRecord: { id: 1, query: 'apple' }, // Include the id field
      message: 'Search saved successfully',
    }))
  });
});

