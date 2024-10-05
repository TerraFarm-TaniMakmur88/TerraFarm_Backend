import { Request, Response } from 'express';
import { createField, deleteField, getFieldById, getFieldByUserId, updateField,  } from '../services/fieldService';
import { getLoggedInId } from '../middlewares/authMiddleware';

export const getFieldByUser = async (req: Request, res: Response) => {
  try {
    const userId = BigInt(req.query.userId);

    if (getLoggedInId(req) != userId) {
        return res.status(403).json({ message: 'User not valid for this field' });
    }

    const fields = await getFieldByUserId(userId);
    
    if (!fields || fields.length <= 0) {
      return res.status(404).json({ message: 'Field for this user not found' });
    }
    
    return res.status(200).json(fields);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getField = async (req: Request, res: Response) => {
  try {
    const id = BigInt(req.params.id);
    const field = await getFieldById(id);
    
    if (!field || field.length <= 0) {
      return res.status(404).json({ message: 'Field not found' });
    }
    if (field[0].userId != getLoggedInId(req)) {
        return res.status(403).json({ message: 'User not valid for this field' });
    }
    
    return res.status(200).json(field);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createNewField = async (req: Request, res: Response) => {
    try {
        const { cropName, area, soilType } = req.body;
        const userId = getLoggedInId(req);
        const newField = await createField({ userId, cropName, area, soilType });
        
        return res.status(201).json(newField);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateFieldData = async (req: Request, res: Response) => {
    try {
        const { id, cropName, area, soilType } = req.body;
        const currField = await getFieldById(id);
        if (!currField || currField?.length <= 0) {
            return res.status(404).json({ message: "Field not found" });
        }
        if (getLoggedInId(req) != currField![0].userId) {
            return res.status(403).json({ message: 'User not valid for this field' });
        }
        const updatedField = await updateField({ id, cropName, area, soilType });
        
        return res.status(200).json(updatedField);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteFieldData = async (req: Request, res: Response) => {
    try {
        const currField = await getFieldById(req.body.id);
        if (!currField || currField?.length <= 0) {
            return res.status(404).json({ message: "Field not found" });
        }
        if (getLoggedInId(req) != currField![0].userId) {
            return res.status(403).json({ message: 'User not valid for this field' });
        }
        const deletedField = await deleteField(req.body.id);
        
        return res.status(200).json(deletedField);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};