import { Request, Response } from 'express';
import { getNowWeather } from '../services/weatherService';
import { forecastHumid, forecastPrecipitation, forecastTemp, forecastWind } from '../services/forecastService';

const getCurrentWeather = async (coordinates: number[]) => {
    const today = new Date();
    const currWeather = await getNowWeather(coordinates);
    return {
        year: today.getFullYear(),
        month: today.getMonth(),
        day: today.getDate(),
        hour: today.getHours(),
        lat: coordinates[0],
        long: coordinates[1],
        temperature: currWeather.filter((value) => {return value.parameter=="t_2m:C"})[0].coordinates[0].dates[0].value,
        windspeed: currWeather.filter((value) => {return value.parameter=="wind_speed_10m:ms"})[0].coordinates[0].dates[0].value,
        humidity: currWeather.filter((value) => {return value.parameter=="absolute_humidity_2m:gm3"})[0].coordinates[0].dates[0].value,
        precipitation: currWeather.filter((value) => {return value.parameter=="precip_1h:mm"})[0].coordinates[0].dates[0].value,
    }
}

export const forecastTemperature = async (req: Request, res: Response) => {
    try {
        const forecast = await forecastTemp(await getCurrentWeather([req.query.coordX, req.query.coordY]));

        res.status(200).json(forecast.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  };

export const forecastWindspeed = async (req: Request, res: Response) => {
    try {
        const forecast = await forecastWind(await getCurrentWeather([req.query.coordX, req.query.coordY]));

        res.status(200).json(forecast.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  };

export const forecastHumidity = async (req: Request, res: Response) => {
    try {
        const forecast = await forecastHumid(await getCurrentWeather([req.query.coordX, req.query.coordY]));

        res.status(200).json(forecast.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  };

export const forecastRainfall = async (req: Request, res: Response) => {
    try {
        const forecast = await forecastPrecipitation(await getCurrentWeather([req.query.coordX, req.query.coordY]));

        res.status(200).json(forecast.data);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  };