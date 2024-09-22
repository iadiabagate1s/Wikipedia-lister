import fetch from 'node-fetch';
import { userExistQuery } from '../../db/queries/userQueries.js';
import { createSearchQuery, getAllSearchesQuery, softDeleteSearchQuery ,getSearchesByUserQuery, softDeleteUserSearches } from '../../db/queries/searchQueries.js';



export const search = async (req, res) => {
    try{
    // /:email?query=apple
    const { email } = req.params;
    const { query } = req.query;
    // check if user exists
    const doesExist = await userExistQuery(email);  
    if (!doesExist) {
        return res.status(404).send({ message: 'User not found' });
    }

    // search for query
    // https://en.wikipedia.org/w/rest.php/v1/search/page?q=apple&limit=25

    const url = `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${query}&limit=25`;
    const response = await fetch(url);
    const data = await response.json();

    const searchRecord = await createSearchQuery(email, query);

       // Return the search results
       res.status(200).send({
        searchResult: data,
        searchRecord,
        message: 'Search saved successfully'
      });

} catch (err) {
    console.error('Error searching:', err);
    res.status(500).send({ message: 'Error searching' });
}
}

export const getAllSearches = async (req, res) => {
    // get all searched join in user email(user_id) group by email
try{    

    const searches = await getAllSearchesQuery();

    res.status(200).send(searches);
}
catch (err) {
    console.error('Error getting all searches:', err);
    res.status(500).send({ message: 'Error getting all searches' });
}

}

export const getSearchesByUser = async (req, res) => {

    // get all searches for a user
    try {
    const { userId } = req.params;

    const searches = await getSearchesByUserQuery(userId);

    res.status(200).send(searches);
}
catch (err) {
    console.error('Error getting searches by user:', err);
    res.status(500).send({ message: 'Error getting searches by user' });
}
}

export const deleteUserSearchItem = async (req, res) => {
    // soft delete
    // delete a search for a user
    try {
    const { searchItemId } = req.params;
    // set deleted_at
    await softDeleteSearchQuery(searchItemId);
    res.status(200).send({ message: 'Search deleted successfully' });

}
catch (err) {
    console.error('Error deleting a search:', err);
    res.status(500).send({ message: 'Error deleting a search' });
}
}

export const clearAllSearchesForUser = async (req, res) => {
    // soft delete all searches for a user
    try {
    const { userId } = req.params;
    // set deleted_at
    await softDeleteUserSearches(userId);

    res.status(200).send({ message: 'Searches deleted successfully' });

}
catch (err) {
    console.error('Error clearing all searches for user:', err);
    res.status(500).send({ message: 'Error clearing all searches for user' });
}

}
