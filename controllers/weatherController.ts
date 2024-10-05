import { Request, Response } from 'express';
import { getDashboardData, getNowWeather, getWeatherAtDate, getWeatherInDateRange } from '../services/weatherService';
import { getLoggedInId } from '../middlewares/authMiddleware';

export const getCurrentWeather = async (req: Request, res: Response) => {
    try {
        const weather = await getNowWeather([req.query.coordX, req.query.coordY]);

        return res.status(200).json(weather);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getWeatherInDate = async (req: Request, res: Response) => {
    try {
        const weather = await getWeatherAtDate([req.query.coordX, req.query.coordY], new Date(req.query.targetDate));

        return res.status(200).json(weather);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getWeatherAtDateRange = async (req: Request, res: Response) => {
    try {
        const weather = await getWeatherInDateRange([req.query.coordX, req.query.coordY], new Date(req.query.startDate), 
                        new Date(req.query.endDate), req.interval || '1H');

        return res.status(200).json(weather);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const getWeatherDataForDashboard = async (req: Request, res: Response) => {
    try {
        const weather = await getDashboardData([req.query.coordX, req.query.coordY], getLoggedInId(req));

        return res.status(200).json(weather);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}