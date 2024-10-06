import { Request, Response } from 'express';

interface CalculatorRequest {
    revenue: number;
    cost: number;
}

interface CalculatorResponse {
    profit: number;
}

export class CalculatorController {
    public calculateProfit = async (req: Request, res: Response): Promise<void> => {
        try {
            const { revenue, cost }: CalculatorRequest = req.body;

            if (typeof revenue !== 'number' || typeof cost !== 'number') {
                res.status(400).json({ message: 'Revenue and cost must be valid numbers' });
                return;
            }

            const profit = revenue - cost;
            const response: CalculatorResponse = { profit };

            res.status(200).json(response);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}