import express, { Express} from 'express';
import ngrok from "ngrok"
import dotenv from 'dotenv';
import connectDB from './config/db';
import router from './routes/index';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port: number = Number(process.env.PORT) || 4000;

app.use(cors())
app.use(express.json());
app.use('/api', router)

const start = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
        });
    } catch (error:any) { 
        return error.message;
    }
}
start();

