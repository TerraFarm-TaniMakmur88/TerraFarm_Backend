import express from "express";
import { createNewField, deleteFieldData, getField, getFieldByUser, updateFieldData } from "../controllers/fieldController";

const fieldRouter = express.Router();

/* Get all fields for a user id */
fieldRouter.get('/', getFieldByUser);

/* Get field by field id */
fieldRouter.get('/:id', getField);

/* Insert new field */
fieldRouter.post('/', createNewField);

/* Update field */
fieldRouter.put('/', updateFieldData);

/* Delete field */
fieldRouter.delete('/', deleteFieldData);

export default fieldRouter;
