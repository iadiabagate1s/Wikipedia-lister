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
router.get('/:email', search); //read
router.get('/', getAllSearches);// read(all)
router.delete('/:searchItemId', deleteUserSearchItem); //delete
router.delete('/user/:userId', clearAllSearchesForUser); //delete


export { router as searchRouter};