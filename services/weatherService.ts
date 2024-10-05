import axios from "axios";
import env from "dotenv";
import { getUserById } from "./userService";

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

export const getWeatherInDateRange = async (coordinates: number[], startDate: Date, endDate: Date, interval: string) => {
    const weather = await axios.get(`https://api.meteomatics.com/${startDate.toISOString()}--${endDate.toISOString()}:PT${interval}/t_2m:C,precip_1h:mm,wind_speed_10m:ms,precip_24h:mm,absolute_humidity_2m:gm3/${coordinates[0]},${coordinates[1]}/json`, {
        auth: {
            username: process.env.WEATHER_API_USERNAME || '',
            password: process.env.WEATHER_API_PASSWORD || ''
        }
    });

    return weather.data.data;
};

export const getDashboardData = async (coordinates: number[], userId: bigint) => {
    var today = new Date();
    const rawListWeatherData = await getWeatherInDateRange(coordinates, new Date(new Date().setDate(today.getDate() - 2)), new Date(new Date().setDate(today.getDate() + 2)), "24H");
    const tempData = rawListWeatherData.filter((value) => {return value.parameter=="t_2m:C"})[0].coordinates[0].dates;
    const rainfallData = rawListWeatherData.filter((value) => {return value.parameter=="precip_1h:mm"})[0].coordinates[0].dates;
    const windspeedData = rawListWeatherData.filter((value) => {return value.parameter=="wind_speed_10m:ms"})[0].coordinates[0].dates;
    const humidityData = rawListWeatherData.filter((value) => {return value.parameter=="absolute_humidity_2m:gm3"})[0].coordinates[0].dates;
    
    const listData : any[] = [];
    for (let i=0; i<tempData.length; i++) {
        listData.push({
            temperature: tempData[i].value,
            date: tempData[i].date, 
            location: (await getUserById(userId)).location,
            rainfall: rainfallData[i].value,
            wind: windspeedData[i].value,
            humidity: humidityData[i].value,
        })
    }
    
    const insights = ["Water all your crops today", "Switch to corn", "Be a florist instead", "Lorem ipsum dolor sit amet", 
        "idk what to write", "heeeeeeeeeeeeelp - ...", "bruh"];
    
    const dashboardData = {
        listData : listData,
        insights : insights
    } 

    return dashboardData;
}