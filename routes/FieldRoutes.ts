import { Router } from "express";
import { FieldController } from "../controllers/fieldController";
import { AuthMiddleware } from "../middlewares/authMiddleware";


export class FieldRoute {
    fieldController: FieldController;
    authMiddleware: AuthMiddleware;

    constructor() {
        this.fieldController = new FieldController();
        this.authMiddleware = new AuthMiddleware();
    }

    getRoutes() {
        return Router()
            .get("/", 
                this.authMiddleware.verifyToken(),
                this.fieldController.getFieldByUser)
            .get(
                "/status",
                this.authMiddleware.verifyToken(),
                this.fieldController.getFieldWithStatus)
            .get(
                "/:id", 
                this.authMiddleware.verifyToken(),
                this.fieldController.getField)
            .post(
                '/',
                this.authMiddleware.verifyToken(),
                this.fieldController.createNewFields)
            .put(
                '/',
                this.authMiddleware.verifyToken(),
                this.fieldController.updateFieldData)
            .put(
                '/status',
                this.authMiddleware.verifyToken(),
                this.fieldController.updateFieldStatus)
            .put(
                '/plant_date',
                this.authMiddleware.verifyToken(),
                this.fieldController.updateFieldPlantDate)
            .delete(
                '/',
                this.authMiddleware.verifyToken(),
                this.fieldController.updateFieldPlantDate)
    }
}
