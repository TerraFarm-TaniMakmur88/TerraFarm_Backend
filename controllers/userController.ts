import { Request, Response } from 'express';
import { getUserById, createUser, login } from '../services/userService';
import jwt from "jsonwebtoken";

export const getUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Access token is missing or invalid' });
    }

    const token = authHeader.split(' ')[1];
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    

    const user = await getUserById(BigInt(decoded.id));
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNewUser = async (req: Request, res: Response) => {
  try {
    const { email, name, password, location } = req.body;
    const newUser = await createUser({ email, name, password, location });
    
    return res.status(201).json({ userId: newUser.id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await login(email, password);
    
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};