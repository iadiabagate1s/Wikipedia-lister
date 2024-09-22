import { Router } from "express"
import { userRouter } from "./user.js";
import { searchRouter } from "./searches.js";

const router = Router();
router.use('/user', userRouter);
router.use('/search', searchRouter);

export { router as routerInstance }