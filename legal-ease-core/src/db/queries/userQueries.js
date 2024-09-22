import { User, Search } from '../../db/schema/index.js'; 

export async function getUserLoginQuery(email, password) {
    try {
        const user = await User.findOne(
            { where: { email: email } ,
            attributes: ['email','password','created_at'],
            include: {
                model: Search,
                as: 'searches',
                attributes: ['id', 'query', 'created_at'],
                where: {
                    deleted_at: null
                },
                required: false
            },
            },
            
        );
        
        return user;
    } catch (err) {
        console.error('Error in query logging in:', err);
        throw err;
    }

}

export async function getUserObjectQuery(email) {
    try {
        const user = await User.findOne(
            { where: { email: email } ,
            attributes: ['email','created_at'],
            include: {
                model: Search,
                as: 'searches',
                attributes: ['id', 'query', 'created_at'],
                where: {
                    deleted_at: null
                },
                required: false
            
            },
            },
            
        );
        return user;
    }
    catch (err) {
        console.error('Error in query getting user object:', err);
        throw err;
    }
}

export async function createUserQuery(email, password) {
    try {
        const user = await User.create({
            email,
            password: password,
        });
        return user;
    } catch (err) {
        console.error('Error in query creating user:', err);
        throw err;
    }
}

export async function deleteUserQuery(email) {
    try {
        // we just want to delete the user by email
        await User.destroy({
            where: {
                email: email,
            },
        });

        return true;
            

    } catch (err) {
        console.error('Error in query deleting user:', err);
        throw err;
    }
}

export async function getAllUsersQuery() {

    try {
        const users = await User.findAll({
            attributes: ['email', 'created_at'],
        });
        return users;
    }
    catch (err) {
        console.error('Error in query getting all users:', err);
        throw err;
    }
}

export async function userExistQuery(email) {
    try {
        const userCount = await User.count({
            where: {
                email: email,
            },
        });

        return userCount > 0;

    } catch (err) {
        console.error('Error in query checking if user exists:', err);
        throw err;
    }
}