import express from 'express';
import mongoose from 'mongoose';
import authRouter from './routers/authRouter.js'

const PORT = 5000;
const app = express();
const DB_URL = 'mongodb+srv://average:vyFzpxLM32@cluster0.bwij6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(express.json());
app.use('/auth', authRouter);


async function startApp() {
    try {
        await mongoose.connect(DB_URL);
        app.listen(PORT, ()=> console.log('server has been started on port ', PORT));
    } catch (e) {
        console.log(e)
    }
}

startApp();