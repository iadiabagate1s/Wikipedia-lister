import axios from 'axios';


export const login = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_SERVER_URL}user/login/`, {
        email,
        password,
        }, {
            withCredentials: true,
          });
    
        return response.data;
    } catch (error) {
        throw error;
    }
    };

export const register = async (email, password) => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_SERVER_URL}user/`, {
        email,
        password,
        }, {
            withCredentials: true,
          });
    
        return response.data;
    } catch (error) {
        throw error;
    }
    }