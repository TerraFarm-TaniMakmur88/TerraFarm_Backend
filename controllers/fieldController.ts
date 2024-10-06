import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { FieldService } from '../services/fieldService';
import { AuthMiddleware } from '../middlewares/authMiddleware';


export class FieldController {
    fieldService : FieldService;
    authMiddleware : AuthMiddleware;
    userService : UserService;

    constructor() {
        this.fieldService = new FieldService();
        this.authMiddleware = new AuthMiddleware();
        this.userService = new UserService();
    }
    async getFieldByUser (req: Request, res: Response) {
        try {
            const userId = BigInt(String(req.query.userId));
        
            if (BigInt(this.authMiddleware.getLoggedInId(req)!) != userId) {
                return res.status(403).json({ message: 'User not valid for this field' });
            }
        
            const fields = await this.fieldService.getFieldByUserId(userId);
            
            if (!fields || fields.length <= 0) {
                return res.status(404).json({ message: 'Field for this user not found' });
            }
            
            return res.status(200).json(fields);
        } catch (error : any) {
            return res.status(500).json({ message: error.message });
        }
    };

    async getField (req: Request, res: Response) {
        try {
          const id = BigInt(req.params.id);
          const field = await this.fieldService.getFieldById(id);
          
          if (!field || field.length <= 0) {
            return res.status(404).json({ message: 'Field not found' });
          }
          if (field[0].userId != BigInt(this.authMiddleware.getLoggedInId(req)!)) {
              return res.status(403).json({ message: 'User not valid for this field' });
          }
          
          return res.status(200).json(field);
        } catch (error : any) {
          return res.status(500).json({ message: error.message });
        }
      };

      async getFieldWithStatus (req: Request, res: Response) {
        try {
            const userId = BigInt(String(req.query.userId));
            const status = req.query.status;
    
            if (BigInt(this.authMiddleware.getLoggedInId(req)!) != userId) {
                return res.status(403).json({ message: 'User not valid for this field' });
            }
    
            const fields = await this.fieldService.getFieldByStatus(userId, (String(status ? status : 'planting')));
            
            if (!fields || fields.length <= 0) {
                return res.status(404).json({ message: `No field with status ${status} for this user found` });
            }
            
            return res.status(200).json(fields);
        } catch (error : any) {
            return res.status(500).json({ message: error.message });
        }
      };

      async createNewFields (req: Request, res: Response) {
        try {
            var { userId, location, fields } = req.body;
            fields.forEach(field => {
                field.userId = userId;
                field.plantDate = new Date(field.plantDate);
                field.harvestPred = Math.round(Math.random() * 10);
            });
            const newField = await this.fieldService.createField(fields);
            const newLocation = await this.userService.updateLocation(userId, location);
            
            return res.status(201).json({location: newLocation, fields: newField});
        } catch (error : any) {
            return res.status(500).json({ message: error.message });
        }
    };
    

    async updateFieldData (req: Request, res: Response) {
        try {
            var { id, cropName, area, soilType, status, plantDate, harvestPred } = req.body;
            plantDate = new Date(plantDate);
            const currField = await this.fieldService.getFieldById(id);
            if (!currField || currField?.length <= 0) {
                return res.status(404).json({ message: "Field not found" });
            }
            if (BigInt(this.authMiddleware.getLoggedInId(req)!) != currField![0].userId) {
                return res.status(403).json({ message: 'User not valid for this field' });
            }
            const updatedField = await this.fieldService.updateField({ id, cropName, area, soilType, status, plantDate });
            
            return res.status(200).json(updatedField);
        } catch (error : any) {
            return res.status(500).json({ message: error.message });
        }
    };

    async updateFieldStatus (req: Request, res: Response) {
        try {
            const { id, status } = req.body;
            const currField = await this.fieldService.getFieldById(id);
            if (!currField || currField?.length <= 0) {
                return res.status(404).json({ message: "Field not found" });
            }
            if (BigInt(this.authMiddleware.getLoggedInId(req)!) != currField![0].userId) {
                return res.status(403).json({ message: 'User not valid for this field' });
            }
            const updatedField = await this.fieldService.updateStatus(id, status);
            
            return res.status(200).json(updatedField);
        } catch (error : any) {
            return res.status(500).json({ message: error.message });
        }
    };

    async updateFieldPlantDate (req: Request, res: Response) {
        try {
            const { id, plantDate } = req.body;
            const currField = await this.fieldService.getFieldById(id);
            if (!currField || currField?.length <= 0) {
                return res.status(404).json({ message: "Field not found" });
            }
            if (this.authMiddleware.getLoggedInId(req) != currField![0].userId) {
                return res.status(403).json({ message: 'User not valid for this field' });
            }
            const updatedField = await this.fieldService.updatePlantDate(id, new Date(plantDate));
            
            return res.status(200).json(updatedField);
        } catch (error : any) {
            return res.status(500).json({ message: error.message });
        }
    };

    async deleteFieldData (req: Request, res: Response) {
        try {
            const currField = await this.fieldService.getFieldById(req.body.id);
            if (!currField || currField?.length <= 0) {
                return res.status(404).json({ message: "Field not found" });
            }
            if (BigInt(this.authMiddleware.getLoggedInId(req)!) != currField![0].userId) {
                return res.status(403).json({ message: 'User not valid for this field' });
            }
            const deletedField = await this.fieldService.deleteField(req.body.id);
            
            return res.status(200).json(deletedField);
        } catch (error : any) {
            return res.status(500).json({ message: error.message });
        }
    };
}