import axios from 'axios';


// get all users dont include password or search history

export async function getAllUsers() {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}user`);
        return response.data;
    } catch (err) {
        console.error('Error getting all users:', err);
        return { message: 'Error getting all users' };
    }
}

export async function getUserObject(id) {
    try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_SERVER_URL}user/${id}`);
        return response.data;
    } catch (err) {
        console.error('Error getting user object:', err);
        return { message: 'Error getting user object' };
    }
}