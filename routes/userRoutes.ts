import express from 'express';
import { getUser, createNewUser, loginUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/:id', getUser);
userRouter.post('/', createNewUser);
userRouter.post('/login', loginUser);

export default userRouter;