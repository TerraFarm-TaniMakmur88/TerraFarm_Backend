import express from 'express';
import cors from 'cors';
import fieldRouter from './routes/fieldRouter';
import userRouter from './routes/userRoutes';
import env from 'dotenv';
import { verifyToken } from './middlewares/authMiddleware';
import weatherRouter from './routes/weatherRouter';

env.config();

const app = express();
const port = process.env.PORT || 8080;
const corsOptions = {
    origin: process.env.FE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/field', fieldRouter);
app.use('/api/user', userRouter);
app.use('/api/weather', weatherRouter);

app.listen(port, () =>
    console.log(
        new Date().toLocaleTimeString() + `: Server is running on port ${port}...`
));

export const exports={};