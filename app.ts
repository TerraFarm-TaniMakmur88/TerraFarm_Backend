import express from 'express';
import cors from 'cors';
import fieldRouter from './routes/FieldRouter';
import userRouter from './routes/userRoutes';
import env from 'dotenv';

env.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use('/', fieldRouter);
app.use('/api/user', userRouter);

app.listen(port, () =>
    console.log(
        new Date().toLocaleTimeString() + `: Server is running on port ${port}...`
));