import { Request, Response } from 'express';

interface CalculatorRequest {
    revenue: number;
    cost: number;
}

interface CalculatorResponse {
    profit: number;
}

export const calculateProfit = async (req: Request, res: Response) => {
    try {
        const { revenue, cost }: CalculatorRequest = req.body;

        if (typeof revenue !== 'number' || typeof cost !== 'number') {
            return res.status(400).json({ message: 'Revenue and cost must be valid numbers' });
        }

        const profit = revenue - cost;

        const response: CalculatorResponse = { profit };
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
