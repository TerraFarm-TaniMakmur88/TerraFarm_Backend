import express from 'express';
import cors from 'cors';
import fieldRouter from './routes/FieldRouter';
import env from 'dotenv';

env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use('/', fieldRouter);

app.listen(port, () =>
    console.log(
        new Date().toLocaleTimeString() + `: Server is running on port ${port}...`
));