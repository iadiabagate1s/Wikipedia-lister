import { User, Search } from '../../db/schema/index.js';


export async function createSearchQuery(userId, query) {
    try {
        const search = await Search.create({
            user_id: userId,
            query: query,
        });
        return search;
    } catch (err) {
        console.error('Error in query creating search:', err);
        throw err;
    }
}

export async function getAllSearchesQuery() {

    try{
        let searches = await Search.findAll({
            attributes: ['id', 'query', 'created_at', 'deleted_at'],
            include: {
                model: User,
                as: 'user',
                attributes: ['email'],
            },
        });
        return searches;
    }
    catch (err) {
        console.error('Error in query getting all searches:', err);
        throw err;
    }
}


export async function getSearchesByUserQuery(userId) {
    try {
        const searches = await Search.findAll({
            where: { user_id: userId, deleted_at: null },
        });
        return searches;
    } catch (err) {
        console.error('Error in query getting searches by user:', err);
        throw err;
    }
}


export async function softDeleteSearchQuery(searchId) {
    try {
        const result = await Search.update(
            { deleted_at: new Date() }, // Set deleted_at to the current timestamp
            {
                where: {
                    id: searchId,
                    deleted_at: null, // Only update records that are not already deleted
                },
            }
        );
        return result;
    } catch (err) {
        console.error('Error in query deleting search:', err);
        throw err;
    }
}

export async function softDeleteUserSearches(userId) {
    try {
      const result = await Search.update(
        { deleted_at: new Date() }, // Set deleted_at to the current timestamp
        {
          where: {
            user_id: userId,
            deleted_at: null, // Only update records that are not already deleted
          },
        }
      );
      return result;
    } catch (err) {
      console.error('Error in soft deleting user searches:', err);
      throw err;
    }
  }
  