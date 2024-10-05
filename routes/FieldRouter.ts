import express from "express";
import { createNewFields, deleteFieldData, getField, getFieldByUser, updateFieldData, updateFieldPlantDate, updateFieldStatus } from "../controllers/fieldController";

const fieldRouter = express.Router();

/* Get all fields for a user id */
fieldRouter.get('/', getFieldByUser);

/* Get field by field id */
fieldRouter.get('/:id', getField);

/* Insert new field */
fieldRouter.post('/', createNewFields);

/* Update field */
fieldRouter.put('/', updateFieldData);

/* Update field status */
fieldRouter.put('/status', updateFieldStatus);

/* Update field plant date */
fieldRouter.put('/plant_date', updateFieldPlantDate);

/* Delete field */
fieldRouter.delete('/', deleteFieldData);

export default fieldRouter;
