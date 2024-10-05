import axios from "axios";
import env from "dotenv";

env.config();

export const getNowWeather = async (coordinates: number[]) => {
    const currDate = new Date().toISOString();
    const weather = await axios.get(`https://api.meteomatics.com/${currDate}/t_2m:C,precip_1h:mm,wind_speed_10m:ms,precip_24h:mm,absolute_humidity_2m:gm3/${coordinates[0]},${coordinates[1]}/json`, {
        auth: {
            username: process.env.WEATHER_API_USERNAME || '',
            password: process.env.WEATHER_API_PASSWORD || ''
        }
    });

    return weather.data.data;
};

export const getWeatherAtDate = async (coordinates: number[], targetDate: Date) => {
    const weather = await axios.get(`https://api.meteomatics.com/${targetDate.toISOString()}/t_2m:C,precip_1h:mm,wind_speed_10m:ms,precip_24h:mm,absolute_humidity_2m:gm3/${coordinates[0]},${coordinates[1]}/json`, {
        auth: {
            username: process.env.WEATHER_API_USERNAME || '',
            password: process.env.WEATHER_API_PASSWORD || ''
        }
    });

    return weather.data.data;
};

export const getWeatherInDateRange = async (coordinates: number[], startDate: Date, endDate: Date) => {
    const weather = await axios.get(`https://api.meteomatics.com/${startDate.toISOString()}--${endDate.toISOString()}:PT1H/t_2m:C,precip_1h:mm,wind_speed_10m:ms,precip_24h:mm,absolute_humidity_2m:gm3/${coordinates[0]},${coordinates[1]}/json`, {
        auth: {
            username: process.env.WEATHER_API_USERNAME || '',
            password: process.env.WEATHER_API_PASSWORD || ''
        }
    });

    return weather.data.data;
};