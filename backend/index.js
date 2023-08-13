import express from 'express';
import cors from 'cors';
import connectDB from './utils/connectDB.js';
import router from './router.js';
import dotenv from 'dotenv';
import dogs from './routes/dogs.js';

const app = express();

dotenv.config();

app.use(express.json());

app.use(cors());

connectDB();

app.use(router);
app.use('/dogs', dogs);

app.listen(process.env.PORT);
