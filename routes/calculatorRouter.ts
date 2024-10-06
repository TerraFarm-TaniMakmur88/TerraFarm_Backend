import { Router } from "express";
import { CalculatorController } from "../controllers/calculatorController";
import { AuthMiddleware } from "../middlewares/authMiddleware";

export class CalculatorRoute {
    public router: Router;
    public authMiddleware: AuthMiddleware;
    public calculatorController: CalculatorController;

    constructor() {
        this.router = Router();
        this.authMiddleware = new AuthMiddleware();
        this.calculatorController = new CalculatorController();
    }

    public getRoutes() {
        return this.router.post(
            '/calculate',
            this.authMiddleware.verifyToken(),
            this.calculatorController.calculateProfit
        );
    }
}
