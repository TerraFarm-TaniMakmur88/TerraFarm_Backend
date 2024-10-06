import { Router } from "express";
import { WeatherController } from "../controllers/weatherController";

export class WeatherRoute {
    weatherController: WeatherController;

    constructor() {
        this.weatherController = new WeatherController();
    }

    getRoutes() {
        return Router()
        .get('/', this.weatherController.getCurrentWeather)
        .get('/date', this.weatherController.getWeatherInDate)
        .get('/date_range', this.weatherController.getWeatherAtDateRange)
        .get('/dashboard', this.weatherController.getWeatherDataForDashboard);
    }
}
