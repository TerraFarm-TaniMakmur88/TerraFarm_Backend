import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import jwt from "jsonwebtoken";

export class UserController {
    userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public getUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const authHeader = req.headers.authorization;
  
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                res.status(401).json({ message: 'Access token is missing or invalid' });
                return;
            }
  
            const token = authHeader.split(' ')[1];
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
  
            const user = await this.userService.getUserById(BigInt(decoded.id));
      
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
      
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    public createNewUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, name, password, location } = req.body;
            const newUser = await this.userService.createUser({ email, name, password, location });
            
            res.status(201).json({ userId: newUser.id });
        } catch (error: any) {
            if (error.message.includes("User_email_key")) {
                res.status(403).json({ message: "Email is already taken" });
                return;
            }
            res.status(500).json({ message: error.message });
        }
    };

    public loginUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.userService.login(email, password);
      
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(401).json({ message: error.message });
        }
    };
}