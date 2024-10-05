import express from "express";
import { getCurrentWeather, getWeatherAtDateRange, getWeatherInDate } from "../controllers/weatherController";

const weatherRouter = express.Router();

weatherRouter.get('/', getCurrentWeather);
weatherRouter.get('/date', getWeatherInDate);
weatherRouter.get('/date_range', getWeatherAtDateRange);

export default weatherRouter