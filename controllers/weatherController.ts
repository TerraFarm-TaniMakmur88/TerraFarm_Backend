import { Request, Response } from 'express';
import { WeatherService } from '../services/weatherService';
import { AuthMiddleware } from '../middlewares/authMiddleware';

export class WeatherController {
    weatherService: WeatherService;
    authMiddleware: AuthMiddleware;

    constructor() {
        this.weatherService = new WeatherService();
        this.authMiddleware = new AuthMiddleware();
    }

    async getCurrentWeather (req: Request, res: Response) : Promise<void> {
        try {
            const weather = await this.weatherService.getNowWeather([Number(req.query.coordX), Number(req.query.coordY)]);
    
            res.status(200).json(weather);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    };

    async getWeatherInDate (req: Request, res: Response) : Promise<void> {
        try {
            const weather = await this.weatherService.getWeatherAtDate([Number(req.query.coordX), Number(req.query.coordY)], new Date(String(req.query.targetDate)));
    
            res.status(200).json(weather);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    };

    async getWeatherAtDateRange (req: Request, res: Response) : Promise<void> {
        try {
            const weather = await this.weatherService.getWeatherInDateRange([Number(req.query.coordX), Number(req.query.coordY)], new Date(String(req.query.startDate)), 
                            new Date(String(req.query.endDate)), String(req.query.interval) || '1H');
    
            res.status(200).json(weather);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    };

    async getWeatherDataForDashboard (req: Request, res: Response) : Promise<void> {
        try {
            const weather = await this.weatherService.getDashboardData([Number(req.query.coordX), Number(req.query.coordY)], BigInt(this.authMiddleware.getLoggedInId(req)!));
    
            res.status(200).json(weather);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    };
}