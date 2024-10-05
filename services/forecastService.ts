import env from "dotenv";
import axios from "axios";

env.config();

interface ForecastReq {
    year: number;
    month: number;
    day: number;
    hour: number;
    lat: number;
    long: number;
    temperature: number;
    windspeed: number;
    humidity: number;
    precipitation: number;
}

export const forecastTemp = async (req: ForecastReq) => {
    const forecast = await axios.get(process.env.AI_URL + `/forecast/temperature?year=${req.year}&month=${req.month}&day=${req.day}&hour=${req.hour}&lat=${req.lat}&long=${req.long}&windspeed=${req.windspeed}&humidity=${req.humidity}&precipitation=${req.precipitation}`);

    return forecast;
}

export const forecastWind = async (req: ForecastReq) => {
    const forecast = await axios.get(process.env.AI_URL + `/forecast/windspeed?year=${req.year}&month=${req.month}&day=${req.day}&hour=${req.hour}&lat=${req.lat}&long=${req.long}&temperature=${req.temperature}&humidity=${req.humidity}&precipitation=${req.precipitation}`);

    return forecast;
}

export const forecastHumid = async (req: ForecastReq) => {
    const forecast = await axios.get(process.env.AI_URL + `/forecast/humidity?year=${req.year}&month=${req.month}&day=${req.day}&hour=${req.hour}&lat=${req.lat}&long=${req.long}&windspeed=${req.windspeed}&temperature=${req.temperature}&precipitation=${req.precipitation}`);

    return forecast;
}

export const forecastPrecipitation = async (req: ForecastReq) => {
    const forecast = await axios.get(process.env.AI_URL + `/forecast/precipitation?year=${req.year}&month=${req.month}&day=${req.day}&hour=${req.hour}&lat=${req.lat}&long=${req.long}&windspeed=${req.windspeed}&humidity=${req.humidity}&temperature=${req.temperature}`);

    return forecast;
}