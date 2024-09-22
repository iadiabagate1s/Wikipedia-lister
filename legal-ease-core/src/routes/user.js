import { Router } from "express"
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserLogin,
    getUserObject,
} from '../controllers/user/index.js';

const router = Router();
router.post('/login',getUserLogin);


router.get('/', getAllUsers); //read(all)
router.get('/:id', getUserObject); //read(one)
router.post('/', createUser);// create
router.delete('/:id', deleteUser);// delete
// router.put('/:id', updateUser);// update

export { router as userRouter};