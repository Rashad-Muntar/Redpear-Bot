import express, { Express} from 'express';

import dotenv from 'dotenv';
// import router from './routes/index';
// import connecDB from '../config/db';
import connectDB from './config/db';
// import passport from 'passport';
import cors from 'cors';
// import jwtStrategy from '../passport-config';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.json());
// app.use('/api', router)

// app.use(passport.initialize())
// passport.use(jwtStrategy);

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