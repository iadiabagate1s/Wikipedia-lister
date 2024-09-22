import fetch from 'node-fetch';
import { userExistQuery } from '../../db/queries/userQueries.js';
import { createSearchQuery, getAllSearchesQuery, softDeleteSearchQuery ,getSearchesByUserQuery, softDeleteUserSearches } from '../../db/queries/searchQueries.js';
import { normalizeQuery, groupQueriesByFrequency } from '../../utils.js';
import { searchWikipedia } from '../../external-api-calls/wiki.js';



export const search = async (req, res) => {
    try{

    const { email } = req.params;
    const { query } = req.query;

    const doesExist = await userExistQuery(email);  
    if (!doesExist) {
        return res.status(404).send({ message: 'User not found' });
    }

    let response = await searchWikipedia(query);
   
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

    const frequency = groupQueriesByFrequency(searches);

    res.status(200).send({
        searches, 
        frequency,
        message: 'All searches retrieved successfully',
    });
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
