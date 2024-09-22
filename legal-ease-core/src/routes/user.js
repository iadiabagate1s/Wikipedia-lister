import { Router } from "express"
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserLogin,
    getUserObject,
} from '../controllers/user/index.js';

const router = Router();

router.get('/', getAllUsers);
router.post('/login',getUserLogin);
router.get('/:id', getUserObject);
router.post('/', createUser);
router.delete('/:id', deleteUser);

export { router as userRouter};