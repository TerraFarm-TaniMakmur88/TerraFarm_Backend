import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { FieldService } from '../services/fieldService';
import { AuthMiddleware } from '../middlewares/authMiddleware';

export class FieldController {
    private fieldService: FieldService;
    private authMiddleware: AuthMiddleware;
    private userService: UserService;

    constructor() {
        this.fieldService = new FieldService();
        this.authMiddleware = new AuthMiddleware();
        this.userService = new UserService();
    }

    public getFieldByUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = BigInt(String(req.query.userId));

            if (BigInt(this.authMiddleware.getLoggedInId(req)!) !== userId) {
                res.status(403).json({ message: 'User not valid for this field' });
                return;
            }

            const fields = await this.fieldService.getFieldByUserId(userId);

            if (!fields || fields.length <= 0) {
                res.status(404).json({ message: 'Field for this user not found' });
                return;
            }

            res.status(200).json(fields);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    public getField = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = BigInt(req.params.id);
            const field = await this.fieldService.getFieldById(id);

            if (!field || field.length <= 0) {
                res.status(404).json({ message: 'Field not found' });
                return;
            }
            if (field[0].userId !== BigInt(this.authMiddleware.getLoggedInId(req)!)) {
                res.status(403).json({ message: 'User not valid for this field' });
                return;
            }

            res.status(200).json(field);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    public getFieldWithStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const userId = BigInt(String(req.query.userId));
            const status = req.query.status;

            if (BigInt(this.authMiddleware.getLoggedInId(req)!) !== userId) {
                res.status(403).json({ message: 'User not valid for this field' });
                return;
            }

            const fields = await this.fieldService.getFieldByStatus(userId, String(status || 'planting'));

            if (!fields || fields.length <= 0) {
                res.status(404).json({ message: `No field with status ${status} for this user found` });
                return;
            }

            res.status(200).json(fields);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    public createNewFields = async (req: Request, res: Response): Promise<void> => {
        try {
            let { userId, location, fields } = req.body;
            fields = fields.map((field: any) => ({
                ...field,
                userId,
                plantDate: new Date(field.plantDate),
                harvestPred: Math.round(Math.random() * 10)
            }));
            
            const newField = await this.fieldService.createField(fields);
            const newLocation = await this.userService.updateLocation(userId, location);

            res.status(201).json({ location: newLocation, fields: newField });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    public updateFieldData = async (req: Request, res: Response): Promise<void> => {
        try {
            let { id, cropName, area, soilType, status, plantDate, harvestPred } = req.body;
            plantDate = new Date(plantDate);

            const currField = await this.fieldService.getFieldById(id);
            if (!currField || currField.length <= 0) {
                res.status(404).json({ message: "Field not found" });
                return;
            }
            if (BigInt(this.authMiddleware.getLoggedInId(req)!) !== currField[0].userId) {
                res.status(403).json({ message: 'User not valid for this field' });
                return;
            }

            const updatedField = await this.fieldService.updateField({ id, cropName, area, soilType, status, plantDate });
            res.status(200).json(updatedField);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    public updateFieldStatus = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, status } = req.body;

            const currField = await this.fieldService.getFieldById(id);
            if (!currField || currField.length <= 0) {
                res.status(404).json({ message: "Field not found" });
                return;
            }
            if (BigInt(this.authMiddleware.getLoggedInId(req)!) !== currField[0].userId) {
                res.status(403).json({ message: 'User not valid for this field' });
                return;
            }

            const updatedField = await this.fieldService.updateStatus(id, status);
            res.status(200).json(updatedField);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    public updateFieldPlantDate = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id, plantDate } = req.body;

            const currField = await this.fieldService.getFieldById(id);
            if (!currField || currField.length <= 0) {
                res.status(404).json({ message: "Field not found" });
                return;
            }
            if (BigInt(this.authMiddleware.getLoggedInId(req)!) !== currField[0].userId) {
                res.status(403).json({ message: 'User not valid for this field' });
                return;
            }

            const updatedField = await this.fieldService.updatePlantDate(id, new Date(plantDate));
            res.status(200).json(updatedField);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    public deleteFieldData = async (req: Request, res: Response): Promise<void> => {
        try {
            const currField = await this.fieldService.getFieldById(req.body.id);
            if (!currField || currField.length <= 0) {
                res.status(404).json({ message: "Field not found" });
                return;
            }
            if (BigInt(this.authMiddleware.getLoggedInId(req)!) !== currField[0].userId) {
                res.status(403).json({ message: 'User not valid for this field' });
                return;
            }

            const deletedField = await this.fieldService.deleteField(req.body.id);
            res.status(200).json(deletedField);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}
