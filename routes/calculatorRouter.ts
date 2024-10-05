import express from "express";
import { calculateProfit } from "../controllers/calculatorController"
import { verifyToken } from "../middlewares/authMiddleware";

const calculatorRouter = express.Router();

calculatorRouter.post('/calculate', verifyToken, calculateProfit);

export default calculatorRouter;