import mongoose from "mongoose";
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/blogRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));
app.use('/', router);

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log(`MongoDB Connected`))
.catch((err) => console.error(err.message));

app.listen(PORT, () => {
    console.log(`Connected Server`);
})