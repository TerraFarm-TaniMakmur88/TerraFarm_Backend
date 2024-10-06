interface CalculatorRequest {
    revenue: number;
    cost: number;
}

interface CalculatorResponse {
    profit: number;
}

export class CalculatorService {
    calculateProfit(request: CalculatorRequest): CalculatorResponse {
        const profit = request.revenue - request.cost;
        return { profit };
    }
}