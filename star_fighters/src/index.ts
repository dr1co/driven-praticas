import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import battleRouter from './routes/battleRoutes';
dotenv.config();

const PORT: number = Number(process.env.PORT) || 5000;

const server = express();

server.use(express.json());
server.use(cors());
server.use(battleRouter);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});