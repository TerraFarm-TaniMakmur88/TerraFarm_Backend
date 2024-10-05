interface CalculatorRequest{
    revenue: number;
    cost: number;
}

interface CalculatorResponse {
    profit: number;
}

export const calculateProfit = (request: CalculatorRequest): CalculatorResponse => {
    const profit = request.revenue - request.cost;
    return { profit };
};