
import fetch from 'node-fetch';
const BASE_URL = 'https://en.wikipedia.org/w/rest.php/v1/search/page';
// `https://en.wikipedia.org/w/rest.php/v1/search/page?q=${query}&limit=25`;

export const searchWikipedia = async (query, limit=25) => {
    try{
    const url = `${BASE_URL}?q=${query}&limit=${limit}`;
    const response = await fetch(url);
    return response 
    } catch (err) {
        console.error('Error searching:', err);
        
    }

}
