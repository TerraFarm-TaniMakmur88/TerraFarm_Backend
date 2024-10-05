import express from 'express';
import { getUser, createNewUser } from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/:id', getUser);
userRouter.post('/', createNewUser);

export default userRouter;