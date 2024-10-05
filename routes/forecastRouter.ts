import express from "express";
import { forecastHumidity, forecastRainfall, forecastTemperature, forecastWindspeed } from "../controllers/forecastController";

const forecastRouter = express.Router();

forecastRouter.get('/temperature', forecastTemperature);
forecastRouter.get('/windspeed', forecastWindspeed);
forecastRouter.get('/humidity', forecastHumidity);
forecastRouter.get('/rainfall', forecastRainfall);

export default forecastRouter;