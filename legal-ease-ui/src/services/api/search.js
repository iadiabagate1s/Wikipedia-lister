
import axios from 'axios';

export async function search(query, email) {

    try{

        const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}search/${email}?query=${query}`, {
            withCredentials: true,  // Include credentials if needed
          });
        const { searchResult, searchRecord } = response.data;

        return {searchResult, searchRecord};
    }
    catch(err){
        console.log(err);
        return {searchResult: [], searchRecord: {}};
    }
}


export async function removeSearchHistoryItemAPI(id) {
    try{
        await axios.delete(`${process.env.REACT_APP_BASE_SERVER_URL}search/searchItemId/${id}`, {
            withCredentials: true,  // Include credentials if needed
          });
        return true
    }
    catch(err){
        console.log(err);
    }
}

export async function clearAllSearchHistoryAPI(email) {
    try{
        await axios.delete(`${process.env.REACT_APP_BASE_SERVER_URL}search/user/${email}`, {
            withCredentials: true,  // Include credentials if needed
          });
        return true
    }
    catch(err){
        console.log(err);
    }
}
