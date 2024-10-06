import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { AuthMiddleware } from '../middlewares/authMiddleware';

export class UserRoute {
    public router: Router;
    private userController: UserController;
    private authMiddleware: AuthMiddleware;

    constructor() {
        this.router = Router();
        this.userController = new UserController();
        this.authMiddleware = new AuthMiddleware();
    }

    public getRoutes() {
        return this.router
            .get('/', 
                this.authMiddleware.verifyToken(),
                this.userController.getUser
            )
            .post('/', 
                this.userController.createNewUser
            )
            .post('/login', 
                this.userController.loginUser
            );
    }
}
