require("dotenv").config();

import express, { Express } from "express";
import cors from "cors";

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
        const userRouter = new UserRouter();
        const calculatorRouter = new CalculatorRouter();
        const fieldRouter = new FieldRouter();
        const forecastRouter = new ForecastRouter();
        const weatherRouter = new WeatherRouter();

        this.server = express();
        this.server.options('*', cors(corsOptions));
        this.server.use(cors(corsOptions));

        this.server.use('/api/field', fieldRouter);
        this.server.use('/api/user', userRouter);
        this.server.use('/api/weather', weatherRouter);
        this.server.use('/api/forecast', forecastRouter);
        this.server.use('/api/calculator', calculatorRouter);
    }
}