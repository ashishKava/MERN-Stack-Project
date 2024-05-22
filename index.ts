import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import connectDB from './src/database';
import taskRoutes from './src/routes/routes';
import socketHandler from './src/socket';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const server = http.createServer(app);
const io = new Server(server);

connectDB();

socketHandler(io);
app.use(cors({ origin: 'http://localhost:3001' }));
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`server is running on post ${port}`)
});
