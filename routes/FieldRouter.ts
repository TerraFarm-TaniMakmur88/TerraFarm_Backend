import { Router } from "express";


export class FieldRoute {
    
}

const fieldRouter = express.Router();

/* Get all fields for a user id */
fieldRouter.get('/', verifyToken, getFieldByUser);

/* Get field by status */
fieldRouter.get('/status', verifyToken, getFieldWithStatus);

/* Get field by field id */
fieldRouter.get('/:id', verifyToken, getField);

/* Insert new field */
fieldRouter.post('/', createNewFields);

/* Update field */
fieldRouter.put('/', verifyToken, updateFieldData);

/* Update field status */
fieldRouter.put('/status', verifyToken, updateFieldStatus);

/* Update field plant date */
fieldRouter.put('/plant_date', verifyToken, updateFieldPlantDate);

/* Delete field */
fieldRouter.delete('/', verifyToken, deleteFieldData);

export default fieldRouter;
