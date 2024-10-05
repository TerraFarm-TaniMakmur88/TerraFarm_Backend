import express from 'express';
import { getUser, createNewUser, loginUser } from '../controllers/userController';
import { verifyToken } from '../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.get('/', verifyToken, getUser);
userRouter.post('/', createNewUser);
userRouter.post('/login', loginUser);

export default userRouter;