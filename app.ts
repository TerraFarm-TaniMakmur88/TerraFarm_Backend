require("dotenv").config();

import express, { Express } from "express";
import cors from "cors";
import { FieldRoute } from "./routes/FieldRoutes";
import { ForecastRoute } from "./routes/forecastRoutes";
import { UserRoute } from "./routes/userRoutes";
import { CalculatorRoute } from "./routes/calculatorRouter";
import { WeatherRoute } from "./routes/weatherRoutes";

const port = process.env.PORT || 8080;
const corsOptions = {
    origin: process.env.FE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

export class App {
    server: Express;

    constructor() {
        const userRoute = new UserRoute();
        const calculatorRoute = new CalculatorRoute();
        const fieldRoute = new FieldRoute();
        const forecastRoute = new ForecastRoute();
        const weatherRoute = new WeatherRoute();

        this.server = express();
        this.server.options('*', cors(corsOptions));
        this.server.use(cors(corsOptions));

        this.server.use('/api/field', fieldRoute.getRoutes());
        this.server.use('/api/user', userRoute.getRoutes());
        this.server.use('/api/weather', weatherRoute.getRoutes());
        this.server.use('/api/forecast', forecastRoute.getRoutes());
        this.server.use('/api/calculator', calculatorRoute.getRoutes());
    }

    run() {
    this.server.listen(process.env.PORT || 8080, () => {
        console.log(`⚡️[server]: Server started at http://localhost:${process.env.PORT || 8080}`);
    });
    }
}