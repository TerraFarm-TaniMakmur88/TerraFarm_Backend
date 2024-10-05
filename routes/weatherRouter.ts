import express from "express";
import { getCurrentWeather, getWeatherAtDateRange, getWeatherDataForDashboard, getWeatherInDate } from "../controllers/weatherController";

const weatherRouter = express.Router();

weatherRouter.get('/', getCurrentWeather);
weatherRouter.get('/date', getWeatherInDate);
weatherRouter.get('/date_range', getWeatherAtDateRange);
weatherRouter.get('/dashboard', getWeatherDataForDashboard);

export default weatherRouter