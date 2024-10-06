import { Request, Response } from 'express';
import { WeatherService } from '../services/weatherService';
import { WeatherForecastService } from '../services/forecastService';

export class ForecastController {
    weatherService: WeatherService;
    forecastService : WeatherForecastService;

    constructor() {
        this.weatherService = new WeatherService();
        this.forecastService = new WeatherForecastService();
    }

    public getCurrentWeather = async (coordinates: number[]) => {
        const today = new Date();
        const currWeather = await this.weatherService.getNowWeather(coordinates);
        return {
            year: today.getFullYear(),
            month: today.getMonth(),
            day: today.getDate(),
            hour: today.getHours(),
            lat: coordinates[0],
            long: coordinates[1],
            temperature: currWeather.filter((value : any) => {return value.parameter=="t_2m:C"})[0].coordinates[0].dates[0].value,
            windspeed: currWeather.filter((value : any) => {return value.parameter=="wind_speed_10m:ms"})[0].coordinates[0].dates[0].value,
            humidity: currWeather.filter((value : any) => {return value.parameter=="absolute_humidity_2m:gm3"})[0].coordinates[0].dates[0].value,
            precipitation: currWeather.filter((value : any) => {return value.parameter=="precip_1h:mm"})[0].coordinates[0].dates[0].value,
        }
    };

    public forecastTemperature = async (req: Request, res: Response) : Promise<void> => {
        try {
            const forecast = await this.forecastService.forecastTemp(await this.getCurrentWeather([Number(req.query.coordX), Number(req.query.coordY)]));
    
            res.status(200).json(forecast.data);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
      };

      public forecastWindspeed = async (req: Request, res: Response) : Promise<void> => {
        try {
            const forecast = await this.forecastService.forecastWind(await this.getCurrentWeather([Number(req.query.coordX), Number(req.query.coordY)]));
    
            res.status(200).json(forecast.data);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
      };

      public forecastHumidity = async (req: Request, res: Response) : Promise<void> => {
        try {
            const forecast = await this.forecastService.forecastHumid(await this.getCurrentWeather([Number(req.query.coordX), Number(req.query.coordY)]));
    
            res.status(200).json(forecast.data);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
      };

      public forecastRainfall = async (req: Request, res: Response) : Promise<void> => {
        try {
            const forecast = await this.forecastService.forecastPrecipitation(await this.getCurrentWeather([Number(req.query.coordX), Number(req.query.coordY)]));
    
            res.status(200).json(forecast.data);
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
      };
}