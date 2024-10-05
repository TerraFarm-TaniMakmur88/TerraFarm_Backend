import express from 'express';
import cors from 'cors';
import fieldRouter from './routes/FieldRouter';
import env from 'dotenv';
import { createClient } from '@supabase/supabase-js';

env.config();

const app = express();
const port = process.env.PORT || 3000;
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
// const supabase = createClient(supabaseUrl, supabaseAnonKey);
app.use(cors());

app.use('/', fieldRouter);

app.listen(port, () =>
    console.log(
        new Date().toLocaleTimeString() + `: Server is running on port ${port}...`
));

export default app;