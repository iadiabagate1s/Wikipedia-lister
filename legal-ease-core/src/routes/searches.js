import { Router } from "express"
import {
    getAllSearches,
    getSearchesByUser,
    deleteUserSearchItem,
    clearAllSearchesForUser,
    search
} from '../controllers/searches/index.js';


const router = Router();    




router.get('/user/:userId', getSearchesByUser);
router.get('/:email', search);
router.get('/', getAllSearches);
router.delete('/searchItemId/:searchItemId', deleteUserSearchItem);
router.delete('/user/:userId', clearAllSearchesForUser);


export { router as searchRouter};