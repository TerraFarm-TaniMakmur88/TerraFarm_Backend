import { Request, Response } from 'express';
import { createField, deleteField, getFieldById, getFieldByUserId, updateField, updatePlantDate, updateStatus,  } from '../services/fieldService';
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

export const createNewFields = async (req: Request, res: Response) => {
    try {
        var { fields } = req.body;
        const userId = getLoggedInId(req);
        fields.forEach(field => {
            field.userId = userId;
            field.plantDate = new Date(field.plantDate);
        });
        const newField = await createField(fields);
        
        return res.status(201).json(newField);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateFieldData = async (req: Request, res: Response) => {
    try {
        var { id, cropName, area, soilType, status, plantDate } = req.body;
        plantDate = new Date(plantDate);
        const currField = await getFieldById(id);
        if (!currField || currField?.length <= 0) {
            return res.status(404).json({ message: "Field not found" });
        }
        if (getLoggedInId(req) != currField![0].userId) {
            return res.status(403).json({ message: 'User not valid for this field' });
        }
        const updatedField = await updateField({ id, cropName, area, soilType, status, plantDate });
        
        return res.status(200).json(updatedField);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateFieldStatus = async (req: Request, res: Response) => {
    try {
        const { id, status } = req.body;
        const currField = await getFieldById(id);
        if (!currField || currField?.length <= 0) {
            return res.status(404).json({ message: "Field not found" });
        }
        if (getLoggedInId(req) != currField![0].userId) {
            return res.status(403).json({ message: 'User not valid for this field' });
        }
        const updatedField = await updateStatus(id, status);
        
        return res.status(200).json(updatedField);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateFieldPlantDate = async (req: Request, res: Response) => {
    try {
        const { id, plantDate } = req.body;
        const currField = await getFieldById(id);
        if (!currField || currField?.length <= 0) {
            return res.status(404).json({ message: "Field not found" });
        }
        if (getLoggedInId(req) != currField![0].userId) {
            return res.status(403).json({ message: 'User not valid for this field' });
        }
        const updatedField = await updatePlantDate(id, new Date(plantDate));
        
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