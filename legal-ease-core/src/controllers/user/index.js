import bcrypt, { hash } from 'bcrypt'; // Importing bcrypt for password hashing
import { getUserLoginQuery, getUserObjectQuery, deleteUserQuery, createUserQuery, getAllUsersQuery } from '../../db/queries/userQueries.js';


async function getUserLogin(req, res) {
    try{
    const { email, password } = req.body;

    
        const user = await getUserLoginQuery(email, password);
        

        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({ message: 'Incorrect password' });
        }

        // remove password from response
        // Convert user instance to plain object and remove password
        delete user.dataValues.password;
        

        res.status(200).send({ user});
    }

    catch (err) {
        console.error('Error logging in:', err);
        res.status(500).send({ message: 'Error logging in' });
}
}

async function getUserObject(req, res) {
    // get user object join  search history use email coming from query params
    try {
    const { id } = req.params;
    
        const user = await getUserObjectQuery(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
        
    } catch (err) {
        console.error('Error getting user object:', err);
        res.status(500).send({ message: 'Error getting user object' });
    }
}

async function createUser(req, res) {
    try{
    const { email, password } = req.body;

    const hashPassword = bcrypt.hashSync(password, 10);

    const user = await createUserQuery(email, hashPassword);

    const userObject = await getUserObjectQuery(email);

    // remove password from response
    // Convert user instance to plain object and remove password
    const userResponse = userObject.toJSON();
    delete userResponse.password;
    
    res.status(201).send(userResponse);
    }
    catch (err) {
        console.error('Error creating user:', err);
        res.status(500).send({ message: 'Error creating user' });
    }


}

async function deleteUser(req, res) {
    // delete user by id
    try {
        const { id } = req.params;
        await deleteUserQuery(id);
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).send({ message: 'Error deleting user' });
    }
}

async function getAllUsers(req, res) {
    // get all users dont include password or search history
    try {
        const users = await getAllUsersQuery();
       
        res.status(200).send(users);
    } catch (err) {
        console.error('Error getting all users:', err);
        res.status(500).send({ message: 'Error getting all users' });
    }
}

export { getUserLogin, getUserObject, createUser, deleteUser, getAllUsers }; // Exporting all functions