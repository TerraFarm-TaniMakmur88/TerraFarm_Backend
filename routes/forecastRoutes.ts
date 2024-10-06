import { request, Router } from "express";
import { ForecastController } from "../controllers/forecastController";


export class ForecastRoute {
    forecastController: ForecastController;

    constructor() {
        this.forecastController = new ForecastController();
    }

    getRoutes() {
        return Router().
        get('/temperature', () => {}, this.forecastController.forecastTemperature)
        .get('/windspeed', () => {},  this.forecastController.forecastWindspeed)
        .get('/humidity', this.forecastController.forecastHumidity)
        .get('/rainfall', this.forecastController.forecastRainfall);
    }
}