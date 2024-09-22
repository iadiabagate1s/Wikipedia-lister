
import axios from 'axios';


// function to search query
export async function search(query, email) {

    try{

        const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}search/${email}?query=${query}`, {
            withCredentials: true, 
          });
        const { searchResult, searchRecord } = response.data;

        return {searchResult, searchRecord};
    }
    catch(err){
        console.log(err);
        return {searchResult: [], searchRecord: {}};
    }
}


// Function to remove a search history item
export async function removeSearchHistoryItemAPI(id) {
    try{
        await axios.delete(`${process.env.REACT_APP_BASE_SERVER_URL}search/${id}`, {
            withCredentials: true, 
          });
        return true
    }
    catch(err){
        console.log(err);
    }
}

// Function to clear all search history
export async function clearAllSearchHistoryAPI(email) {
    try{
        await axios.delete(`${process.env.REACT_APP_BASE_SERVER_URL}search/user/${email}`, {
            withCredentials: true, 
          });
        return true
    }
    catch(err){
        console.log(err);
    }
}


export async function getAllSearches(){
    try{
        const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}search`, {
            withCredentials: true, 
          });
        return response.data;
    }
    catch(err){
        console.log(err);
    }
}