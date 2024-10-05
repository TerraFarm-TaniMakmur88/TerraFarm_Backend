import { Request, Response } from 'express';
import { getUserById, createUser } from '../services/userService';

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = BigInt(req.params.id);
    const user = await getUserById(id);
    
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
    
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
